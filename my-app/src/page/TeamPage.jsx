import React, { Component } from 'react';
import Team from '../components/Team.jsx';
import Navbar from '../components/navbar.jsx';


class TeamPage extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <Team/>
      </>
    );
  }
}

export default TeamPage;
