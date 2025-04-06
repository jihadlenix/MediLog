import React, { useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./Medications.css";
import SearchIcon from "@mui/icons-material/Search";

const Medications = () => {
  const [expandedMedications, setExpandedMedications] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpand = (id) => {
    setExpandedMedications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentMedications = [
    {
        id: 1,
        type: "Appendectomy",
        goal: "Remove infected appendix",
        date: "2024-03-01",
        time: "10:00 AM",
        location: "City Hospital, OR 3",
        doctor: "Dr. James Carter",
        postInstructions: "Rest for 2 weeks, avoid lifting heavy objects."
    },
    {
        id: 2,
        type: "Knee Replacement",
        goal: "Replace damaged knee joint",
        date: "2024-02-15",
        time: "08:00 AM",
        location: "General Hospital, OR 5",
        doctor: "Dr. Sarah Wilson",
        postInstructions: "Physical therapy recommended, avoid strain for 6 weeks."
    },
  ];

  const pastMedications = [
    {
        id: 3,
        type: "Gallbladder Removal",
        goal: "Remove Gallbladder",
        date: "2023-10-01",
        time: "09:30 AM",
        location: "Regional Medical Center, OR 2",
        doctor: "Dr. John Smith",
        postInstructions: "Avoid fatty foods, follow up in 2 weeks."
    },
    {
        id: 4,
        type: "Cataract Surgery",
        goal: "Fix Cataract????",
        date: "2023-08-10",
        time: "11:15 AM",
        location: "Eye Care Clinic, Room 1",
        doctor: "Dr. Emily Davis",
        postInstructions: "Wear sunglasses, avoid bright light, follow up in 3 days."
    },
  ];




  




// Sort surgeries by date (latest first)
const filteredCurrentMedications = currentMedications
  .filter((med) =>
    med.type.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ascending order (oldest first)

const filteredPastMedications = pastMedications
  .filter((med) =>
    med.type.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ascending order (oldest first)





  return (
    <div className="medications-page">
      <LeftNavBar />
      <div className="left-nav">
      </div>
      <div className="medications-content">
        <div className="medications-header">
          <h2>Surgeries</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="search-icon" />
          </div>
        </div>
        {/* Current Medications Section */}
        <div className="section">
          <h3>Current Surgeries</h3>
          <div className="medications-cards">
            {filteredCurrentMedications.length > 0 ? (
              filteredCurrentMedications.map((med) => (
                <div key={med.id} className="medication-card">
                  <h4 className="medication-name">{med.name}</h4>
                  <p>
                    <strong>Type:</strong> {med.type}
                  </p>
                  <p>
                    <strong>Goal:</strong> {med.goal}
                  </p>
                  <p>
                    <strong>Date:</strong> {med.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {med.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {med.location}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {med.doctor}
                  </p>
                  <p>
                    <strong>PostInstructions:</strong> {med.postInstructions}
                  </p>
                </div>
              ))
            ) : (
              <p>No current Surgeries found.</p>
            )}
          </div>
        </div>

        {/* Past Medications Section */}
        <div className="section">
          <h3>Past Surgeries</h3>
          <ul className="medications-list">
            {filteredPastMedications.length > 0 ? (
              filteredPastMedications.map((med) => (
                <li key={med.id} className="medication-item">
                  <div
                    className="medication-header"
                    onClick={() => toggleExpand(med.id)}
                  >
                    <h4>{med.type}</h4>
                    <span>{expandedMedications[med.id] ? "▼" : "▶"}</span>
                  </div>
                  {expandedMedications[med.id] && (
                    <div className="medication-info">
                      <p>
                        <strong>Type:</strong> {med.type}
                      </p>
                      <p>
                        <strong>Goal:</strong> {med.goal}
                      </p>
                      <p>
                        <strong>Date:</strong> {med.date}
                      </p>
                      <p>
                        <strong>Time:</strong> {med.time}
                      </p>
                      <p>
                        <strong>Location:</strong>{med.location}
                      </p>
                      <p>
                        <strong>Doctor:</strong>{med.doctor}
                      </p>
                      <p>
                        <strong>PostInstructions:</strong>{med.postInstructions}
                      </p>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No past Surgeries found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Medications;