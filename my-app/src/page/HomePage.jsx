import React from "react";
import Hello from "../components/welcome";
import NavBar from "../components/navbar";

import "../css/home.css"
function HomePage() {
    return (
      <>
      <NavBar />
      <div className="hello-container">
        <Hello />
      </div>
      </>
    );
  }
export default HomePage;