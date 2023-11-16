// function listingClicked(listing) {
//     if (window.location.pathname === "/services.html") { window.location = "/messaging.html?messageId=" + listing['owner_id']; }
//     else { window.location = "/listing.html?listingId=" + listing['id'] + "&listingName=" + listing['name']; }
// }

// function createListing(listing) {
//     // create/find the appropriate elements
//     const listings_ol_elem = document.querySelector("#listingsOL");
//     const parent_li = document.createElement("li");
//     const img_elem = document.createElement("img");
//     const name_elem = document.createElement("h2");
//     const description_elem = document.createElement("p");
//     const location_elem = document.createElement("h4");
//     const rate_elem = document.createElement("h3");

//     // structure them together
//     parent_li.classList.add("listing");
//     parent_li.onclick = () => { listingClicked(listing); }
//     parent_li.appendChild(img_elem);
//     parent_li.appendChild(name_elem);
//     parent_li.appendChild(description_elem);
//     parent_li.appendChild(location_elem);
//     parent_li.appendChild(rate_elem);
//     listings_ol_elem.appendChild(parent_li);

//     // add the values
//     name_elem.innerHTML = listing['title'];
//     description_elem.innerHTML = listing['description'];
//     location_elem.innerHTML = listing['location'];
//     // rate is a little different
//     if (listing['rate_amt'] !== "*") {
//         rate_elem.innerHTML = "$" + listing['rate_amt'].toString() + "/" + listing['rate_unit'];
//     } else {
//         rate_elem.innerHTML = "Variable Price";
//     }

//     if (listing['imgs'].length > 0) {
//         retrieveImage(listing['imgs'][0]).then((image) => {
//             console.log(image);
//             img_elem.src = `data:${image.mimetype};base64,${image.buffer}`;
//         });
//     }

//     // add the first image
//     for (const imageId of listing['imgs']) {
//         // GET api/img/655541a20d44294e60526369
        
//     }
// }

async function resetListings() {
    let searchQuery = "";
    let listings = null;
    // if (window.location.pathname === "/services.html") {
    //     listings = await retrieveServices();
    // }
    // else {
    searchQuery = document.getElementById("search").value;
    listings = await retrieveListings(searchQuery);
    // }
    console.log(listings);

    // sort the listings based on the sortBy element
    let sort_by = document.getElementById("sortBy").value;
    if (sort_by === "rate") {
        listings.sort((a, b) => {
            if (a["rate_amt"] === "*") { return 1 }
            return a["rate_amt"] - b["rate_amt"];
        });
    } else {
        listings.sort((a, b) => {
            if (a[sort_by] < b[sort_by]) { return -1 }
            else if (a[sort_by] > b[sort_by]) { return 1 }
            return 0
        });
    }

    // resetting the list
    const listings_ol = "listingsOL"
    document.querySelector(`#${listings_ol}`).innerHTML = "";
    // go through and create the new listings in the right order
    for (listing of listings) {
        createListing(listing, listings_ol);
    }
}

console.log(window.location.pathname);
resetListings();