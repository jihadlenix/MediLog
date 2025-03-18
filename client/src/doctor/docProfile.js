import React, { useState } from "react";
import "./DoctorProfile.css";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SchoolIcon from "@mui/icons-material/School";
import LeftNavBar from "../components/LeftNavBar";

const DoctorProfile = () => {
  const doctor = {
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    experience: "15 Years",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    availability: "Mon - Fri, 9 AM - 5 PM",
    about:
      "Dr. John Doe is a highly experienced cardiologist specializing in heart-related conditions. He has worked in various renowned hospitals and has a track record of successful treatments.",
    patients: [
      { id: 1, name: "Alice Smith", age: 30, lastVisit: "2025-02-20" },
      { id: 2, name: "Bob Johnson", age: 45, lastVisit: "2025-03-05" },
      { id: 3, name: "Charlie Brown", age: 60, lastVisit: "2025-01-15" },
    ],
    reviews: [
      { id: 1, rating: 5, comment: "Dr. Doe was fantastic! Highly recommend." },
      { id: 2, rating: 4, comment: "Great experience, very professional." },
    ],
    certifications: [
      "Board Certified Cardiologist",
      "Member of American Heart Association",
      "Top Cardiologist Award 2022",
    ],
  };

  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // Close section if it's already open
    } else {
      setActiveSection(section); // Open new section
    }
  };

  return (
    <div className="doctor-profile-container">
      <LeftNavBar />
      <div className="main-content">
        {/* Left Section - Profile */}
        <div className="left-section">
          <div className="profile-card">
            <Avatar className="doctor-avatar" sx={{ width: 90, height: 90 }} />
            <h2 className="doctor-name">{doctor.name}</h2>
            <h3 className="doctor-specialty">{doctor.specialization}</h3>
            <p><strong>Experience:</strong> {doctor.experience}</p>

            <div className="contact-info">
              <p><EmailIcon className="icon" /> {doctor.email}</p>
              <p><PhoneIcon className="icon" /> {doctor.phone}</p>
              <p><ScheduleIcon className="icon" /> {doctor.availability}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="info-card">
            <h3>About</h3>
            <p>{doctor.about}</p>
          </div>
        </div>

        {/* Right Section - Detailed Information */}
        <div className="right-section">
          {/* Section Cards for Interactions */}
          <div className="profile-card" onClick={() => toggleSection("patientsList")}>
            <PersonIcon className="icon" />
            <h3>Patients List</h3>
            {!activeSection && (
              <p className="latest-item">Latest Patient: {doctor.patients[0].name} - {doctor.patients[0].age} years old</p>
            )}
          </div>

          <div className="profile-card" onClick={() => toggleSection("patientReviews")}>
            <ThumbUpIcon className="icon" />
            <h3>Patient Reviews</h3>
            {!activeSection && (
              <p className="latest-item">Latest Review: "{doctor.reviews[0].comment}"</p>
            )}
          </div>

          <div className="profile-card" onClick={() => toggleSection("certifications")}>
            <SchoolIcon className="icon" />
            <h3>Certifications & Achievements</h3>
            {!activeSection && (
              <p className="latest-item">Latest Certification: {doctor.certifications[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* List Section - Below the Profile */}
      {activeSection && (
        <div className="list-section">
          {/* Patients List */}
          {activeSection === "patientsList" && (
            <div className="details-card">
              <h3>Patients List</h3>
              <ul>
                {doctor.patients.map((patient) => (
                  <li key={patient.id}>
                    <span>{patient.name}</span>
                    <span>{patient.age} years old</span>
                    <span>Last Visit: {patient.lastVisit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ratings & Reviews */}
          {activeSection === "patientReviews" && (
            <div className="details-card">
              <h3>Patient Reviews</h3>
              <ul>
                {doctor.reviews.map((review) => (
                  <li key={review.id}>
                    <p><strong>{review.rating} stars</strong></p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications & Achievements */}
          {activeSection === "certifications" && (
            <div className="details-card">
              <h3>Certifications & Achievements</h3>
              <ul>
                {doctor.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
