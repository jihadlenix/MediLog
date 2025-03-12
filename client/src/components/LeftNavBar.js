import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './LeftNavBar.css';
import HealingIcon from '@mui/icons-material/Healing';

const LeftNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current path

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`left-nav-container ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <HealingIcon className="logo" />
        <span className="logo-name">MediLog</span>
        <div className="hamburger-menu" onClick={toggleSidebar}>
          &#9776; {/* Hamburger Icon */}
        </div>
      </div>
      <ul className="nav-links">
        <li className={location.pathname === '/dashPatient' ? 'active' : ''}>
          <a href="/dashPatient">Dashboard</a>
        </li>
        <li className={location.pathname === '/medRecord' ? 'active' : ''}>
          <a href="/medRecord">Medical Records</a>
        </li>
        <li className={location.pathname === '/vaccines' ? 'active' : ''}>
          <a href="/vaccines">Vaccines</a>
        </li>
        <li className={location.pathname === '/medications' ? 'active' : ''}>
          <a href="/medications">Medications</a>
        </li>
        <li className={location.pathname === '/settings' ? 'active' : ''}>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavBar;
