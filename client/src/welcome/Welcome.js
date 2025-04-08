import React from "react";
import "./Welcome.css";
import image from './imagemedilog.png';
import image1 from './securerec.jpg';
import image2 from './doctorcom.jpg';
import image3 from './vaccinerec.jpg';
import HealingIcon from '@mui/icons-material/Healing';


const App = () => {
  return (
    <div className="container">
      <header className="navbar">
        <div className="logo-container">
          <HealingIcon className="logo" />
          <span className="logo">MediLog</span>
        </div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="signup" >Sign Up</a></li>
            <li><a href="login" >Login</a></li>
          </ul>
        </nav>
      </header>
      <section id="home" className="hero">
        <div className="hero-icon">
          <HealingIcon
            style={{
              width: '10vw',       // 10% of the viewport width
              height: '10vw',
              maxWidth: '100px',   // optional: cap the size
              maxHeight: '100px',
              minWidth: '40px',    // optional: set a minimum
              minHeight: '40px',
              color: '#ffffff',
            }}
          />
        </div>
        <h1>Manage Your Health Records at a Click of a Button</h1>
        <p>Track your medical history, vaccinations, and connect with doctors seamlessly.</p>
        <a href="dashPatient" className="btn primary">Get Started</a>
      </section>
      <section id="features" className="features">
        <div className="feature-card">
          <h3>Secure Records</h3>
          <p>All your medical data is securely stored and only accessible by you and individuals you deem trusted, give and revoke access at any point as you see fit in a fast, easy and intuitive manner.</p>
          <img src={image1} alt="Secure Records" className="feature-image" />
        </div>
        <div className="feature-card">
          <h3>Doctor Connection</h3>
          <p>Share records with your healthcare provider for better treatment, allowing them to access and edit your records as well as communicate with you all in one place.</p>
          <img src={image2} alt="Doctor Connection" className="feature-image" />
        </div>
        <div className="feature-card">
          <h3>Vaccine Tracking</h3>
          <p>Keep an up-to-date record of all vaccinations and immunizations, as well as a reminder for future vaccinations, with a special feature informing you of necessary vaccines required for travel to certain countries.</p>
          <img src={image3} alt="Vaccine Tracking" className="feature-image" />
        </div>
      </section>
      <section id="about" className="about">
        <h2>About Medilog</h2>
        <p>Medilog is a user-friendly medical app that helps streamline healthcare management. It allows users to track vaccinations, doctor visits, and upcoming surgeries, while doctors can view and update patient records, including dietary and surgical needs. The app features vaccination reminders and secure messaging for direct doctor-patient communication, all in one convenient platform.</p>      </section>

      {/* Add the image here */}
      <div className="image-section">
        <img src={image} alt="section breaker" />
      </div>



      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Email: support@medilog.com</p>
        <p>Phone: +961 3 747387</p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Medilog.</p>
      </footer>
    </div>
  );
};

export default App;