import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import LeftNavBar from "../components/LeftNavBar";
import Avatar from "@mui/material/Avatar";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HealingIcon from "@mui/icons-material/Healing";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const [patientInfo, setPatientInfo] = useState(null);

  const fetchPatientInfo = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/patients/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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

  useEffect(() => {
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
    <div className="dashboard-desktop">
      <div className="dashboard-container">
        {/* Navigation Bar */}
        <LeftNavBar />

        <div className="dashboard-main-content">
          {/* Left Side Section */}
          <div className="dashboard-left-section">
            {/* Profile Card */}
            <div className="dashboard-card dashboard-profile-card">
              <div className="dashboard-avatar-wrapper">
                <Avatar
                  alt="Profile"
                  src="profilepic.jpg"
                  className="dashboard-avatar"
                />
              </div>
              <div className="dashboard-profile-info">
                <h2 className="dashboard-name">{patientInfo?.name || "Loading..."}</h2>
                <p className="dashboard-age">Patient ID: {patientInfo?.id || "Loading..."}</p>
              </div>
            </div>


              <div className="dashboard-card dashboard-info-card">
                <h3>Information</h3>
                <p><strong>Gender:</strong> {patientInfo?.gender || "N/A"}</p>
                <p><strong>Blood Type:</strong> {patientInfo?.bloodType || "N/A"}</p>
                <p><strong>Height:</strong> {patientInfo?.height || "N/A"}</p>
                <p><strong>Weight:</strong> {patientInfo?.weight || "N/A"}</p>
                <p><strong>Major Allergies:</strong> {patientInfo?.majorAllergies || "None"}</p>
                <p><strong>Age:</strong> {patientInfo?.age || "N/A"}</p>
                <p><strong>Date of Birth:</strong> {patientInfo?.dateOfBirth ? formatDateToMMDDYYYY(patientInfo.dateOfBirth) : "N/A"}</p>
              </div>
            </div>

          {/* Right Side Section */}
          <div className="dashboard-right-section">
            {/* Tests and Medications */}
            <div className="dashboard-card dashboard-test-medications-card">
              <h3>Test Reports</h3>
              <div className="dashboard-test-list">
                <div className="dashboard-test-item">
                  <AssignmentTurnedInIcon className="dashboard-test-icon" />
                  <div>
                    <p className="dashboard-test-title">Lipid Profile Test</p>
                    <p className="dashboard-test-date">5th March 2020</p>
                  </div>
                </div>
                <div className="dashboard-test-item">
                  <AssignmentTurnedInIcon className="dashboard-test-icon" />
                  <div>
                    <p className="dashboard-test-title">MRI Brain Scan</p>
                    <p className="dashboard-test-date">20th March 2020</p>
                  </div>
                </div>
                <div className="dashboard-test-item">
                  <AssignmentTurnedInIcon className="dashboard-test-icon" />
                  <div>
                    <p className="dashboard-test-title">Complete Blood Count (CBC)</p>
                    <p className="dashboard-test-date">11th April 2020</p>
                  </div>
                </div>
                <div className="dashboard-test-item">
                  <AssignmentTurnedInIcon className="dashboard-test-icon" />
                  <div>
                    <p className="dashboard-test-title">HbA1c Test</p>
                    <p className="dashboard-test-date">30th April 2020</p>
                  </div>
                </div>
                <div className="dashboard-test-item">
                  <AssignmentTurnedInIcon className="dashboard-test-icon" />
                  <div>
                    <p className="dashboard-test-title">Thyroid Panel</p>
                    <p className="dashboard-test-date">8th May 2020</p>
                  </div>
                </div>
                <div className="dashboard-test-item">
                  <AssignmentTurnedInIcon className="dashboard-test-icon" />
                  <div>
                    <p className="dashboard-test-title">Pulmonary Function Test</p>
                    <p className="dashboard-test-date">15th May 2020</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="dashboard-bottom-right">
              <Link to="/medications" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="dashboard-card">
                  <MedicationIcon sx={{ fontSize: 50, color: "#129BC9" }} />
                  <h3>Medications List</h3>
                </div>
              </Link>

              <Link to="/surgeries" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="dashboard-card">
                  <HealingIcon sx={{ fontSize: 50, color: "#129BC9" }} />
                  <h3>Surgeries</h3>
                </div>
              </Link>

              <Link to="/vaccines" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="dashboard-card">
                  <VaccinesIcon sx={{ fontSize: 40, color: "#129BC9" }} />
                  <h3>Vaccines List</h3>
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
  );
};

export default Dashboard;
