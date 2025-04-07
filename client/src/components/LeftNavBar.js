import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LeftNavBar.css';
import HealingIcon from '@mui/icons-material/Healing';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicationIcon from '@mui/icons-material/Medication';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LeftNavBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const navItems = [
    { path: '/dashPatient', label: 'Dashboard', icon: <HomeIcon /> },
    { path: '/medRecord', label: 'Medical Records', icon: <DescriptionIcon /> },
    { path: '/vaccines', label: 'Vaccines', icon: <VaccinesIcon /> },
    { path: '/medications', label: 'Medications', icon: <MedicationIcon /> },
    { path: '/docProfile', label: 'Doctor Profile', icon: <PersonIcon /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`left-nav-container ${isHovered ? 'expanded' : ''} ${isMobile ? 'mobile' : ''}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {!isMobile && (
        <div className="logo-container">
          <HealingIcon className="logo" />
          {isHovered && <span className="logo-name">MediLog</span>}
        </div>
      )}

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <a href={item.path}>
              {item.icon}
              <span className={`nav-text ${isHovered || isMobile ? 'show' : ''}`}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="logout-btn">
        <ExitToAppIcon style={{ fontSize: 24 }} />
        {(isHovered || isMobile) && <span className="logout-text">Logout</span>}
      </div>
    </div>
  );
};

export default LeftNavBar;