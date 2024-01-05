import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Register.css"

function RegisterPage({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [pokemoula, setPokemoula] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Convert pokemons from comma-separated string to array of numbers
    const pokemonsArray = pokemons.split(',').map(Number);
    // Call the onRegister function passed as a prop
    onRegister(username, password, role, pokemoula, pokemonsArray);
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