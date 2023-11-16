const { MongoClient, Binary, ObjectId } = require('mongodb');
const fs = require('fs');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

// Connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

const LISTING_COLL = 'listings';
const MESSAGE_COLL = 'messages';
const USER_COLL = 'users';
const IMAGES_COLL = 'images';

async function getUser(username) {
    const collection = db.collection(USER_COLL);
    let user = await collection.findOne({ username: username });
    return user;
}

async function createUser(username, password) {
    const collection = db.collection(USER_COLL);
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        services_as_host: [],
        services_as_client: []
    };
    await collection.insertOne(user);
    return user;
}

async function getMe(authToken) {
    const collection = db.collection(USER_COLL);
    let user = await collection.findOne({ token: authToken });
    return user;
}

async function updateUserHostService(authToken, listing_id) {
    const collection = db.collection(USER_COLL);
    let result = await collection.updateOne(
        { token: authToken }, 
        { $push: { services_as_host: listing_id } }
    );
    return result;
}

async function testConnection() {
    // Test that you can connect to the database
    (async function test() {
        await client.connect();
        await db.command({ ping: 1 });
    })().catch((ex) => {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    });
}

async function insertListing(listing) {
    const collection = db.collection(LISTING_COLL);
    const res = await collection.insertOne(listing);
    return res;
}

async function retrieveListings(searchQuery) {
    const query = {
        $or: [ {title: {$regex: searchQuery}}, {description: {$regex: searchQuery}}]
    }
    let result = db.collection(LISTING_COLL).find(query);
    result = await result.toArray();
    // const result = await cursor.toArray();
    // console.log("Found?");
    return result;
}

async function retrieveImage(imageId) {
    try {
        const res = await db.collection(IMAGES_COLL).findOne({ _id: new ObjectId(imageId) });
        return res;
    } catch {
        return null;
    }

}

async function insertImage(image) {
    try {
        const res = await db.collection(IMAGES_COLL).insertOne(image);
        if (res) { return res.insertedId; }
        else { return null; }
    } catch {
        return null;
    }
}

async function close() {
    await client.close();
}

async function test() {
    const res = await db.collection('__tests__').findOne({ filename: './public/images/camry.png' });
    // const res = await cursor.toArray();
    console.log(res.filename);
    const imageBinary = res.image
    const imageBuffer = imageBinary ? imageBinary.buffer : null;
    if (!imageBuffer) {
        console.log("no image data found");
        return false
    }
    // else { console.log('No image data found in the document.'); }
    return imageBuffer
}



async function main() {
    // Test that you can connect to the database
    await testConnection();

    // INSERT IMAGE
    // const imageBuffer = fs.readFileSync('./public/images/camry.png');
    // db.collection('__tests__').insertOne({
    //     filename: './public/images/camry.png',
    //     image: new Binary(imageBuffer)
    // }, (insertErr, result) => {
    //     if (insertErr) { console.error('Error inserting document:', insertErr); } 
    //     else { console.log('Document inserted:', result.ops[0]); }
    // });

    // RETRIEVE IMAGE
    console.log("Before...");
    const res = await db.collection('__tests__').findOne({ filename: './public/images/camry.png' });
    // const res = await cursor.toArray();
    console.log(res.filename);
    const imageBinary = res.image
    const imageBuffer = imageBinary ? imageBinary.buffer : null;
    if (imageBuffer) { fs.writeFileSync('/', imageBuffer); }
    else { console.log('No image data found in the document.'); }
    // , (findErr, document) => {
    //     console.log("Coming...");
    //     if (findErr) { console.error('Error finding document:', findErr); } 
    //     else if (!document) { console.log('No document found.'); }
    //     else {
    //         // Get the Binary object from the document
    //         const imageBinary = document.image;
    //         console.log(`we got it: ${imageBinary.length}`);

    //         // Convert the Binary object to a Buffer
    //         const imageBuffer = imageBinary ? imageBinary.buffer : null;

    //         if (imageBuffer) {
    //             // Save the buffer to a file
    //             fs.writeFileSync('./here', imageBuffer);
    //             console.log('Image saved successfully.');
    //         } else {
    //             console.log('No image data found in the document.');
    //         }
    //     }
    // });
    await close();
}

// main()
// console.log("done!");


module.exports = { 
    getUser,
    createUser, 
    getMe,
    updateUserHostService,
    testConnection, 
    insertListing, 
    retrieveListings,
    retrieveImage, 
    insertImage, 
    test, 
    close 
}