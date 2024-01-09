import React from "react";
import Hello from "../components/welcome";
import NavBar from "../components/navbar";
import Histo from "../components/histo";
import "../css/home.css"

//<Histo />
import "../css/home.css"
function HomePage() {
    return (
      <>
      <NavBar />
      <div className="hello-container">
        <Hello />
        
      </div>
      <Histo />
      </>
    );
  }
export default HomePage;