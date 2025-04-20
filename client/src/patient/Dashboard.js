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
  const [doctorNames, setDoctorNames] = useState([]);

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
  
  const handleSendAccessLink = async () => {

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/doctors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const names = data.map((doctor) => doctor.name); // Adjust field name if needed
        setDoctorNames(names);
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch doctors:", errorText);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
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
        <LeftNavBar />

        <div className="dashboard-main-content">
          {/* Left Section */}
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

                <button
                  className="send-access-link-btn"
                  onClick={handleSendAccessLink}
                  style={{
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#129BC9",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Send Access Link
                </button>

                {doctorNames.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <h4>Doctors List:</h4>
                    <ul>
                      {doctorNames.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Patient Info Card */}
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

          {/* Right Section */}
          <div className="dashboard-right-section">
            {/* Test Reports */}
            <div className="dashboard-card dashboard-test-medications-card">
              <h3>Test Reports</h3>
              <div className="dashboard-test-list">
                {[
                  { title: "Lipid Profile Test", date: "5th March 2020" },
                  { title: "MRI Brain Scan", date: "20th March 2020" },
                  { title: "Complete Blood Count (CBC)", date: "11th April 2020" },
                  { title: "HbA1c Test", date: "30th April 2020" },
                  { title: "Thyroid Panel", date: "8th May 2020" },
                  { title: "Pulmonary Function Test", date: "15th May 2020" },
                ].map((test, idx) => (
                  <div key={idx} className="dashboard-test-item">
                    <AssignmentTurnedInIcon className="dashboard-test-icon" />
                    <div>
                      <p className="dashboard-test-title">{test.title}</p>
                      <p className="dashboard-test-date">{test.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Links */}
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
