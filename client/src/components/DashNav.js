import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TopNavBar.css';  //using topnav css
import HealingIcon from '@mui/icons-material/Healing';

const TopNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`top-nav-container ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <HealingIcon className="logo" />
        <span className="logo-name">MediLog</span>
      </div>
      
    </div>
  );
};

export default TopNavBar;