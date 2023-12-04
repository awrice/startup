async function meow() {
    let fact = await getMeowFact();
    document.getElementById("meowFact").innerHTML = fact;
}


async function getServices() {
    let json_res = await getMe();
    if (json_res.status != 200) {
        document.querySelector("#services").innerHTML = "You are not logged in!";
        return;
    }

    let services = await retrieveServices();
    const host_ol = "hostListingsOL";
    const client_ol = "clientListingsOL";

    if (services.host.length == 0) {
        document.querySelector(`#${host_ol}`).innerHTML = "none"
    }
    for (const listing of services.host) {
        let elem = createListing(listing, host_ol);
        elem.onclick = () => {
            window.location = `/messaging.html?listingId=${listing['_id']}`;
        }
    }
    if (services.client.length == 0) {
        document.querySelector(`#${client_ol}`).innerHTML = "none"
    }
    for (const listing of services.client) {
        let elem = createListing(listing, client_ol);
        elem.onclick = () => {
            window.location = `/messaging.html?listingId=${listing['_id']}&role=client`;
        }
    }
}

getServices();