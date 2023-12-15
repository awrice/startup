import React, { useEffect, useState } from 'react';

import { ListingEntry } from '../Listings/listingEntry.jsx';
import { AuthState } from '../Login/authState.js';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export function Services({ authState }) {
  const [clientServices, setClientServices] = useState([]);
  const [hostServices, setHostServices] = useState([]);
  const navigate = useNavigate();

  function retrieveServices() {
    let url = "/api/services";
    fetch(url, { method: "get" })
    .then((response) => response.json())
    .then((json_res) => {
      setHostServices(json_res['host']);
      setClientServices(json_res['client']);
    });
  }

  useEffect(() => {
    retrieveServices();
  }, [])

  return (
    <div>
      {authState === AuthState.Authenticated && (
        <div>
          {/* <h2 id="meowFactClicker" onclick="meow()">Click here to get a Meow Fact!</h2>
          <p id="meowFact">[Meow Fact here]</p> */}
          <div id="services">
            <h1>Your Registered Services</h1>
            <ul id="hostListingsOL">
              {hostServices.map((listing) => (
                // <Link to="/messaging">
                  <ListingEntry 
                    key={listing['_id']} 
                    listing={ listing } 
                    click_func={() => {
                      navigate(`/messaging/${listing['_id']}`)
                    }}
                  />
              ))}
            </ul>
            <h1>Services You're Using</h1>
            <ul id="clientListingsOL">
              {clientServices.map((listing) => (
                <ListingEntry 
                  key={listing['_id']} 
                  listing={ listing } 
                  click_func={() => {
                    navigate(`/messaging/${listing['_id']}`)
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
  
      )}
      {authState !== AuthState.Authenticated && (
        <div>
          <h1>You're not logged in!</h1>
          <p>You must log in before you can associate yourself with services.</p>
        </div>
      )}
    </div>
  )
}