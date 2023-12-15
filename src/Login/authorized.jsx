import React from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

export function Authorized(props) {
  const navigate = useNavigate();

  function logout() {
    console.log("log out");
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).catch(() => {
      // Logout failed. Assuming offline
    }).finally(() => {
      localStorage.removeItem('userName');
      props.onLogout();
    });
  }

  return (
    <div className="centered">
      <p>You're Currently Logged in as</p>
      <h1>{props.userName}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}