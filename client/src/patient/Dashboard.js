import React, { useState } from "react";
import "./Dashboard.css";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Avatar from "@mui/material/Avatar";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicationIcon from "@mui/icons-material/Medication";
import HealingIcon from "@mui/icons-material/Healing";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Dashboard = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className={`navbar ${navbarActive ? "active" : ""}`}>
        <button className="toggle-btn" onClick={toggleNavbar}>
          ☰
        </button>
        <h1>Health Dashboard</h1>
      </nav>

      <div className="main-content">
        {/* Left Side Section */}
        <div className="left-section">
          {/* Profile Card */}
          <div className="card profile-card">
            <Avatar
              alt="Profile"
              src="profilepic.jpg"
              sx={{ width: 60, height: 60 }}
            />
            <h2 className="name">Wajd Rashed</h2>
            <p className="age">Patient ID: 123456</p>
          </div>

          {/* Information Card */}
          <div className="card info-card">
            <h3>Information</h3>
            <p>
              <strong>Gender:</strong> Male
            </p>
            <p>
              <strong>Blood Type:</strong> O+
            </p>
            <p>
              <strong>Height:</strong> 5'9"
            </p>
            <p>
              <strong>Weight:</strong> 75kg
            </p>
            <p>
              <strong>Major Allergies:</strong> None
            </p>
            <p>
              <strong>Age:</strong> 123456
            </p>
            <p>
              <strong>Last Visit:</strong> 2025-03-01
            </p>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="right-section">
          {/* Top Section with Heart Rate & Temperature Cards */}
          <div className="top-right">
            <div className="card heart-rate-card">
              <MonitorHeartIcon style={{ fontSize: 40, color: "#129BC9" }} />
              <h3>Heart Rate</h3>
              <p>75 BPM</p>
            </div>
            <div className="card heart-rate-card">
              <BloodtypeIcon style={{ color: "red", fontSize: 30 }} />
              <h3>Blood Pressure</h3>
              <p>75 BPM</p>
            </div>
            <div className="card temperature-card">
              <DeviceThermostatIcon style={{ color: "blue", fontSize: 30 }} />
              <h3>Temperature</h3>
              <p>98.6°F</p>
            </div>
          </div>

          {/* Latest Tests and Medications Cards */}
          <div className="card test-medications-card">
            <h3>Test Reports</h3>
            <div className="test-list">
              <div className="test-item">
                <AssignmentTurnedInIcon className="test-icon" />
                <div>
                  <p className="test-title">CT Scan - Full Body</p>
                  <p className="test-date">12th February 2020</p>
                </div>
              </div>
              <div className="test-item">
                <AssignmentTurnedInIcon className="test-icon" />
                <div>
                  <p className="test-title">Creatine Kinase Test</p>
                  <p className="test-date">12th February 2020</p>
                </div>
              </div>
              <div className="test-item">
                <AssignmentTurnedInIcon className="test-icon" />
                <div>
                  <p className="test-title">Eye Fluorescein Test</p>
                  <p className="test-date">12th February 2020</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section with Vaccines, Medications, and Doctors Cards */}
          <div className="bottom-right">
            <div className="card vaccines-card">
              <VaccinesIcon sx={{ fontSize: 40, color: "#129BC9" }} />
              <h3>Vaccines List</h3>
            </div>
            <div className="card medications-list-card">
              <MedicationIcon sx={{ fontSize: 50, color: "#129BC9" }} />
              <h3>Medications List</h3>
            </div>
            <div className="card doctors-list-card">
              <HealingIcon sx={{ fontSize: 50, color: "#129BC9" }} />
              <h3>Doctors List</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
