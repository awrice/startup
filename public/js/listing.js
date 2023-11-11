

async function retrieveListing() {
    const urlParams = new URLSearchParams(window.location.search);
    const listing_id = urlParams.get("listingId");
    const listing_name = urlParams.get("listingName");
    console.log(listing_id);
    console.log(listing_name)

    let listings = await retrieveListings(listing_name);
    console.log(listings);

    let listing = null;
    for (l in listings) {
        if (listings[l]["id"] === parseInt(listing_id)) {
            listing = listings[l];
            break;
        }
    }
    return listing;
}

async function setupPage() {
    listing = await retrieveListing();
    let image_elem = document.querySelector("#image");
    let name_elem = document.querySelector("#name");
    let location_elem = document.querySelector("#location");
    let description_elem = document.querySelector("#description");

    image_elem.src = listing["img"];
    name_elem.innerHTML = listing["name"];
    location_elem.innerHTML = listing["location"];
    description_elem.innerHTML = listing["description"];
}

function sendInterest() {
    // call backend thing to send interest to the owner of the service
    console.log("Interested!");
}

setupPage();