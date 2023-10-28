

function retrieveListing() {
    const urlParams = new URLSearchParams(window.location.search);
    const listing_id = urlParams.get("listingId");
    console.log(listing_id);

    listings = retrieveListings();

    listing = null;
    for (l in listings) {
        if (listings[l]["id"] === parseInt(listing_id)) {
            listing = listings[l];
            break;
        }
    }
    return listing
}

function setupPage() {
    listing = retrieveListing();
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