import React, { useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./HealthRecords.css";
import SearchIcon from "@mui/icons-material/Search";

const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

const Medications = () => {
  const [allMedications, setAllMedications] = useState([]);
  const [expandedMedications, setExpandedMedications] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMedications = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${BASE_URL}/api/medications/my`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch medications");
        }

        const data = await response.json();
        console.log("Fetched Medications:", data);
        setAllMedications(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  const filteredCurrentMedications = allMedications.filter(
    (med) =>
      med.current &&
      med.medicationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastMedications = allMedications.filter(
    (med) =>
      !med.current &&
      med.medicationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedMedications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
        </div>
        <div className="hr-cards">
          {filteredCurrentMedications.length > 0 ? (
            filteredCurrentMedications.map((med) => (
              <div key={med.id} className="hr-card">
                <p><strong>Name:</strong> {med.medicationName}</p>
                <p><strong>Dosage:</strong> {med.dosage}</p>
                <p><strong>Given Date:</strong> {new Date(med.givenDate).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {new Date(med.dueDate).toLocaleDateString()}</p>
                <p><strong>Doctor:</strong> {med.doctorName}</p>
                <p><strong>Target:</strong> {med.target}</p>
                <p><strong>Description:</strong> {med.description}</p>
                <p><strong>Status:</strong> {med.status}</p>
              </div>
            ))
          ) : (
            <p>No current medications found.</p>
          )}
        </div>

        {/* Past Medications */}
        <div className="hr-section">
          <div className="hr-sub-header">
            <h3>Past Medications</h3>
          </div>
          <ul className="hr-list">
            {filteredPastMedications.length > 0 ? (
              filteredPastMedications.map((med) => (
                <li key={med.id} className="hr-list-item">
                  <div className="hr-list-header" onClick={() => toggleExpand(med.id)}>
                    <h4>{med.medicationName}</h4>
                    <span>{expandedMedications[med.id] ? "▼" : "▶"}</span>
                  </div>
                  {expandedMedications[med.id] && (
                    <div className="hr-list-details">
                      <p><strong>Dosage:</strong> {med.dosage}</p>
                      <p><strong>Given Date:</strong> {new Date(med.givenDate).toLocaleDateString()}</p>
                      <p><strong>Due Date:</strong> {new Date(med.dueDate).toLocaleDateString()}</p>
                      <p><strong>Doctor:</strong> {med.doctorName}</p>
                      <p><strong>Target:</strong> {med.target}</p>
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
