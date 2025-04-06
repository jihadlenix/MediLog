import React, { useState, useEffect } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./Medications.css";
import SearchIcon from "@mui/icons-material/Search";

const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

const Medications = ({ isDoctor = true }) => {
  const [allMedications, setAllMedications] = useState([]);
  const [expandedMedications, setExpandedMedications] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMedications = async () => {
      const patientId = "67e4aa29739960018757c327";

      try {
        const response = await fetch(
          `${BASE_URL}/api/medications/patient/${patientId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch medications");
        }

        const data = await response.json();
        console.log("Fetched Medications:", data);
        setAllMedications(data); // Store entire array
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  // Filter and search
  const filteredCurrentMedications = allMedications.filter(
    (med) =>
      med.current === true &&
      med.medicationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastMedications = allMedications.filter(
    (med) =>
      med.current === false &&
      med.medicationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedMedications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="medications-page">
      <LeftNavBar />

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

        {/* Current Medications */}
        <div className="section">
          <div className="sub-header">
            <h3>Current Medications</h3>
          </div>
          <div className="medications-cards">
            {filteredCurrentMedications.length > 0 ? (
              filteredCurrentMedications.map((med) => (
                <div key={med.id} className="medication-card">
                  <h4 className="medication-name">{med.medicationName}</h4>
                  <p><strong>Dosage:</strong> {med.dosage}</p>
                  <p><strong>Given Date:</strong> {new Date(med.givenDate).toLocaleDateString()}</p>
                  <p><strong>Due Date:</strong> {new Date(med.dueDate).toLocaleDateString()}</p>
                  <p><strong>Prescribed by:</strong> {med.doctorName}</p>
                  <p><strong>Target:</strong> {med.target}</p>
                  <p><strong>Description:</strong> {med.description}</p>
                  <p><strong>Status:</strong> {med.status}</p>
                </div>
              ))
            ) : (
              <p>No current medications found.</p>
            )}
          </div>
        </div>

        {/* Past Medications */}
        <div className="section">
          <div className="sub-header">
            <h3>Past Medications</h3>
          </div>
          <ul className="medications-list">
            {filteredPastMedications.length > 0 ? (
              filteredPastMedications.map((med) => (
                <li key={med.id} className="medication-item">
                  <div
                    className="medication-header"
                    onClick={() => toggleExpand(med.id)}
                  >
                    <h4>{med.medicationName}</h4>
                    <span>{expandedMedications[med.id] ? "▼" : "▶"}</span>
                  </div>
                  {expandedMedications[med.id] && (
                    <div className="medication-info">
                      <p><strong>Given Date:</strong> {new Date(med.givenDate).toLocaleDateString()}</p>
                      <p><strong>Due Date:</strong> {new Date(med.dueDate).toLocaleDateString()}</p>
                      <p><strong>Prescribed by:</strong> {med.doctorName}</p>
                      <p><strong>Description:</strong> {med.description}</p>
                      <p><strong>Status:</strong> {med.status}</p>
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
