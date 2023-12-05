async function getMessages() {
    const urlParams = new URLSearchParams(window.location.search);
    const message_id = urlParams.get("messageId");

    messages = await retrieveMessages(message_id);
    return messages;
}

function createMessage(message, sender) {
    const message_div = document.querySelector("#messagesDiv");
    const msg_elem = document.createElement("p");
    const name_elem = document.createElement("p");
    message_div.appendChild(msg_elem);
    

    msg_elem.innerHTML = message;
    name_elem.innerHTML = sender;
    msg_elem.classList.add("message");
    name_elem.classList.add("messageUsername");
    if (sender == -1) { msg_elem.classList.add("me"); }
    else { 
        message_div.appendChild(name_elem);
        msg_elem.classList.add("them");
    }
}

function appendMessage(message, username) {
    createMessage(message, username);
}

function sendMessage(socket) {
    const msgEl = document.querySelector('#messageField');
    const msg = msgEl.value;
    console.log(msg);
    socket.send(`{"msg":"${msg}"}`);
}

async function setupPage() {
    // const message_chain = await getMessages();

    // for (message of message_chain) {
    //     createMessage(message);
    // }

    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get("listingId");;
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws?listingId=${listingId}`);

    // Display that we have opened the webSocket
    socket.onopen = (event) => {
        // appendMsg('system', 'websocket', 'connected');
        console.log("ONOPEN");
        console.log(event);
    };

    // Display messages we receive from our friends
    socket.onmessage = async (event) => {
        // const text = await event.data.text();
        console.log("ONMESSAGE");
        let data = JSON.parse(event.data);
        appendMessage(data['msg'], data['username']);
        // console.log(JSON.parse(text));
        // const chat = JSON.parse(text);
        // appendMsg('friend', chat.name, chat.msg);
    };

    socket.onclose = (event) => {
        console.log("ONCLOSE");
        console.log(event);

        // appendMsg('system', 'websocket', 'disconnected');
        // document.querySelector('#name-controls').disabled = true;
        // document.querySelector('#chat-controls').disabled = true;
    };

    const input = document.querySelector('#messageField');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage(socket);
            createMessage(input.value, -1);
            input.value = '';
        }
    });
}

setupPage();