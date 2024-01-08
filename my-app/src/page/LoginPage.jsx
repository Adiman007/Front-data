import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onLogin function passed as a prop
    const data = {
      "username": username,
      "password": password
    };


    fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response);
      return response.json(); // Return the response.json() promise
    })
    .then(data => {
      // Handle the response data here
      console.log(data);
      Cookies.set('jwt', data.jwt);
    })
    .catch((error) => {
      // Handle the error here
      console.error('Error:', error);
    });
    //navigate('/home')
    onLogin(username, password);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
    <Link to="/register">Don't have an account? Register</Link>
    </>
  );
}

export default LoginPage;