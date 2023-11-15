const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

// Connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

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

async function insertListing(db, listing) {
    const collection = db.collection('listings');
    const res = await collection.insertOne(listing);
    console.log(res);
}

async function initialize() {
    // Test that you can connect to the database
    await testConnection();

    // Insert a document
    const listing = {
        img: "images/camry.png",
        name: "Toyota Camry Rental",
        description: "Take my car! Available for cheap, works great.",
        location: "Provo, UT",
        rate: { amt: 35, unit: "day" },
        owner_id: 1
    };
    await insertListing(db, listing);
    // await collection.insertOne(house);

    // // Query the documents
    // const query = { property_type: 'Condo', beds: { $lt: 2 } };
    // const options = {
    //     sort: { score: -1 },
    //     limit: 10,
    // };

    // const cursor = collection.find(query, options);
    // const rentals = await cursor.toArray();
    // rentals.forEach((i) => console.log(i));
    // console.log("done!");

    await client.close();
}

initialize().catch(console.error);


