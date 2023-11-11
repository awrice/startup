function assembleValues() {
    const title_input = document.querySelector("#title");
    const location_input = document.querySelector("#location");
    const description_input = document.querySelector("#description");
    const rate_amt_input = document.querySelector("#rate_amt");
    const rate_unit_input = document.querySelector("#rate_unit");
    const images_input = document.querySelector("#images");

    let listing = {
        "img": null, // uhhh... not sure how we should send images to the backend
        "name": title_input.value,
        "description": description_input.value,
        "location": location_input.value,
        "rate": { "amt": rate_amt_input.value, "unit": rate_unit_input.value },
        "owner_id": -1
    }

    return listing;
}

async function registerClicked() {
    const listing = assembleValues();
    // send the listing to the backend
    response = await registerServiceBackend(listing);
    // add it to the large list, and associate it with this user
    return;
}