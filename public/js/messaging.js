async function getMessages() {
    const urlParams = new URLSearchParams(window.location.search);
    const message_id = urlParams.get("messageId");

    messages = await retrieveMessages(message_id);
    return messages;
}

function createMessage(message) {
    const message_div = document.querySelector("#messagesDiv");
    const p_elem = document.createElement("p");
    message_div.appendChild(p_elem);

    p_elem.innerHTML = message["message"];
    p_elem.classList.add("message");
    if (message["sender"] == -1) { p_elem.classList.add("me"); }
    else { p_elem.classList.add("them"); }
}

async function setupPage() {
    const message_chain = await getMessages();

    for (message of message_chain) {
        createMessage(message);
    }
}

setupPage();