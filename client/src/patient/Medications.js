import React, { useEffect, useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./HealthRecords.css";
import SearchIcon from "@mui/icons-material/Search";

const Medications = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const [expandedMeds, setExpandedMeds] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMed, setNewMed] = useState({
    medicationName: "",
    dosage: "",
    status: "",
    doctorName: "",
    givenDate: "",
    dueDate: "",
    target: "",
    description: "",
    current: false,
  });

  const isDoctor = localStorage.getItem("isDoctor") === "true";

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

        const formattedMeds = data.map((m) => ({
          id: m.id,
          name: m.medicationName,
          dosage: m.dosage,
          status: m.status,
          current: m.current,
          doctorName: m.doctorName || "N/A",
          givenDate: formatDate(m.givenDate),
          dueDate: formatDate(m.dueDate),
          description: m.description,
          target: m.target,
        }));

        setMedications(formattedMeds);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [BASE_URL]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  const toggleExpand = (id) => {
    setExpandedMeds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMed((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddMedication = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/medications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newMed),
      });

      if (!response.ok) throw new Error("Failed to add medication");

      const savedMed = await response.json();

      setMedications((prev) => [
        ...prev,
        {
          id: savedMed.id,
          name: savedMed.medicationName,
          dosage: savedMed.dosage,
          status: savedMed.status,
          current: savedMed.current,
          doctorName: savedMed.doctorName || "N/A",
          givenDate: formatDate(savedMed.givenDate),
          dueDate: formatDate(savedMed.dueDate),
          description: savedMed.description,
          target: savedMed.target,
        },
      ]);

      setNewMed({
        medicationName: "",
        dosage: "",
        status: "",
        doctorName: "",
        givenDate: "",
        dueDate: "",
        target: "",
        description: "",
        current: false,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const filteredCurrent = medications.filter(
    (med) => med.current && med.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPast = medications.filter(
    (med) => !med.current && med.name?.toLowerCase().includes(searchTerm.toLowerCase())
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

        {isDoctor && (
          <div className="hr-add-button">
            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Add Medication"}
            </button>
          </div>
        )}

        {showForm && isDoctor && (
          <form className="hr-form" onSubmit={handleAddMedication}>
            <input name="medicationName" placeholder="Medication Name" value={newMed.medicationName} onChange={handleInputChange} required />
            <input name="dosage" placeholder="Dosage" value={newMed.dosage} onChange={handleInputChange} />
            <input name="status" placeholder="Status" value={newMed.status} onChange={handleInputChange} />
            <input name="doctorName" placeholder="Doctor Name" value={newMed.doctorName} onChange={handleInputChange} />
            <input name="givenDate" type="date" value={newMed.givenDate} onChange={handleInputChange} />
            <input name="dueDate" type="date" value={newMed.dueDate} onChange={handleInputChange} />
            <input name="target" placeholder="Target" value={newMed.target} onChange={handleInputChange} />
            <textarea name="description" placeholder="Description" value={newMed.description} onChange={handleInputChange} />
            <label>
              <input type="checkbox" name="current" checked={newMed.current} onChange={handleInputChange} />
              Is Current?
            </label>
            <button type="submit">Submit</button>
          </form>
        )}

        <div className="hr-sub-header">
          <h3>Current Medications</h3>
        </div>
        <div className="hr-cards">
          {filteredCurrent.map((med) => (
            <div key={med.id} className="hr-card">
              <p><strong>Name:</strong> {med.name}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Status:</strong> {med.status}</p>
              <p><strong>Given Date:</strong> {med.givenDate}</p>
              <p><strong>Due Date:</strong> {med.dueDate}</p>
              <p><strong>Doctor:</strong> {med.doctorName}</p>
              <p><strong>Target:</strong> {med.target}</p>
              <p><strong>Description:</strong> {med.description}</p>
            </div>
          ))}
        </div>

        <div className="hr-sub-header">
          <h3>Past Medications</h3>
        </div>
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
                  <p><strong>Status:</strong> {med.status}</p>
                  <p><strong>Given Date:</strong> {med.givenDate}</p>
                  <p><strong>Due Date:</strong> {med.dueDate}</p>
                  <p><strong>Doctor:</strong> {med.doctorName}</p>
                  <p><strong>Target:</strong> {med.target}</p>
                  <p><strong>Description:</strong> {med.description}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Medications;
