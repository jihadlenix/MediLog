import React, { useState } from 'react';
import './Navbar.css';  // Import your CSS file for styles

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive); // Toggle the active state when clicked
  };

  return (
    <div className={`navbar ${isActive ? 'active' : ''}`}>
      <h1>My Dashboard</h1>
      <button className="toggle-btn" onClick={toggleNavbar}>
        ☰
      </button>
      <div className={`navbar-items ${isActive ? 'active' : ''}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
