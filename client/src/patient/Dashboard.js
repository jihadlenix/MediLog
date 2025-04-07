import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Avatar from "@mui/material/Avatar";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicationIcon from "@mui/icons-material/Medication";
import HealingIcon from "@mui/icons-material/Healing";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LeftNavBar from "../components/LeftNavBar";

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
      <LeftNavBar />

      <div className="main-content">
        <div className="left-section">
          <div className="card profile-card">
            <Avatar alt="Profile" src="profilepic.jpg" sx={{ width: 60, height: 60 }} />
            <h2 className="name">{patientInfo?.name || "Loading..."}</h2>
            <p className="age">Patient ID: {patientInfo?.id || "Loading..."}</p>
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
            </div>
          </div>

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
