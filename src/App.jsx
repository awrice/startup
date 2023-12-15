import { useState } from 'react'
import React from 'react'
import {
  BrowserRouter,
  NavLink,
  Routes,
  Navigate,
  Route
} from "react-router-dom";
import { Account } from './Account/account.jsx'
import { Listings } from './Listings/listings.jsx'
import { ListingClicked } from './Listings/listingClicked.jsx';
import { Login } from './Login/login.jsx'
import { Register } from './Register/register.jsx'
import { Services } from './Services/services.jsx'
import { Messaging } from './Messaging/messaging.jsx';
import { AuthState } from './Login/authState.js';
import './App.css'

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <header>
        <h1>Pocket Towns</h1>
        <nav>
          <menu>
            <li><NavLink to="/">Home</NavLink></li>
            {authState === AuthState.Authenticated && (
              <>
                <li><NavLink to="/listings">Listings</NavLink></li>
                <li><NavLink to="/register">Register Your Service</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/account">Account</NavLink></li>
              </>
            )}
          </menu>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={
              <Login userName={userName} authState={authState} authChanged={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}/>
            }
            exact 
          />
          <Route path="/listings" element={<Listings />} />
          <Route path="/register" element={<Register authState={ authState } />} />
          <Route path="/services" element={<Services authState={ authState } />} />
          <Route path="/account" element={<Account authState={ authState } />} />
          <Route path="/messaging/:listingId" element={<Messaging authState={ authState } />} />
          <Route path="/listing/:listingId" element={<ListingClicked authState={ authState } />} />
          {/* element={<Messaging authState={ authState } {...props} />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer>
        <span className="text-reset">Adam Rice</span>
        <a href="https://github.com/awrice/startup">GitHub</a>
      </footer>
    </BrowserRouter>
  )
}

export default App
