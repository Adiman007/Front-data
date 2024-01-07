import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamPage from './page/TeamPage';
import RandomPage from './page/RandomPage';
import NotFoundPage from './page/NotFoundPage';
import HomePage from './page/HomePage';

import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import LogoutPage from './page/LogoutPage';

import './css/App.css';

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); //change to false

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        {isLoggedIn ? (
          <>
              <Route path="/hatch" element={<RandomPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/home" element={<HomePage />} />
              
                <Route path="/logout" element={<LogoutPage onLogout={handleLogout} />} />
              
          </>
        ) : (  
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {isLoggedIn ? (<Route path="*" element={<HomePage />} />)
        : (<Route path="*" element={<RegisterPage />} />)
        }
        
      </Routes>
    </AuthContext.Provider>
    </BrowserRouter>
  );
}
export default App;
