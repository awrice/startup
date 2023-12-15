import React, { useState } from 'react';

import './register.css';
import { AuthState } from '../Login/authState.js';


function RegisterForm() {
  const [registered, setRegistered] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("/api/listing", {
      method: "post",
      body: formData
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((json_res) => {
      console.log(json_res);
      if (json_res['acknowledged']) {
        setRegistered(true);
      } else {
        setRegistered(false);
      }
    });
  }

  return (
    <div>
      <h1>Register Your Service</h1>


      {registered != null && (
        <div className='dialog'>
          {registered && (
            <p>Registered Successfully!</p>
          )}
          {registered == false && (
            <p>Couldn't Register</p>
          )}
          <button onClick={ () => {setRegistered(null)} }>Register another service</button>
        </div>
      )}
      {registered == null && (
        <form id="registerServiceForm" method="get" onSubmit={(e) => handleSubmit(e) } className="fullwidth">
          <ul style={{listStyleType: 'none'}}>
            <li>
              <label htmlFor="title">Service Title</label>
              <input type="text" id="title" name="title" placeholder="Hiking Gear" required />
            </li>
            <li>
              <label htmlFor="location">Location</label>
              <input type="text" id="location" name="location" placeholder="Provo, UT" required />
            </li>
            <li>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description"></textarea>
            </li>
            <li>
              <label htmlFor="rate_amt rate_unit">Rate (enter * if the price varies)</label>
              $ <input type="text" id="rate_amt" name="rate_amt" placeholder="20" required /> per
              <input type="text" id="rate_unit" name="rate_unit" placeholder="day" required />
            </li>
            <li>
              <label htmlFor="images">Images associated with your service</label>
              <input type="file" id="images" name="images" accept="image/*" multiple />
            </li>
          </ul>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  )
}

export function Register({ authState }) {
  return (
    <>
      {authState === AuthState.Authenticated  && (
        <RegisterForm />
      )}
      {authState !== AuthState.Authenticated  && (
        <div>
          <h1>You're not logged in!</h1>
          <p>You must log in before you can register a service.</p>
        </div>
      )}
    </>
  )
}