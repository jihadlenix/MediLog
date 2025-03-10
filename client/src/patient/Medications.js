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
      name: "Amoxicillin",
      dosage: "500mg",
      startDate: "2024-03-01",
      target: "Treats bacterial infections",
      dosagePerDay: "3 times a day",
      instructions: "Take with meals, every 8 hours",
      doctor: "Dr. James Carter",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "1000mg",
      startDate: "2024-02-15",
      target: "Controls blood sugar levels",
      dosagePerDay: "Twice a day",
      instructions: "Take after meals, morning and evening",
      doctor: "Dr. Sarah Wilson",
    },
  ];

  const pastMedications = [
    {
      id: 3,
      name: "Ibuprofen",
      startDate: "2023-10-01",
      endDate: "2023-11-05",
      doctor: "Dr. John Smith",
      condition: "Pain relief for arthritis",
      details: [
        { dosage: "200mg", date: "2023-10-12" },
        { dosage: "200mg", date: "2023-11-05" },
      ],
    },
    {
      id: 4,
      name: "Atorvastatin",
      startDate: "2023-08-10",
      endDate: "2023-09-15",
      doctor: "Dr. Emily Davis",
      condition: "High cholesterol treatment",
      details: [
        { dosage: "10mg", date: "2023-08-20" },
        { dosage: "10mg", date: "2023-09-15" },
      ],
    },
  ];

  // Filter medications based on search
  const filteredCurrentMedications = currentMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastMedications = pastMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medications-page">
      <div className="left-nav">
        <LeftNavBar />
      </div>
      <div className="medications-content">
        <div className="medications-header">
          <h2>Medications</h2>

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
          <h3>Current Medications</h3>
          <div className="medications-cards">
            {filteredCurrentMedications.length > 0 ? (
              filteredCurrentMedications.map((med) => (
                <div key={med.id} className="medication-card">
                  <h4 className="medication-name">{med.name}</h4>
                  <p>
                    <strong>Dosage:</strong> {med.dosage}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {med.startDate}
                  </p>
                  <p>
                    <strong>Prescribed by:</strong> {med.doctor}
                  </p>
                  <p>
                    <strong>Target:</strong> {med.target}
                  </p>
                  <p>
                    <strong>Dosage per day:</strong> {med.dosagePerDay}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {med.instructions}
                  </p>
                </div>
              ))
            ) : (
              <p>No current medications found.</p>
            )}
          </div>
        </div>

        {/* Past Medications Section */}
        <div className="section">
          <h3>Past Medications</h3>
          <ul className="medications-list">
            {filteredPastMedications.length > 0 ? (
              filteredPastMedications.map((med) => (
                <li key={med.id} className="medication-item">
                  <div
                    className="medication-header"
                    onClick={() => toggleExpand(med.id)}
                  >
                    <h4>{med.name}</h4>
                    <span>{expandedMedications[med.id] ? "▼" : "▶"}</span>
                  </div>
                  {expandedMedications[med.id] && (
                    <div className="medication-info">
                      <p>
                        <strong>Start Date:</strong> {med.startDate}
                      </p>
                      <p>
                        <strong>End Date:</strong> {med.endDate}
                      </p>
                      <p>
                        <strong>Prescribed by:</strong> {med.doctor}
                      </p>
                      <p>
                        <strong>Condition Treated:</strong> {med.condition}
                      </p>
                      <p>
                        <strong>Dosage:</strong>{" "}
                        {med.details.map((detail) => detail.dosage).join(", ")}
                      </p>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No past medications found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Medications;
