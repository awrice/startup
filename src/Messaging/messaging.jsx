import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthState } from "../Login/authState";

import './messaging.css'

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
let socket_str = null;
let socket = null;


export function Messaging({ authState }) {
  const { listingId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(messages);
  }, [messages])

  useEffect(() => {
    let new_sock_str = `${protocol}://${window.location.host}/ws?listingId=${listingId}`
    if (socket_str !== new_sock_str) {
      if (socket !== null) { socket.close(); }
      socket_str = new_sock_str;
    } else if (socket !== null) {
      return;
    }

    socket = new WebSocket(socket_str);
    socket.sendMessage = (msg_text) => {
      console.log(messages);
      console.log(msg_text);
      let message_obj = {'msg': msg_text, 'username' : localStorage.getItem('userName')}
      socket.send(`{"msg":"${msg_text}"}`)
      console.log([...messages, message_obj]);

      setMessages(prevMessages => [...prevMessages, message_obj]);
    }

    socket.onopen = (event) => {
      console.log("ONOPEN");
      console.log(event);
    };
  
    // Display messages we receive from our friends
    socket.onmessage = async (event) => {
      console.log("ONMESSAGE");
      let data = JSON.parse(event.data);
      console.log(data);

      if ('init' in data && data.init == true) {
        setMessages(data.messages);
      } else {
        console.log(messages);
        console.log([...messages, data]);
        setMessages(prevMessages => [...prevMessages, data]);
      }
    };

    socket.onclose = (event) => {
      console.log("ONCLOSE");
    };

    // const cleanup = () => {
    //   console.log('YUH');
    //   if (socket) { socket.close(); }
    // }
    // window.addEventListener('beforeunload', cleanup);
    // return () => {
    //   console.log('YUH');
    //   if (socket) { socket.close(); }
    // };

    // window.addEventListener('beforeunload', cleanup);
  })

  return (
    <div id="allMessages">
      {authState === AuthState.Authenticated && (
        <>
          {messages.map((msg, ind) => {
            let sender = localStorage.getItem('userName') === msg.username ? "me" : "them";
            return (
              <div className={`messageDiv ${sender}`} key={`${ind}_msg`}>
                <p className={`message ${sender}`}>{ msg.msg }</p>
                <p className={`messageUsername ${sender}`}>{ sender === 'me' ? 'you' : msg.username }</p>
              </div>
            )
          })}
          <input 
            type="text"
            id="messageField"
            name="newMessage"
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter') {
                console.log("ENTER");
                console.log(messages);
                socket.sendMessage(e.target.value);
                e.target.value = '';
              }
            }}
            placeholder="Aa"
          />
        </>
      )}
      {authState !== AuthState.Authenticated && (
        <h1>You're not logged in!</h1>
      )}
    </div>
  )
}