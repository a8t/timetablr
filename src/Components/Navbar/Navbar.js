import React from 'react';
import './Navbar.css';

const Navbar = props => {
  return (
    <div
      style={props.style}
      className="navbar"
    >
      <button
        className="removeEntry"
        onClick={(e) => window.print()}
      >x</button>
    </div>
  )
}

export default Navbar