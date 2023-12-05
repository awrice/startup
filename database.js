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
    if (await retrieveListing(listing_id) == null) {
        return null;
    }
    const collection = db.collection(USER_COLL);
    let result = await collection.updateOne(
        { token: authToken }, 
        { $push: { services_as_host: listing_id } }
    );
    return result;
}

async function updateUserClientService(authToken, listing_id) {
    if (await retrieveListing(listing_id) == null) {
        return null;
    }
    const collection = db.collection(USER_COLL);
    let result = await collection.updateOne(
        { token: authToken }, 
        { $push: { services_as_client: listing_id } }
    );
    return result;

}

async function retrieveHostServices(authToken) {
    const collection = db.collection(USER_COLL);
    let result = await collection.findOne({ token: authToken });
    if (result) { return result.services_as_host; }
}

async function retrieveClientServices(authToken) {
    const collection = db.collection(USER_COLL);
    let result = await collection.findOne({ token: authToken });
    if (result) { return result.services_as_client; }
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

async function retrieveListing(listing_id) {
    try {
        let result = db.collection(LISTING_COLL).findOne({ _id: new ObjectId(listing_id) });
        return result
    } catch {
        return null;
    }
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

async function addMessage(listing_id, data) {
    if (await retrieveListing(listing_id) == null) {
        return null;
    }
    const collection = db.collection(MESSAGE_COLL);
    let result = await collection.updateOne(
        { listing_id: listing_id }, 
        { $push: { messages: data } },
        { upsert: true }
    );
    return result;
}

async function retrieveMessages(listing_id) {
    try {
        let result = db.collection(MESSAGE_COLL).findOne({ listing_id: listing_id });
        return result
    } catch {
        return null;
    }

}

async function close() {
    await client.close();
}

// main()
// console.log("done!");


module.exports = { 
    getUser,
    createUser, 
    getMe,
    updateUserHostService,
    updateUserClientService,
    retrieveHostServices,
    retrieveClientServices,
    testConnection, 
    insertListing, 
    retrieveListings,
    retrieveListing,
    retrieveImage, 
    insertImage, 
    addMessage,
    retrieveMessages,
    close 
}