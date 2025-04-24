import React, { useState, useEffect } from "react";
import "./DoctorProfile.css";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LeftNavBar from "../components/LeftNavBar";

const DoctorProfile = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const [accessLinks, setAccessLinks] = useState([]);

  const [doctor, setDoctor] = useState({
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    email: "johndoe@example.com",
    code: "ABC123",
    licenseNumber: "LIC456789",
  });

  const staticInfo = {
    experience: "15 Years",
    phone: "+1 234 567 890",
    availability: "Mon - Fri, 9 AM - 5 PM",
    about:
      "Dedicated healthcare professional committed to delivering high-quality patient care through expertise, compassion, and continuous learning.",
    patients: [
      {
        id: 1,
        name: "Alice Smith",
        age: 30,
        lastVisit: "2025-02-20",
        accessEnabled: true,
        accessDate: "2025-01-01",
      },
      {
        id: 2,
        name: "Bob Johnson",
        age: 45,
        lastVisit: "2025-03-05",
        accessEnabled: false,
        accessDate: "2024-12-15",
      },
      {
        id: 3,
        name: "Charlie Brown",
        age: 60,
        lastVisit: "2025-01-15",
        accessEnabled: true,
        accessDate: "2025-02-10",
      },
      {
        id: 4,
        name: "Diana Prince",
        age: 50,
        lastVisit: "2025-03-28",
        accessEnabled: true,
        accessDate: "2025-02-20",
      },
      {
        id: 5,
        name: "Ethan Hunt",
        age: 39,
        lastVisit: "2025-04-02",
        accessEnabled: false,
        accessDate: "2024-11-10",
      },
    ],
  };

  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const token = localStorage.getItem("tokenDr");

        const response = await fetch(`${BASE_URL}/api/doctors/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Doctor info fetched:", data);
          setDoctor(data); // only contains name, specialty, code, licenseNumber, email
        } else {
          console.error("❌ Failed to fetch doctor info");
        }
      } catch (error) {
        console.error("⚠️ Error fetching doctor info:", error);
      }
    };
    const fetchAccessLinks = async () => {
      try {
        const token = localStorage.getItem("tokenDr");

        const response = await fetch(`${BASE_URL}/api/doctors/access-links`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Access links fetched:", data);
          setAccessLinks(data);
          if (data.length === 0) {
            localStorage.setItem("accessGrant", false);
          }
          
        } else {
          console.error("❌ Failed to fetch access links");
        }
      } catch (error) {
        console.error("⚠️ Error fetching access links:", error);
      }
    };

    fetchDoctorInfo();
    fetchAccessLinks();
  }, [BASE_URL]);

  return (
    <div className="doctor-profile-container">
      <LeftNavBar />

      <div className="main-content">
        {/* Left Section - Profile Info */}
        <div className="left-section">
          <div className="profile-card">
            <Avatar className="doctor-avatar" sx={{ width: 70, height: 70 }} />
            <h2 className="doctor-name">{doctor.name}</h2>
            <h3 className="doctor-specialty">{doctor.specialty}</h3>
            <p>
              <strong>Experience:</strong> {staticInfo.experience}
            </p>

            <div className="contact-info">
              <p>
                <EmailIcon className="icon" /> {doctor.email}
              </p>
              <p>
                <PhoneIcon className="icon" /> {staticInfo.phone}
              </p>
              <p>
                <ScheduleIcon className="icon" /> {staticInfo.availability}
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="info-card">
            <h3>About</h3>
            <p>{staticInfo.about}</p>
          </div>
        </div>

        {/* Right Section - Buttons & Patient Access List */}
        <div className="right-section">
          <div className="stop-access-button-container"></div>
          <div className="access-card">
            <h3>Patients Access</h3>
            <ul className="access-list">
              {accessLinks.map((link) => (
                <li
                  key={link.id}
                  className={`access-item ${
                    link.active ? "enabled" : "disabled"
                  }`}
                >
                  <div className="access-info">
                    <span className="patient-name">
                      {link.patientName || "Unknown Patient"}
                    </span>
                    <span className="access-status">
                      {link.active ? "Access Enabled" : "Access Disabled"}
                    </span>
                    <span className="access-date">
                      Since: {new Date(link.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {link.active ? (
                    <div className="access-link-container">
                      <a
                        href="/dashPatient"
                        className="dashboard-link"
                        onClick={() => {
                          localStorage.setItem("token", link.token);
                          localStorage.setItem("accessGrant", true);
                        }}
                      >
                        View Dashboard
                      </a>
                      {/* The Stop Viewing Patient Button */}
                      <button
                        className="stop-access-button"
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.setItem("accessGrant", false);
                          window.location.reload();
                        }}
                      >
                        Stop Viewing Patient
                      </button>
                    </div>
                  ) : (
                    <span
                      className="dashboard-link disabled-link"
                      title="Access not granted"
                    >
                      View Dashboard
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
