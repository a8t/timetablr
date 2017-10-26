import React from 'react';
import './Navbar.css';
import Login from './Login/Login.js'

const Navbar = props => {
  return (
    <div
      style={props.style}
      className="navbar" >
      <nav className="navBarLinks">
        <Login />
      </nav>
      <button
        className="printbutton"
        onClick={(e) => window.print()}
      >PRINT CALENDAR</button>
    </div>
  )
}

export default Navbar
