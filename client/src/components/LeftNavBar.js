import React, { useState } from 'react';
import './LeftNavBar.css';
import HealingIcon from '@mui/icons-material/Healing';

const LeftNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`left-nav-container ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <HealingIcon className="logo" />
        <span className="logo-name">mediLog</span>
        <div className="hamburger-menu" onClick={toggleSidebar}>
          &#9776; {/* Hamburger Icon */}
        </div>
      </div>
      <ul className="nav-links">
        <li><a href="/dashPatient">Dashboard</a></li>
        <li><a href="/medRecord">Medical Records</a></li>
        <li><a href="/vaccines">Vaccines</a></li>
        <li><a href="/surgeries">Past Surgeries</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </div>
  );
};

export default LeftNavBar;
