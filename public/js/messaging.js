function getMessages() {
    const urlParams = new URLSearchParams(window.location.search);
    const message_id = urlParams.get("messageId");

    messages = retrieveMessages();
    return messages[message_id];
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

function setupPage() {
    const message_chain = getMessages()

    for (message of message_chain) {
        createMessage(message);
    }
}

setupPage();