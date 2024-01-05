import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onLogin function passed as a prop
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