import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

import { ReactComponent as HomeIcon } from "../assets/house.svg";
import { ReactComponent as RandomIcon } from "../assets/egg.svg";
import { ReactComponent as TeamIcon } from "../assets/pokeball.svg";
import { ReactComponent as SearchIcon } from "../assets/magnifying.svg";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">
          <HomeIcon className="icon"/>
          My stats
          </Link>
        </li>
        <li>
          <Link to="/team">
          <TeamIcon className="icon"/>
          My team
          </Link>
        </li>
        <li>
          <Link to="/hatch">
          <RandomIcon className="icon"/>
          Hatch eggs
          </Link>
        </li>
        <li>
          <Link to="/logout">
          <SearchIcon className="icon"/>
          Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;