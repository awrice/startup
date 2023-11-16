async function meow() {
    let fact = await getMeowFact();
    document.getElementById("meowFact").innerHTML = fact;
}


async function getServices() {
    let services = await retrieveServices();
    const host_ol = "hostListingsOL";
    const client_ol = "clientListingsOL";

    if (services.host.length == 0) {
        document.querySelector(`#${host_ol}`).innerHTML = "none"
    }
    for (const listing of services.host) {
        createListing(listing, host_ol);
    }
    if (services.client.length == 0) {
        document.querySelector(`#${client_ol}`).innerHTML = "none"
    }
    for (const listing of services.client) {
        createListing(listing, client_ol);
    }
}

getServices();