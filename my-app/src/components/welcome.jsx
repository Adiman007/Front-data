import React from "react";
import "../css/welcome.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserInfo from "./userInfo";

function Hello() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      };
      const result = await axios.get(`https://backend-web-app.onrender.com/users/me`, config); // Pass the config object with headers
      setUser(result.data);
    };
    fetchData();
  }, [])

  return (
    <>
    <div className="welcome-banner">
      {user && 
      <>
      
      <p className="welcome-banner-text">
        This is a simple app that uses React , pokeapi.co and a custom backend
      </p>
      </>
       }
      <p className="welcome-banner-text">
        You can see our other projects on{" "}
        <a
          href="https://github.com/Adiman007"
          target="_blank"
          rel="noopener noreferrer"
          className="welcome-banner-link"
        >
          GitHub <img src="https://avatars.githubusercontent.com/u/80261099?v=4" alt="GitHub Logo" />
        </a>
         and  {""}
          <a
          href="https://github.com/KodeurFou"
          target="_blank"
          rel="noopener noreferrer"
          className="welcome-banner-link"
        >
          GitHub
          <img src="https://avatars.githubusercontent.com/u/104773256?v=4" alt="Github Logo"/>
          </a> 
      </p>
        <UserInfo /> 
      </div>
     </>
  );
}

export default Hello;