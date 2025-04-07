import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import LeftNavBar from "../components/LeftNavBar";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Avatar from "@mui/material/Avatar";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicationIcon from "@mui/icons-material/Medication";
import HealingIcon from "@mui/icons-material/Healing";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import LeftNavBar from "../components/LeftNavBar"; // optional

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const [navbarActive, setNavbarActive] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);

  const toggleNavbar = () => setNavbarActive(!navbarActive);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${BASE_URL}/api/patients/info?token=${token}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Patient Info:", data);
          setPatientInfo(data);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch patient info:", errorText);
        }
      } catch (error) {
        console.error("Error fetching patient info:", error);
      }
    };

    fetchPatientInfo();
  }, [BASE_URL]);

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <LeftNavBar />

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

          <div className="card info-card">
            <h3>Information</h3>
            <p><strong>Gender:</strong> {patientInfo?.gender || "N/A"}</p>
            <p><strong>Phone:</strong> {patientInfo?.phoneNumber || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {patientInfo?.dateOfBirth || "N/A"}</p>
            <p><strong>Email:</strong> {patientInfo?.email || "N/A"}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-section">
          <div className="top-right">
            <div className="card heart-rate-card">
              <MonitorHeartIcon style={{ fontSize: 40, color: "#129BC9" }} />
              <h3>Heart Rate</h3>
              <p>75 BPM</p>
            </div>
            <div className="card heart-rate-card">
              <BloodtypeIcon style={{ color: "red", fontSize: 30 }} />
              <h3>Blood Pressure</h3>
              <p>120/80</p>
            </div>
            <div className="card temperature-card">
              <DeviceThermostatIcon style={{ color: "blue", fontSize: 30 }} />
              <h3>Temperature</h3>
              <p>98.6°F</p>
            </div>
          </div>

              {/* Tests and Medications */}
              <div className="dashboard-card dashboard-test-medications-card">
                <h3>Test Reports</h3>
                <div className="dashboard-test-list">
                  <div className="dashboard-test-item">
                    <AssignmentTurnedInIcon className="dashboard-test-icon" />
                    <div>
                      <p className="dashboard-test-title">CT Scan - Full Body</p>
                      <p className="dashboard-test-date">12th February 2020</p>
                    </div>
                  </div>
                  <div className="dashboard-test-item">
                    <AssignmentTurnedInIcon className="dashboard-test-icon" />
                    <div>
                      <p className="dashboard-test-title">Creatine Kinase Test</p>
                      <p className="dashboard-test-date">12th February 2020</p>
                    </div>
                  </div>
                  <div className="dashboard-test-item">
                    <AssignmentTurnedInIcon className="dashboard-test-icon" />
                    <div>
                      <p className="dashboard-test-title">Eye Fluorescein Test</p>
                      <p className="dashboard-test-date">12th February 2020</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="dashboard-bottom-right">
                <Link to="/vaccines" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="dashboard-card">
                    <VaccinesIcon sx={{ fontSize: 40, color: "#129BC9" }} />
                    <h3>Vaccines List</h3>
                  </div>
                </Link>

                <Link to="/medications" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="dashboard-card">
                    <MedicationIcon sx={{ fontSize: 50, color: "#129BC9" }} />
                    <h3>Medications List</h3>
                  </div>
                </Link>

                <Link to="/medRecord" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="dashboard-card">
                    <HealingIcon sx={{ fontSize: 50, color: "#129BC9" }} />
                    <h3>Medical Records</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TABLET LAYOUT (768px - 1219px): A simpler two-column alternative   */}
      {/* ----------------------------------------------------------------- */}
      <div className="dashboard-tablet">
        <div className="tablet-container">
          <h1>Patient Dashboard (Tablet)</h1>

          <div className="tablet-top">
            {/* Profile + Info */}
            <div className="tablet-profile">
              <Avatar alt="Profile" src="profilepic.jpg" sx={{ width: 70, height: 70 }} />
              <h2>Wajd Rashed</h2>
              <p>ID: 123456</p>
            </div>
            <div className="tablet-info">
              <h3>Information</h3>
              <p><strong>Gender:</strong> Male</p>
              <p><strong>Blood Type:</strong> O+</p>
              <p><strong>Height:</strong> 5'9"</p>
              <p><strong>Weight:</strong> 75kg</p>
              <p><strong>Allergies:</strong> None</p>
              <p><strong>Age:</strong> 123456</p>
              <p><strong>Last Visit:</strong> 2025-03-01</p>
            </div>
          </div>

          <div className="tablet-middle">
            {/* Vitals */}
            <div className="tablet-vitals">
              <div className="vital-box">
                <MonitorHeartIcon style={{ fontSize: 28, color: "#129BC9" }} />
                <p>75 BPM</p>
              </div>
              <div className="vital-box">
                <BloodtypeIcon style={{ fontSize: 28, color: "red" }} />
                <p>120/80</p>
              </div>
              <div className="vital-box">
                <DeviceThermostatIcon style={{ fontSize: 28, color: "blue" }} />
                <p>98.6°F</p>
              </div>
            </div>

            {/* Tests */}
            <div className="tablet-tests">
              <h3>Test Reports</h3>
              <div className="test-item">
                <AssignmentTurnedInIcon className="test-icon" />
                <div>
                  <p>CT Scan - Full Body</p>
                  <p>12th February 2020</p>
                </div>
              </div>
              <div className="test-item">
                <AssignmentTurnedInIcon className="test-icon" />
                <div>
                  <p>Creatine Kinase Test</p>
                  <p>12th February 2020</p>
                </div>
              </div>
              <div className="test-item">
                <AssignmentTurnedInIcon className="test-icon" />
                <div>
                  <p>Eye Fluorescein Test</p>
                  <p>12th February 2020</p>
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
            <div className="test-item">
              <AssignmentTurnedInIcon className="test-icon" />
              <div>
                <p>Creatine Kinase Test</p>
                <p>12th February 2020</p>
              </div>
            </div>
            <div className="test-item">
              <AssignmentTurnedInIcon className="test-icon" />
              <div>
                <p>Eye Fluorescein Test</p>
                <p>12th February 2020</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mobile-links">
            <Link to="/vaccines" className="mobile-link">
              <VaccinesIcon />
              <span>Vaccines</span>
            </Link>
            <Link to="/medications" className="mobile-link">
              <MedicationIcon />
              <span>Medications</span>
            </Link>
            <Link to="/dashPatient" className="mobile-link">
              <HealingIcon />
              <span>Records</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
