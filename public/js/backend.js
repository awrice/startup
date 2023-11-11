// fetch("/api/listing/imadam", {
//     method: "GET"
// })  .then((response) => response.json())
//     .then((jsonResponse) => {
//     console.log(jsonResponse);
//   });



async function retrieveListings(searchQuery=null) {
    if (searchQuery == null || searchQuery.trim() === "") { searchQuery = "null"; }
    let url = "/api/listing/" + searchQuery;
    let listings = await fetch(url, { method: "GET" })
        .then((response) => response.json())

    return listings;
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

async function registerServiceBackend(listing) {
    let response = await fetch("/api/listing", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listing)
    }).then((response) => response.json());
    return response;
}

async function getMeowFact() {
    let response = await fetch("https://meowfacts.herokuapp.com/")
        .then((response) => response.json());
    return response["data"][0];
}