import React from 'react';

import './login.css';

function MessageDialog(props) {
  return (
    <>
      { props.message && (
        <p>{props.message}</p>
      )}
    </>
  )
}

export function Unauthorized(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dialog, setDialog] = React.useState(null);

  async function loginClicked() {
    setDialog('Logging in...');
    loginOrCreate(`/api/auth/login`);
  }

  async function createClicked() {
    setDialog('Creating User...');
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    let response = await fetch(endpoint, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'username': userName, 'password': password })
    }).then((response) => response.status);

    if (response == 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else if (response == 401) {
      setDialog(`Incorrect username or password`);
    } else if (response == 409) {
      setDialog(`Someone already has that username!`);
    } else {
      setDialog(`There was an error logging in`);
    }
  }

	return (
    <div className="welcome-screen">
      <form method="get" onSubmit={ (e) => e.preventDefault() }>
        <h1>Login</h1>
        <div>
          <label htmlFor="name"></label>
          <input
            type="text"
            value={userName}
            placeholder="username"
            onChange={ (e) => setUserName(e.target.value) }
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <p id="logindialog"></p>
        <button onClick={ loginClicked }>Login</button>
        <button onClick={ createClicked }>Create</button>
        <MessageDialog message={dialog} />
      </form>

    </div>
	)
}