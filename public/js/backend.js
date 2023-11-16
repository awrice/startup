async function login(username_, password_) {
    let url = "/api/auth/login";
    let status = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username_, password: password_ })
    }).then((response) => response.status);
    return status
}

async function createUser(username_, password_)  {
    let url = "/api/auth/create";
    let status = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username_, password: password_ })
    }).then((response) => response.status);
    return status;
}

async function getMe() {
    let url = "/api/user/me";
    let status = await fetch(url, { method: "get" })
        .then((response) => response.status);
    return status;
}

async function retrieveImage(imageId) {
    let url = "/api/img/" + imageId;
    let image = await fetch(url, { method: "GET" })
        .then((response) => response.json());
    return image;
}

async function retrieveListings(searchQuery=null) {
    if (searchQuery == null || searchQuery.trim() === "") { searchQuery = "null"; }
    let url = "/api/listing/" + searchQuery;
    let listings = await fetch(url, { method: "GET" })
        .then((response) => response.json());

    return listings;
}

async function retrieveListing(listingId) {
    let url = "/api/listingID/" + listingId;
    let listing = await fetch(url, { method: "GET" })
        .then((response) => response.json());

    return listing;
}

async function retrieveServices() {
    let url = "/api/services";
    console.log("SERVICES");
    let listings = await fetch(url, { method: "GET" })
        .then((response) => response.json())

    return listings;
}

async function retrieveMessages(message_id) {
    let url = "/api/messages/" + message_id;
    console.log(url);
    let messages = await fetch(url, { method: "GET" })
        .then((response) => response.json())

    return messages;
}

async function registerServiceBackend(formData) {
    let response = await fetch("/api/listing", {
        method: "post",
        // headers: { "Content-Type": "application/json" },
        body: formData
    }).then((response) => response.json());
    console.log(response);
    return response;
}

async function getMeowFact() {
    let response = await fetch("https://meowfacts.herokuapp.com/")
        .then((response) => response.json());
    return response["data"][0];
}