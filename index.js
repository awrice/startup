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

const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GET /listing/:query  -->  
apiRouter.get("/listing/:query", (req, res) => {
    let search_query = req.params.query;
    console.log("GET /listing/" + search_query);

    if (search_query === "null") { search_query = ""; }

    // Get the listings from the database
    const all_listings = DATABASE["listings"];
    let filtered_listings = []
    for (const [_id, listing] of Object.entries(all_listings)) {
        if (listing["name"].toLowerCase().includes(search_query.toLowerCase()) || 
            listing["description"].toLowerCase().includes(search_query.toLowerCase()) || 
            listing["location"].toLowerCase().includes(search_query.toLowerCase())) {
            filtered_listings.push(listing);
        }
    }
    res.json(filtered_listings);
});

apiRouter.post("/listing", (req, res) => {
    console.log("POST /listing");

    let id = Object.entries(DATABASE["listings"]).length + 1;
    registered_listing = req.body
    registered_listing["id"] = id;
    DATABASE["listings"][id] = registered_listing;

    let response = {"id": registered_listing["id"]};
    console.log(DATABASE["listings"]);
    res.json(response);
});

apiRouter.get("/services", (_req, res) => {
    console.log("GET /services");
    let service_ids = DATABASE["services"];
    let services = [];
    for (id of service_ids) { services.push(DATABASE["listings"][id]); }
    res.json(services);
});

// any unknown path goes here
// app.use((_req, res) => {
//     res.sendFile('index.html', { root: 'public' });
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
