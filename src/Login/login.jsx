import React from 'react';

import './login.css';
import { Unauthorized } from './unauthorized';
import { Authorized } from './authorized';
import { AuthState } from './authState';


export function Login({ userName, authState, authChanged }) {
	return (
    <div>
      {authState === AuthState.Authenticated && (
        <Authorized userName={ userName } onLogout={() => authChanged(userName, AuthState.Unauthenticated)}/>
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthorized
          userName={ userName }
          onLogin={ (loginUserName) => {
            authChanged(loginUserName, AuthState.Authenticated);
          }}
        />
      )}
    </div>
  )
}