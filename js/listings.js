function listingClicked(listing) {
    if (window.location.pathname === "/services.html") { window.location = "/messaging.html?messageId=" + listing["owner_id"]; }
    else { window.location = "/listing.html?listingId=" + listing["id"]; }
}

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
    parent_li.onclick = () => { listingClicked(listing); }
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

function resetListings() {
    let searchQuery = null;
    if (window.location.pathname === "/services.html") { searchQuery = "{PAST}"; }
    else {
        searchQuery = null;
    }
    const listings = retrieveListings(searchQuery);
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

    // resetting the list
    document.querySelector("#listingsOL").innerHTML = "";
    // go through and create the new listings in the right order
    for (listing of listings) {
        createListing(listing);
    }
}

console.log(window.location.pathname);
resetListings();