import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TopNavBar.css';  // Change the class name to TopNavBar.css
import HealingIcon from '@mui/icons-material/Healing';

const TopNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current path

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`top-nav-container ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <HealingIcon className="logo" />
        <span className="logo-name">MediLog</span>
      </div>
      <div className="nav-links-container">
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
          <li className={location.pathname === '/docProfile' ? 'active' : ''}>
            <a href="/docProfile">Doctor Profile</a>
          </li>
          <li className={location.pathname === '/surgeries' ? 'active' : ''}>
            <a href="/surgeries">Surgeries</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavBar;