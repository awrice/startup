const { MongoClient, Binary, ObjectId } = require('mongodb');
const fs = require('fs');
const config = require('./dbConfig.json');

// Connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

const LISTING_COLL = 'listings';
const MESSAGE_COLL = 'messages';
const USER_COLL = 'users';

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
    return res.acknowledged;
}

async function createUser(user) {
    const collection = db.collection(USER_COLL);
    const res = await collection.insertOne(user);
    return res.acknowledged;
}

async function retrieveImage(imageId) {
    try {
        const res = await db.collection('__tests__').findOne({ _id: new ObjectId(imageId) });
        return res.image.buffer;
    } catch {
        return null;
    }

}

async function insertImage(imageBuf) {
    try {
        const res = await db.collection('__tests__').insertOne({ image: new Binary(imageBuf) });
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


module.exports = { testConnection, insertListing, createUser, retrieveImage, insertImage, test, close }