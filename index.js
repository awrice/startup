/* TEMPORARY DATABASE */
// --- //
let DATABASE = {
    "users": {
        0: {
            "username": "awrice",
            "password": "1234",
            "location": "Provo, UT"
        },
        12: {
            "username": "poser",
            "password": "1234",
            "location": "Orem, UT"
        },
        15: {
            "username": "crab",
            "password": "1234",
            "location": "Salt Lake City, UT"
        },
        1: {
            "username": "bark",
            "password": "1234",
            "location": "Provo, UT"
        },
        3: {
            "username": "foodie",
            "password": "1234",
            "location": "Orem, UT"
        },
        17: {
            "username": "manoc",
            "password": "1234",
            "location": "Orem, UT"
        },
        4: {
            "username": "lasps",
            "password": "1234",
            "location": "Provo, UT"
        },
        21: {
            "username": "freek",
            "password": "1234",
            "location": "Layton, UT"
        },
    },
    "listings": {
        1: {
            "id": 1,
            "img": "images/camry.png",
            "name": "Toyota Camry Rental",
            "description": "Take my car! Available for cheap, works great.",
            "location": "Provo, UT",
            "rate": { "amt": 35, "unit": "day" },
            "owner_id": 1
        }, 2: {
            "id": 2,
            "img": "images/movingvan.jpeg",
            "name": "Moving Van Rental",
            "description": "I'm willing to drive anywhere within two hours of central Provo and help move also!",
            "location": "Orem, UT",
            "rate": { "amt": 20, "unit": "hour" },
            "owner_id": 3
        }, 3: {
            "id": 3,
            "img": "images/artpieces.jpg",
            "name": "Art Pieces for the Home",
            "description": "I make amazing art! Commission me to help give some pizzazz those blank walls.",
            "location": "Saratoga Springs, UT",
            "rate": { "amt": "*", "unit": null },
            "owner_id": 12
        }, 4: {
            "id": 4,
            "img": "images/customTshirts.jpg",
            "name": "Custom T-shirts",
            "description": "I'm willing to take a design from you or create one based on your vision! I produce high quality shirts for cheap",
            "location": "Provo, UT",
            "rate": { "amt": 20, "unit": "shirt" },
            "owner_id": 15
        }, 5: {
            "id": 5,
            "img": "images/hikinggear.jpg",
            "name": "Hiking Gear",
            "description": "I have all of the stuff in the picture, the prices will change based on the item and the duration",
            "location": "Provo, UT",
            "rate": { "amt": "*", "unit": null },
            "owner_id": 21
        }
    },
    "services": [
        3, 4
    ],
    "messages": {
        0: {
            12: [
                // sender: -1 means the user sent it, and the other number is the user id of the service owner
                { "sender": -1, "message": "Hey! I'm interested in your car rental! Is it available between the 9th and the 15th?" },
                { "sender": 12, "message": "Absolutely! Would you like to book it?" },
                { "sender": -1, "message": "That would be great, thanks!" },
                { "sender": 12, "message": "Booked! Text me here and I'll send you the details: (575)529-5323" }
            ],
            15: [
                { "sender": -1, "message": "Hey! Could you help me move to south Orem?" },
                { "sender": 15, "message": "I can." },
                { "sender": 15, "message": "Where are you living now?" },
                { "sender": -1, "message": "I'm living south BYU campus" },
                { "sender": 15, "message": "Awesome. Let's connect over the phone: (233)133-6847" }
            ]
        }
    }
}
// --- //
const { WebSocketServer } = require('ws');
const express = require('express');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const fs = require('fs');
const db = require('./database.js');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

function setAuthCookie(res, authToken) {
    console.log("\t> Setting Auth Cookie");
    res.cookie('token', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

apiRouter.post('/auth/create', async (req, res) => {
    console.log('POST /auth/create');
    if (await db.getUser(req.body.username)) { res.status(409).send({ msg: 'Existing user' }); }
    else if (req.body.username.trim().length == 0 || req.body.password.trim().length == 0) {
        res.status(422).send({ msg: 'Username or password is empty' });
    }
    else {
        const user = await db.createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    console.log('POST /auth/login');
    const user = await db.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.get('/user/me', async (req, res) => {
    console.log('GET /user/me');
    let authToken = req.cookies['token'];
    const user = await db.getMe(authToken);
    if (user) {
        res.status(200).send({ status: 200, username: user.username, userId: user._id });
        return;
    }
    res.status(401).send({ status: 401, msg: 'Unauthorized' });
});

apiRouter.get("/listing/:query", async (req, res) => {
    let search_query = req.params.query;
    console.log("GET /listing/" + search_query);

    if (search_query === "null") { search_query = ""; }

    // Get the listings from the database
    let filtered_listings = await db.retrieveListings(search_query);
    res.json(filtered_listings);
});

apiRouter.get("/listing/interest/:listingId", async (req, res) => {
    let listing_id = req.params.listingId;
    console.log("GET /listing/interest/" + listing_id);
    let authToken = req.cookies['token'];
    let result = await db.updateUserClientService(authToken, listing_id);
    if (result == null) {
        res.json({"status": 401});
    } else {
        res.json({"status": 200});
    }
});

apiRouter.get("/listingID/:listingId", async (req, res) => {
    console.log("GET /listingID/" + req.params.listingId);

    let result = await db.retrieveListing(req.params.listingId);
    res.json(result);
});

apiRouter.post("/listing", upload.array('images'), async (req, res) => {
    console.log("POST /listing");

    let body = req.body;
    const user = await db.getMe(req.cookies['token']);
    if (user == null) {
        res.status(401).send({ msg: 'Unauthorized' });
    }
    let listing = {
        "imgs": [],
        "title": body.title,
        "location": body.location,
        "description": body.description,
        "rate_amt": body.rate_amt,
        "rate_unit": body.rate_unit,
        "owner_id": user._id
    };

    for (const img in req.files) {
        console.log(req.files[img]);
        // const imageData = await ;
        let new_id = await db.insertImage(req.files[img])
        listing.imgs.push(new_id);
    }
    let listing_result = await db.insertListing(listing);
    console.log(listing_result);

    await db.updateUserHostService(req.cookies['token'], listing_result.insertedId);

    res.json(listing_result);
});

apiRouter.get("/services", async (req, res) => {
    console.log("GET /services");

    let authToken = req.cookies['token'];
    let host_service_ids = await db.retrieveHostServices(authToken);
    let client_services_ids = await db.retrieveClientServices(authToken);

    let host_services = []
    let client_services = []
    for (const listing_id of host_service_ids) {
        host_services.push(await db.retrieveListing(listing_id));
    }
    for (const listing_id of client_services_ids) {
        client_services.push(await db.retrieveListing(listing_id));
    }
    res.json({ host: host_services, client: client_services });
});

apiRouter.get("/messages/:otherid", (req, res) => {
    let other_id = req.params.otherid;
    console.log("GET /messages/" + other_id);
    let ret = DATABASE["messages"][0][other_id] == undefined ? {} : DATABASE["messages"][0][other_id];
    res.json(ret);
});

apiRouter.get("/img/:imageId", (req, res) => {
    console.log("GET /img/" + req.params.imageId);
    db.retrieveImage(req.params.imageId)
    .then((image) => {
        if (image == null) {
            res.status(404).json({ error: 'Image not found.' });
        } else { 
            res.json(image);
        }
    });
});

apiRouter.post("/img", upload.single('file'), (req, res) => {
    console.log("POST /img");
    if (req.file == undefined) { res.status(404).json({ error: 'No file uploaded' }) }
    else {
        db.insertImage(req.file.buffer)
        .then((insertedId) => {
            if (insertedId == null) {
                console.log("Unable to upload the image")
                res.status(500).json({ done: false, error: 'Could not upload the image' });
            } else {
                console.log("Done.");
                res.status(200).json({ done: true, insertedId: insertedId });
            }
        })
    }
});

// any unknown path goes here
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

let server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



// WEB SOCKETS //
// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

// Keep track of all the connections
let connections = {};

async function addConnection(token_val, listingId, ws) {
    const user = await db.getMe(token_val);
    const connection = { name: user.username, userId: user._id, alive: true, ws: ws }
    if (!(listingId in connections)) {
        connections[listingId] = { online: {} }
    } else if (token_val in connections[listingId]) {
        return false;
    }
    connections[listingId]['online'][token_val] = connection;
    return true;
}

function removeConnection(token_val, listingId) {
    delete connections[listingId]['online'][token_val];
    // connections[listingId]['online'] = connections[listingId]['online'].filter((x) => x['token'] !== token_val );
}

wss.on('connection', (ws, req) => {
    const cookies = req.headers.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    const token_val = cookies.token;
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    let listingId = urlParams.get('listingId');

    // set the connection element as accessible by the listingId
    let success = addConnection(token_val, listingId, ws);
    if (success == false) {
        // Connection should be refused... this guy is already messaging somewhere else
        ws.terminate();
    }

    console.log(`CONNECTED ${token_val}`);
    // send the previous messages to the user 
    db.retrieveMessages(listingId).then((res) => {
        let to_send = null
        if (res != null) {
            to_send = { init: true, messages: res.messages };
        } else {
            to_send = { init: true, messages: [] };
        }
        ws.send(JSON.stringify(to_send));
    });

    // console.log(connections[listingId]);
    // ws.send('{"msg": "hello!", "sender": "SERVER"}');

    ws.on('message', (data) => {
        console.log(`MESSAGE from ${token_val}`);
        let users = connections[listingId]['online'];
        data = JSON.parse(data)
        data.username = users[token_val]['name'];
        data.user_id = users[token_val]['userId'];
        db.addMessage(listingId, data);
        console.log(data);

        for (const [connected_token, conn_data] of Object.entries(users)) {
            if (connected_token !== token_val) {
                conn_data.ws.send(JSON.stringify(data));
            }
        }
    });

    ws.on('close', () => {
        console.log("CLOSE");
        removeConnection(token_val, listingId);
    });

    ws.on('pong', () => {
        console.log("PONG");
        // connection.alive = true;
    });
});

