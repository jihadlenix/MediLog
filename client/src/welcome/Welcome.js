import React, { useState } from "react";
import "./Welcome.css";
import image from './imagemedilog.png';
import image1 from './securerec.jpg';
import image2 from './doctorcom.jpg';
import image3 from './vaccinerec.jpg';
import HealingIcon from '@mui/icons-material/Healing';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="welc-container">
      <header className="welc-navbar">
        <div className="welc-logo-container">
          <HealingIcon className="welc-logo-icon" />
          <span className="welc-logo-text">MediLog</span>
        </div>

        <div className="welc-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        <nav className={`welc-nav ${menuOpen ? "welc-nav-open" : ""}`}>
          <ul className="welc-nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="signup">Sign Up</a></li>
            <li><a href="login">Login</a></li>
          </ul>
        </nav>
      </header>

      <section id="home" className="welc-hero">
        <div className="welc-hero-icon">
          <HealingIcon className="welc-hero-healing-icon" />
        </div>
        <h1>Manage Your Health Records at a Click of a Button</h1>
        <p>Track your medical history, vaccinations, and connect with doctors seamlessly.</p>
        <div className="welc-hero-buttons">
        <a href="login" className="welc-btn welc-primary">Get Started as a Patient</a>
        <a href="DrLogin" className="welc-btn welc-primary">Get Started as a Doctor</a>
        </div>
      </section>

      <section id="features" className="welc-features">
        <div className="welc-feature-card">
          <h3>Secure Records</h3>
          <p>Store medical data securely, control access anytime with ease and flexibility.</p>
          <img src={image1} alt="Secure Records" className="welc-feature-image" />
        </div>
        <div className="welc-feature-card">
          <h3>Doctor Connection</h3>
          <p>Enable doctors to access and update your records for optimized treatment and care.</p>
          <img src={image2} alt="Doctor Connection" className="welc-feature-image" />
        </div>
        <div className="welc-feature-card">
          <h3>Vaccine Tracking</h3>
          <p>Track vaccinations, set reminders, and get notified for travel-related vaccine requirements.</p>
          <img src={image3} alt="Vaccine Tracking" className="welc-feature-image" />
        </div>
      </section>

      <section id="about" className="welc-about">
        <h2>About MediLog</h2>
        <p>
          MediLog is a user-centric health management platform. Track vaccinations, surgeries, and connect with healthcare professionals in one streamlined app.
        </p>
      </section>

      <div className="welc-image-section">
        <img src={image} alt="MediLog Visual" />
      </div>

      <section id="contact" className="welc-contact">
        <h2>Contact Us</h2>
        <p>Email: support@medilog.com</p>
        <p>Phone: +961 3 747387</p>
      </section>

      <footer className="welc-footer">
        <p>&copy; 2025 MediLog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;