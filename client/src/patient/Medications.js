import React, { useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./HealthRecords.css";
import SearchIcon from "@mui/icons-material/Search";

const Medications = ({ isDoctor = true }) => {
  const [currentMedications, setCurrentMedications] = useState([
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
  ]);

  const [pastMedications, setPastMedications] = useState([
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
  ]);

  const [expandedMedications, setExpandedMedications] = useState({});

  const toggleExpand = (id) => {
    setExpandedMedications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCurrentMedications = currentMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPastMedications = pastMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showAddCurrentForm, setShowAddCurrentForm] = useState(false);

  const [newCurrentName, setNewCurrentName] = useState("");
  const [newCurrentDosage, setNewCurrentDosage] = useState("");
  const [newCurrentStartDate, setNewCurrentStartDate] = useState("");
  const [newCurrentTarget, setNewCurrentTarget] = useState("");
  const [newCurrentDosagePerDay, setNewCurrentDosagePerDay] = useState("");
  const [newCurrentInstructions, setNewCurrentInstructions] = useState("");
  const [newCurrentDoctor, setNewCurrentDoctor] = useState("");

  const handleAddCurrentMedication = () => {
    const newMed = {
      id: Date.now(),
      name: newCurrentName.trim(),
      dosage: newCurrentDosage.trim(),
      startDate: newCurrentStartDate,
      target: newCurrentTarget.trim(),
      dosagePerDay: newCurrentDosagePerDay.trim(),
      instructions: newCurrentInstructions.trim(),
      doctor: newCurrentDoctor.trim(),
    };

    setCurrentMedications([...currentMedications, newMed]);

    setNewCurrentName("");
    setNewCurrentDosage("");
    setNewCurrentStartDate("");
    setNewCurrentTarget("");
    setNewCurrentDosagePerDay("");
    setNewCurrentInstructions("");
    setNewCurrentDoctor("");

    setShowAddCurrentForm(false);
  };

  const [showAddPastForm, setShowAddPastForm] = useState(false);

  const [newPastName, setNewPastName] = useState("");
  const [newPastStartDate, setNewPastStartDate] = useState("");
  const [newPastEndDate, setNewPastEndDate] = useState("");
  const [newPastDoctor, setNewPastDoctor] = useState("");
  const [newPastCondition, setNewPastCondition] = useState("");
  const [newPastDosage, setNewPastDosage] = useState("");

  const handleAddPastMedication = () => {
    const newMed = {
      id: Date.now(),
      name: newPastName.trim(),
      startDate: newPastStartDate,
      endDate: newPastEndDate,
      doctor: newPastDoctor.trim(),
      condition: newPastCondition.trim(),
      details: [{ dosage: newPastDosage.trim(), date: newPastEndDate }],
    };

    setPastMedications([...pastMedications, newMed]);

    setNewPastName("");
    setNewPastStartDate("");
    setNewPastEndDate("");
    setNewPastDoctor("");
    setNewPastCondition("");
    setNewPastDosage("");

    setShowAddPastForm(false);
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

        <div className="hr-sub-header">
          <h3>Current Medications</h3>
          {isDoctor && !showAddCurrentForm && (
            <button onClick={() => setShowAddCurrentForm(true)} className="hr-add-btn">
              Add New
            </button>
          )}
        </div>

        <div className="hr-cards">
          {filteredCurrentMedications.map((med) => (
            <div key={med.id} className="hr-card">
              <h4>{med.name}</h4>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Start Date:</strong> {med.startDate}</p>
              <p><strong>Prescribed by:</strong> {med.doctor}</p>
              <p><strong>Target:</strong> {med.target}</p>
              <p><strong>Dosage per day:</strong> {med.dosagePerDay}</p>
              <p><strong>Instructions:</strong> {med.instructions}</p>
            </div>
          ))}
        </div>

        {isDoctor && showAddCurrentForm && (
          <div className="hr-add-form">{/* form fields here */}</div>
        )}

        <div className="hr-section">
          <div className="hr-sub-header">
            <h3>Past Medications</h3>
            {isDoctor && !showAddPastForm && (
              <button onClick={() => setShowAddPastForm(true)} className="hr-add-btn">
                Add New
              </button>
            )}
          </div>

          <ul className="hr-list">
            {filteredPastMedications.map((med) => (
              <li key={med.id} className="hr-list-item">
                <div className="hr-list-header" onClick={() => toggleExpand(med.id)}>
                  <h4>{med.name}</h4>
                  <span>{expandedMedications[med.id] ? "▼" : "▶"}</span>
                </div>
                {expandedMedications[med.id] && (
                  <div className="hr-list-details">
                    <p><strong>Start Date:</strong> {med.startDate}</p>
                    <p><strong>End Date:</strong> {med.endDate}</p>
                    <p><strong>Prescribed by:</strong> {med.doctor}</p>
                    <p><strong>Condition Treated:</strong> {med.condition}</p>
                    <p><strong>Dosage Dates:</strong> {med.details.map((d) => `${d.dosage} on ${d.date}`).join(", ")}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {isDoctor && showAddPastForm && (
            <div className="hr-add-form">{/* form fields here */}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medications;
