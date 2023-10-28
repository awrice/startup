function createListing(listing) {
    // create/find the appropriate elements
    const listings_ol_elem = document.querySelector("#listingsOL");
    const parent_li = document.createElement("li");
    const img_elem = document.createElement("img");
    const name_elem = document.createElement("h2");
    const description_elem = document.createElement("p");
    const location_elem = document.createElement("h4");
    const rate_elem = document.createElement("h3");
    // structure them together
    parent_li.classList.add("listing");
    parent_li.appendChild(img_elem);
    parent_li.appendChild(name_elem);
    parent_li.appendChild(description_elem);
    parent_li.appendChild(location_elem);
    parent_li.appendChild(rate_elem);
    listings_ol_elem.appendChild(parent_li);

    // add the values
    img_elem.src = listing["img"];
    name_elem.innerHTML = listing["name"];
    description_elem.innerHTML = listing["description"];
    location_elem.innerHTML = listing["location"];
    // rate is a little different
    if (listing["rate"]["amt"] !== "*") {
        rate_elem.innerHTML = "$" + listing["rate"]["amt"].toString() + "/" + listing["rate"]["unit"];
    } else {
        rate_elem.innerHTML = "Variable Price";
    }
}

function retrieveListings(searchQuery="") {
    // retrieve listings from backend... for now, we'll just use these mock listings
    listings = [
        {
            "id": 1,
            "img": "images/camry.png",
            "name": "Toyota Camry Rental",
            "description": "Take my car! Available for cheap, works great.",
            "location": "Provo, UT",
            "rate": { "amt": 35, "unit": "day" }
        },
        {
            "id": 2,
            "img": "images/movingvan.jpeg",
            "name": "Moving Van Rental",
            "description": "I'm willing to drive anywhere within two hours of central Provo and help move also!",
            "location": "Orem, UT",
            "rate": { "amt": 20, "unit": "hour" }
        },
        {
            "id": 3,
            "img": "images/artpieces.jpg",
            "name": "Art Pieces for the Home",
            "description": "I make amazing art! Commission me to help give some pizzazz those blank walls.",
            "location": "Saratoga Springs, UT",
            "rate": { "amt": "*", "unit": null }
        },
        {
            "id": 4,
            "img": "images/customTshirts.jpg",
            "name": "Custom T-shirts",
            "description": "I'm willing to take a design from you or create one based on your vision! I produce high quality shirts for cheap",
            "location": "Provo, UT",
            "rate": { "amt": 20, "unit": "shirt" }
        },
        {
            "id": 5,
            "img": "images/hikinggear.jpg",
            "name": "Hiking Gear",
            "description": "I have all of the stuff in the picture, the prices will change based on the item and the duration",
            "location": "Provo, UT",
            "rate": { "amt": "*", "unit": null }
        }
    ];
    return listings;
}

function resetListings() {
    const listings = retrieveListings();
    // sort the listings based on the sortBy element
    let sort_by = document.getElementById("sortBy").value;
    if (sort_by === "rate") {
        listings.sort((a, b) => {
            if (a[sort_by]["amt"] === "*") { return 1 }
            return a[sort_by]["amt"] - b[sort_by]["amt"];
        });
    } else {
        listings.sort((a, b) => {
            if (a[sort_by] < b[sort_by]) { return -1 }
            else if (a[sort_by] > b[sort_by]) { return 1 }
            return 0
        });
    }

    document.querySelector("#listingsOL").innerHTML = "";
    for (listing of listings) {
        createListing(listing);
    }


}

resetListings();