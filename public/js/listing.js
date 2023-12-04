const urlParams = new URLSearchParams(window.location.search);
const listing_id = urlParams.get("listingId");
console.log(listing_id);

async function retrieve() {

    let listing = await retrieveListing(listing_id);
    console.log(listing);

    // let listing = null;
    // for (l in listings) {
    //     if (listings[l]["id"] === parseInt(listing_id)) {
    //         listing = listings[l];
    //         break;
    //     }
    // }
    return listing;
}

async function setupPage() {
    let listing = await retrieve();
    let json_res = await getMe();
    console.log(`${listing["owner_id"]}`);
    console.log(json_res);
    let image_elem = document.querySelector("#image");
    let name_elem = document.querySelector("#name");
    let location_elem = document.querySelector("#location");
    let description_elem = document.querySelector("#description");

    name_elem.innerHTML = listing["title"];
    location_elem.innerHTML = listing["location"];
    description_elem.innerHTML = listing["description"];
    for (const image_id of listing['imgs']) {
        retrieveImage(image_id).then((image) => {
            image_elem.src = `data:${image.mimetype};base64,${image.buffer}`;
        });
    }

    if (listing["owner_id"] === json_res["userId"]) {
        document.querySelector("#interestedButton").style.visibility = "hidden";
        document.querySelector("#dialog").innerHTML = "This is your listing";
    }
    // if (listing['imgs'].length > 0) {
    //     retrieveImage(listing['imgs']).then((image) => {
    //         console.log(image);
    //         img_elem.src = `data:${image.mimetype};base64,${image.buffer}`;
    //     });
    // }

}

function interestedClicked() {
    // call backend thing to send interest to the owner of the service
    console.log("Interested!");
    sendInterest(listing_id);
}

setupPage();