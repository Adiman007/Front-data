import React, { useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

function LogoutPage() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar />
      <p>Warning: You are about to logout.</p>
      <button onClick={handleLogout}>Confirm Logout</button>
    </div>
  );
}

export default LogoutPage;