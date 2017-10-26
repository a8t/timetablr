import React from 'react';
import './Navbar.css';

const Navbar = props => {
  return (
    <div
      style={props.style}
      className="navbar"
    >
      <nav className="navBarLinks">
        <button className="login" href="#">LOGIN</button>
        <button className="signup" href="#">SIGN UP</button>
      </nav>
      <button
        className="printbutton"
        onClick={(e) => window.print()}
      >PRINT CALENDAR</button>
    </div>
  )
}

export default Navbar
