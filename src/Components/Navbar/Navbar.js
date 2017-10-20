import React from 'react';
import './Navbar.css';

const Navbar = props => {
  return (
    <div
      style={props.style}
      className="navbar"
    >
      <nav className="navBarLinks">
        <a className="login" href="">LOGIN</a>
        <a className="signup" href="">SIGN UP</a>
      </nav>
      <button
        className="printbutton"
        onClick={(e) => window.print()}
      >Print your calendar!</button>
    </div>
  )
}

export default Navbar
