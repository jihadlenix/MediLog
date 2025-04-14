import React, { useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./HealthRecords.css";
import SearchIcon from "@mui/icons-material/Search";

const Medications = () => {
  // Hardcoded role check; replace with real data in your app
  const isDoctor = false; 

  // Track which past medications are expanded
  const [expandedMedications, setExpandedMedications] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle forms for adding current vs. past medication
  const [showAddFormCurrent, setShowAddFormCurrent] = useState(false);
  const [showAddFormPast, setShowAddFormPast] = useState(false);

  // New medication fields
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    startDate: "",
    dosagePerDay: "",
    doctor: "",
    instructions: "",
  });

  // Example in-memory data
  const [currentMedications, setCurrentMedications] = useState([
    {
      id: 1,
      name: "Atorvastatin",
      dosage: "20mg",
      startDate: "2025-01-01",
      dosagePerDay: "Once daily",
      doctor: "Dr. Sam Johnson",
      instructions: "Take with a full glass of water before bed.",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      startDate: "2024-12-10",
      dosagePerDay: "Twice daily",
      doctor: "Dr. Jane White",
      instructions: "Take with meals to avoid upset stomach.",
    },
  ]);

  const [pastMedications, setPastMedications] = useState([
    {
      id: 3,
      name: "Amoxicillin",
      dosage: "250mg",
      startDate: "2024-10-01",
      dosagePerDay: "3 times a day",
      doctor: "Dr. Brown",
      instructions: "Complete the course for 10 days.",
    },
    {
      id: 4,
      name: "Vitamin D",
      dosage: "2000 IU",
      startDate: "2024-06-15",
      dosagePerDay: "Once daily",
      doctor: "Dr. Stevens",
      instructions: "Take with breakfast.",
    },
  ]);

  // Handle expand/collapse for past medications
  const toggleExpand = (id) => {
    setExpandedMedications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Adding either current or past medication
  const handleAddMedication = (isPast) => {
    const newEntry = {
      id: Date.now(), // rudimentary unique ID
      ...newMedication,
    };

    if (isPast) {
      setPastMedications([...pastMedications, newEntry]);
      setShowAddFormPast(false);
    } else {
      setCurrentMedications([...currentMedications, newEntry]);
      setShowAddFormCurrent(false);
    }

    // Reset the form
    setNewMedication({
      name: "",
      dosage: "",
      startDate: "",
      dosagePerDay: "",
      doctor: "",
      instructions: "",
    });
  };

  // Filter by medication name
  const filteredCurrent = currentMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPast = pastMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hr-page">
      <LeftNavBar />
      <div className="hr-content">
        <div className="hr-header">
          <h2>Medications</h2>
          <div className="hr-search-bar">
            <input
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="hr-search-icon" />
          </div>
        </div>

        {/* Current Medications */}
        <div className="hr-sub-header">
          <h3>Current Medications</h3>
          {/* Only show this button if the user is a doctor */}
          {isDoctor && (
            <button
              className="hr-add-btn"
              onClick={() => setShowAddFormCurrent(!showAddFormCurrent)}
            >
              {showAddFormCurrent ? "Cancel" : "Add New"}
            </button>
          )}
        </div>

        {/* Add New Current Medication Form */}
        {showAddFormCurrent && (
          <div className="hr-add-form">
            {Object.keys(newMedication).map((field) => (
              <div key={field} className="hr-form-field">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={
                    field === "startDate"
                      ? "date"
                      : field === "dosagePerDay"
                      ? "text"
                      : "text"
                  }
                  value={newMedication[field]}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, [field]: e.target.value })
                  }
                />
              </div>
            ))}
            <button className="hr-save-btn" onClick={() => handleAddMedication(false)}>
              Save
            </button>
          </div>
        )}

        {/* Render Current Medications */}
        <div className="hr-cards">
          {filteredCurrent.map((med) => (
            <div key={med.id} className="hr-card">
              <p>
                <strong>Name:</strong> {med.name}
              </p>
              <p>
                <strong>Dosage:</strong> {med.dosage}
              </p>
              <p>
                <strong>Start Date:</strong> {med.startDate}
              </p>
              <p>
                <strong>Dosage/Day:</strong> {med.dosagePerDay}
              </p>
              <p>
                <strong>Doctor:</strong> {med.doctor}
              </p>
              <p>
                <strong>Instructions:</strong> {med.instructions}
              </p>
            </div>
          ))}
        </div>

        {/* Past Medications */}
        <div className="hr-section">
          <div className="hr-sub-header">
            <h3>Past Medications</h3>
            {/* Only show this button if the user is a doctor */}
            {isDoctor && (
              <button
                className="hr-add-btn"
                onClick={() => setShowAddFormPast(!showAddFormPast)}
              >
                {showAddFormPast ? "Cancel" : "Add New"}
              </button>
            )}
          </div>

          {/* Add New Past Medication Form */}
          {showAddFormPast && (
            <div className="hr-add-form">
              {Object.keys(newMedication).map((field) => (
                <div key={field} className="hr-form-field">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={
                      field === "startDate"
                        ? "date"
                        : field === "dosagePerDay"
                        ? "text"
                        : "text"
                    }
                    value={newMedication[field]}
                    onChange={(e) =>
                      setNewMedication({ ...newMedication, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
              <button className="hr-save-btn" onClick={() => handleAddMedication(true)}>
                Save
              </button>
            </div>
          )}

          {/* Render Past Medications (Expandable) */}
          <ul className="hr-list">
            {filteredPast.map((med) => (
              <li key={med.id} className="hr-list-item">
                <div
                  className="hr-list-header"
                  onClick={() => toggleExpand(med.id)}
                >
                  <h4>{med.name}</h4>
                  <span>{expandedMedications[med.id] ? "▼" : "▶"}</span>
                </div>
                {expandedMedications[med.id] && (
                  <div className="hr-list-details">
                    <p>
                      <strong>Dosage:</strong> {med.dosage}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {med.startDate}
                    </p>
                    <p>
                      <strong>Dosage/Day:</strong> {med.dosagePerDay}
                    </p>
                    <p>
                      <strong>Doctor:</strong> {med.doctor}
                    </p>
                    <p>
                      <strong>Instructions:</strong> {med.instructions}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Medications;
