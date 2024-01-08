import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Register.css"
import { useNavigate } from 'react-router-dom';

function RegisterPage({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [pokemoula, setPokemoula] = useState(1000);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onRegister function passed as a prop

    const data = {
      "username": username,
      "password": password,
      "role": role,
      "pokedollars": pokemoula
    };

    fetch('http://localhost:3001/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response);
      response.json()
    })
    .then(data => {
      // Handle the response data here
      console.log(data);
      navigate('/login');
    })
    .catch((error) => {
      // Handle the error here
      console.error('Error:', error);
    });
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
      <button type="submit">Register</button>
    </form>
    <Link to="/login">Already have an account? Login</Link>
    </>
  );
}

export default RegisterPage;