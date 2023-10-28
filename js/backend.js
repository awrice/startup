

function retrieveListings(searchQuery=null) {
    if (searchQuery === "{PAST}") {
        console.log("FINDING HISTORY");
        return getHistory();
    }
    // retrieve listings from backend... for now, we'll just use these mock listings
    const listings = [
        {
            "id": 1,
            "img": "images/camry.png",
            "name": "Toyota Camry Rental",
            "description": "Take my car! Available for cheap, works great.",
            "location": "Provo, UT",
            "rate": { "amt": 35, "unit": "day" },
            "owner_id": 1
        },
        {
            "id": 2,
            "img": "images/movingvan.jpeg",
            "name": "Moving Van Rental",
            "description": "I'm willing to drive anywhere within two hours of central Provo and help move also!",
            "location": "Orem, UT",
            "rate": { "amt": 20, "unit": "hour" },
            "owner_id": 3
        },
        {
            "id": 3,
            "img": "images/artpieces.jpg",
            "name": "Art Pieces for the Home",
            "description": "I make amazing art! Commission me to help give some pizzazz those blank walls.",
            "location": "Saratoga Springs, UT",
            "rate": { "amt": "*", "unit": null },
            "owner_id": 17
        },
        {
            "id": 4,
            "img": "images/customTshirts.jpg",
            "name": "Custom T-shirts",
            "description": "I'm willing to take a design from you or create one based on your vision! I produce high quality shirts for cheap",
            "location": "Provo, UT",
            "rate": { "amt": 20, "unit": "shirt" },
            "owner_id": 4
        },
        {
            "id": 5,
            "img": "images/hikinggear.jpg",
            "name": "Hiking Gear",
            "description": "I have all of the stuff in the picture, the prices will change based on the item and the duration",
            "location": "Provo, UT",
            "rate": { "amt": "*", "unit": null },
            "owner_id": 21
        }
    ];
    return listings;
}

function getHistory() {
    const history = [
        {
            "id": 1,
            "img": "images/camry.png",
            "name": "Toyota Camry Rental",
            "description": "Take my car! Available for cheap, works great.",
            "location": "Provo, UT",
            "rate": { "amt": 35, "unit": "day" },
            "owner_id": 12
        },
        {
            "id": 2,
            "img": "images/movingvan.jpeg",
            "name": "Moving Van Rental",
            "description": "I'm willing to drive anywhere within two hours of central Provo and help move also!",
            "location": "Orem, UT",
            "rate": { "amt": 40, "unit": "hour" },
            "owner_id": 15
        }
    ];
    return history;
}

function retrieveMessages() {
    // get messages from backend
    const user_messages = {
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
    return user_messages;
    
}