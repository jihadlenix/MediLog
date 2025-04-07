import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const [patientInfo, setPatientInfo] = useState(null);

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
  const formatDateToMMDDYYYY = (isoDate) => {
    const date = new Date(isoDate);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  return (
    <div>
      {/* DESKTOP LAYOUT */}
      <div className="dashboard-desktop">
        <div className="dashboard-container">
          <LeftNavBar />

          <div className="dashboard-main-content">
            {/* LEFT SECTION */}
            <div className="dashboard-left-section">
              <div className="dashboard-card dashboard-profile-card">
                <Avatar
                  alt="Profile"
                  src="profilepic.jpg"
                  sx={{ width: 60, height: 60 }}
                />
                <h2 className="dashboard-name">{patientInfo?.name || "Loading..."}</h2>
                <p className="dashboard-age">Patient ID: {patientInfo?.id || "Loading..."}</p>
              </div>

              <div className="dashboard-card dashboard-info-card">
                <h3>Information</h3>
                <p><strong>Gender:</strong> {patientInfo?.gender || "N/A"}</p>
                <p><strong>Date of Birth:</strong> {patientInfo?.dateOfBirth ? formatDateToMMDDYYYY(patientInfo.dateOfBirth) : "N/A"}</p>
                <p><strong>Email:</strong> {patientInfo?.email || "N/A"}</p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="dashboard-right-section">
              <div className="dashboard-top-right">
                <div className="dashboard-card">
                  <MonitorHeartIcon style={{ fontSize: 40, color: "#129BC9" }} />
                  <h3>Heart Rate</h3>
                  <p>75 BPM</p>
                </div>
                <div className="dashboard-card">
                  <BloodtypeIcon style={{ color: "red", fontSize: 30 }} />
                  <h3>Blood Pressure</h3>
                  <p>120/80</p>
                </div>
                <div className="dashboard-card">
                  <DeviceThermostatIcon style={{ color: "blue", fontSize: 30 }} />
                  <h3>Temperature</h3>
                  <p>98.6°F</p>
                </div>
              </div>

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

      {/* You can keep or replace the tablet/mobile layout similarly if you want it dynamic too */}
    </div>
  );
};

export default Dashboard;
