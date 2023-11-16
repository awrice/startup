function listingClicked(listing) {
    window.location = "/listing.html?listingId=" + listing['_id'];
    // if (window.location.pathname === "/services.html") { window.location = "/messaging.html?messageId=" + listing['owner_id']; }
    // else { window.location = "/listing.html?listingId=" + listing['_id']; }
}

function createListing(listing, listing_ol_id) {
    // create/find the appropriate elements
    const listings_ol_elem = document.querySelector(`#${listing_ol_id}`);
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
    name_elem.innerHTML = listing['title'];
    description_elem.innerHTML = listing['description'];
    location_elem.innerHTML = listing['location'];
    // rate is a little different
    if (listing['rate_amt'] !== "*") {
        rate_elem.innerHTML = "$" + listing['rate_amt'].toString() + "/" + listing['rate_unit'];
    } else {
        rate_elem.innerHTML = "Variable Price";
    }

    if (listing['imgs'].length > 0) {
        retrieveImage(listing['imgs'][0]).then((image) => {
            console.log(image);
            img_elem.src = `data:${image.mimetype};base64,${image.buffer}`;
        });
    }
}

