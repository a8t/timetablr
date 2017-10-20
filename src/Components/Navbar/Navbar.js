import React from 'react';
import './Navbar.css';

const Navbar = props => {
  return (
    <div
      style={props.style}
      className="navbar"
    >
      <button
        className="printbutton"
        onClick={(e) => window.print()}
      >Print your calendar!</button>
      <nav>
        <a href="">Login</a>
        <a href="">Sign Up</a>
      </nav>
    </div>
  )
}

export default Navbar