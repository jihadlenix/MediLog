import React, { useEffect, useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./HealthRecords.css";
import SearchIcon from "@mui/icons-material/Search";

const Medications = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const [expandedMeds, setExpandedMeds] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddFormCurrent, setShowAddFormCurrent] = useState(false);
  const [showAddFormPast, setShowAddFormPast] = useState(false);
  const [currentMeds, setCurrentMeds] = useState([]);
  const [pastMeds, setPastMeds] = useState([]);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    prescribingDoctor: "",
    notes: "",
  });

  // Temporary flag for doctor check; replace with actual auth logic
  const isDoctor = true;

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/medications/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch medications");

        const data = await response.json();
        const current = [];
        const past = [];

        data.forEach((m) => {
          const medObj = {
            id: m.id,
            name: m.name,
            dosage: m.dosage,
            frequency: m.frequency,
            startDate: new Date(m.startDate).toISOString().split("T")[0],
            endDate: new Date(m.endDate).toISOString().split("T")[0],
            prescribingDoctor: m.prescribingDoctor,
            notes: m.notes,
          };

          if (m.status === "past") {
            past.push(medObj);
          } else {
            current.push(medObj);
          }
        });

        setCurrentMeds(current);
        setPastMeds(past);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [BASE_URL]);

  const toggleExpand = (id) => {
    setExpandedMeds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddMedication = (isPast) => {
    const newEntry = {
      id: Date.now(),
      ...newMed,
    };

    if (isPast) {
      setPastMeds([...pastMeds, newEntry]);
      setShowAddFormPast(false);
    } else {
      setCurrentMeds([...currentMeds, newEntry]);
      setShowAddFormCurrent(false);
    }

    setNewMed({
      name: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: "",
      prescribingDoctor: "",
      notes: "",
    });
  };

  const filteredCurrent = currentMeds.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPast = pastMeds.filter((med) =>
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

        <div className="hr-sub-header">
          <h3>Current Medications</h3>
          {isDoctor && (
            <button
              className="hr-add-btn"
              onClick={() => setShowAddFormCurrent(!showAddFormCurrent)}
            >
              {showAddFormCurrent ? "Cancel" : "Add"}
            </button>
          )}
        </div>

        {showAddFormCurrent && (
          <div className="hr-add-form">
            {Object.keys(newMed).map((field) => (
              <div key={field} className="hr-form-field">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={
                    field.includes("Date")
                      ? "date"
                      : field === "notes"
                      ? "text"
                      : "text"
                  }
                  value={newMed[field]}
                  onChange={(e) =>
                    setNewMed({ ...newMed, [field]: e.target.value })
                  }
                />
              </div>
            ))}
            <button className="hr-save-btn" onClick={() => handleAddMedication(false)}>
              Save
            </button>
          </div>
        )}

        <div className="hr-cards">
          {filteredCurrent.map((med) => (
            <div key={med.id} className="hr-card">
              <p><strong>Name:</strong> {med.name}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Frequency:</strong> {med.frequency}</p>
              <p><strong>Start Date:</strong> {med.startDate}</p>
              <p><strong>End Date:</strong> {med.endDate}</p>
              <p><strong>Prescribing Doctor:</strong> {med.prescribingDoctor}</p>
              <p><strong>Notes:</strong> {med.notes}</p>
            </div>
          ))}
        </div>

        <div className="hr-section">
          <div className="hr-sub-header">
            <h3>Past Medications</h3>
            {isDoctor && (
              <button
                className="hr-add-btn"
                onClick={() => setShowAddFormPast(!showAddFormPast)}
              >
                {showAddFormPast ? "Cancel" : "Add"}
              </button>
            )}
          </div>

          {showAddFormPast && (
            <div className="hr-add-form">
              {Object.keys(newMed).map((field) => (
                <div key={field} className="hr-form-field">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={
                      field.includes("Date")
                        ? "date"
                        : field === "notes"
                        ? "text"
                        : "text"
                    }
                    value={newMed[field]}
                    onChange={(e) =>
                      setNewMed({ ...newMed, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
              <button className="hr-save-btn" onClick={() => handleAddMedication(true)}>
                Save
              </button>
            </div>
          )}

          <ul className="hr-list">
            {filteredPast.map((med) => (
              <li key={med.id} className="hr-list-item">
                <div className="hr-list-header" onClick={() => toggleExpand(med.id)}>
                  <h4>{med.name}</h4>
                  <span>{expandedMeds[med.id] ? "▼" : "▶"}</span>
                </div>
                {expandedMeds[med.id] && (
                  <div className="hr-list-details">
                    <p><strong>Dosage:</strong> {med.dosage}</p>
                    <p><strong>Frequency:</strong> {med.frequency}</p>
                    <p><strong>Start Date:</strong> {med.startDate}</p>
                    <p><strong>End Date:</strong> {med.endDate}</p>
                    <p><strong>Prescribing Doctor:</strong> {med.prescribingDoctor}</p>
                    <p><strong>Notes:</strong> {med.notes}</p>
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
