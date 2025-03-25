import React, { useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./Medications.css";
import SearchIcon from "@mui/icons-material/Search";

const Medications = ({ isDoctor = true }) => {
  // ---------------------------
  // 1) State for current & past meds
  // ---------------------------
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

  // ---------------------------
  // 2) Expand/collapse logic for past meds
  // ---------------------------
  const [expandedMedications, setExpandedMedications] = useState({});

  const toggleExpand = (id) => {
    setExpandedMedications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ---------------------------
  // 3) Search logic
  // ---------------------------
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCurrentMedications = currentMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPastMedications = pastMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------------------
  // 4) "Add new medication" forms
  // ---------------------------
  // We'll have one form for "current meds" and one for "past meds".
  // The forms are shown only when isDoctor && user toggles them.

  // 4A) Current Meds
  const [showAddCurrentForm, setShowAddCurrentForm] = useState(false);

  // We'll keep separate states for each field
  const [newCurrentName, setNewCurrentName] = useState("");
  const [newCurrentDosage, setNewCurrentDosage] = useState("");
  const [newCurrentStartDate, setNewCurrentStartDate] = useState("");
  const [newCurrentTarget, setNewCurrentTarget] = useState("");
  const [newCurrentDosagePerDay, setNewCurrentDosagePerDay] = useState("");
  const [newCurrentInstructions, setNewCurrentInstructions] = useState("");
  const [newCurrentDoctor, setNewCurrentDoctor] = useState("");

  const handleAddCurrentMedication = () => {
    // Create a new "current medication" object
    const newMed = {
      id: Date.now(), // unique-ish ID
      name: newCurrentName.trim(),
      dosage: newCurrentDosage.trim(),
      startDate: newCurrentStartDate,
      target: newCurrentTarget.trim(),
      dosagePerDay: newCurrentDosagePerDay.trim(),
      instructions: newCurrentInstructions.trim(),
      doctor: newCurrentDoctor.trim(),
    };

    // Update state
    setCurrentMedications([...currentMedications, newMed]);

    // Reset form fields
    setNewCurrentName("");
    setNewCurrentDosage("");
    setNewCurrentStartDate("");
    setNewCurrentTarget("");
    setNewCurrentDosagePerDay("");
    setNewCurrentInstructions("");
    setNewCurrentDoctor("");

    // Hide form
    setShowAddCurrentForm(false);
  };

  // 4B) Past Meds
  const [showAddPastForm, setShowAddPastForm] = useState(false);

  // We'll keep separate states for each field
  const [newPastName, setNewPastName] = useState("");
  const [newPastStartDate, setNewPastStartDate] = useState("");
  const [newPastEndDate, setNewPastEndDate] = useState("");
  const [newPastDoctor, setNewPastDoctor] = useState("");
  const [newPastCondition, setNewPastCondition] = useState("");
  const [newPastDosage, setNewPastDosage] = useState("");

  const handleAddPastMedication = () => {
    // Create a new "past medication" object
    const newMed = {
      id: Date.now(),
      name: newPastName.trim(),
      startDate: newPastStartDate,
      endDate: newPastEndDate,
      doctor: newPastDoctor.trim(),
      condition: newPastCondition.trim(),
      // For simplicity, we’ll store the single dosage in an array:
      details: [{ dosage: newPastDosage.trim(), date: newPastEndDate }],
    };

    // Update state
    setPastMedications([...pastMedications, newMed]);

    // Reset form fields
    setNewPastName("");
    setNewPastStartDate("");
    setNewPastEndDate("");
    setNewPastDoctor("");
    setNewPastCondition("");
    setNewPastDosage("");

    // Hide form
    setShowAddPastForm(false);
  };

  return (
    <div className="medications-page">
      <LeftNavBar />

      <div className="medications-content">
        <div className="medications-header">
          <h2>Medications</h2>

          {/* Search bar */}
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

        {/* -----------------------------------
            Current Medications
        ----------------------------------- */}
        <div className="section">
          <div class="sub-header">
            <h3>Current Medications</h3>

            {/* "Add" button & form for current meds (only visible to doctors) */}
            {isDoctor && !showAddCurrentForm && (
              <button onClick={() => setShowAddCurrentForm(true)} class="add">
                Add New
              </button>
            )}
          </div>
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

          {isDoctor && showAddCurrentForm && (
            <div className="add-form">
              <h4>Add Current Medication</h4>

              <label>
                Name:
                <input
                  type="text"
                  value={newCurrentName}
                  onChange={(e) => setNewCurrentName(e.target.value)}
                />
              </label>

              <label>
                Dosage:
                <input
                  type="text"
                  value={newCurrentDosage}
                  onChange={(e) => setNewCurrentDosage(e.target.value)}
                />
              </label>

              <label>
                Start Date:
                <input
                  type="date"
                  value={newCurrentStartDate}
                  onChange={(e) => setNewCurrentStartDate(e.target.value)}
                />
              </label>

              <label>
                Target:
                <input
                  type="text"
                  value={newCurrentTarget}
                  onChange={(e) => setNewCurrentTarget(e.target.value)}
                />
              </label>

              <label>
                Dosage per day:
                <input
                  type="text"
                  value={newCurrentDosagePerDay}
                  onChange={(e) => setNewCurrentDosagePerDay(e.target.value)}
                />
              </label>

              <label>
                Instructions:
                <input
                  type="text"
                  value={newCurrentInstructions}
                  onChange={(e) => setNewCurrentInstructions(e.target.value)}
                />
              </label>

              <label>
                Doctor:
                <input
                  type="text"
                  value={newCurrentDoctor}
                  onChange={(e) => setNewCurrentDoctor(e.target.value)}
                />
              </label>

              <div className="form-buttons">
                <button onClick={handleAddCurrentMedication}>Save</button>
                <button onClick={() => setShowAddCurrentForm(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* -----------------------------------
            Past Medications
        ----------------------------------- */}
        <div className="section">
          <div class="sub-header">
            <h3>Past Medications</h3>

            {/* "Add" button & form for past meds (only visible to doctors) */}
            {isDoctor && !showAddPastForm && (
              <button onClick={() => setShowAddPastForm(true)} class="add">
                Add New
              </button>
            )}
          </div>
          <ul className="medications-list">
            {filteredPastMedications.length > 0 ? (
              filteredPastMedications.map((med) => (
                <li key={med.id} className="medication-item">
                  <div
                    className="medication-header"
                    onClick={() => toggleExpand(med.id)}
                  >
                    <h4>{med.name}</h4>
                    <span>
                      {expandedMedications[med.id] ? "▼" : "▶"}
                    </span>
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
                        <strong>Dosage Dates:</strong>{" "}
                        {med.details
                          .map((detail) => `${detail.dosage} on ${detail.date}`)
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No past medications found.</p>
            )}
          </ul>

          {isDoctor && showAddPastForm && (
            <div className="add-form">
              <h4>Add Past Medication</h4>

              <label>
                Name:
                <input
                  type="text"
                  value={newPastName}
                  onChange={(e) => setNewPastName(e.target.value)}
                />
              </label>

              <label>
                Start Date:
                <input
                  type="date"
                  value={newPastStartDate}
                  onChange={(e) => setNewPastStartDate(e.target.value)}
                />
              </label>

              <label>
                End Date:
                <input
                  type="date"
                  value={newPastEndDate}
                  onChange={(e) => setNewPastEndDate(e.target.value)}
                />
              </label>

              <label>
                Doctor:
                <input
                  type="text"
                  value={newPastDoctor}
                  onChange={(e) => setNewPastDoctor(e.target.value)}
                />
              </label>

              <label>
                Condition Treated:
                <input
                  type="text"
                  value={newPastCondition}
                  onChange={(e) => setNewPastCondition(e.target.value)}
                />
              </label>

              <label>
                Dosage (final or sample):
                <input
                  type="text"
                  value={newPastDosage}
                  onChange={(e) => setNewPastDosage(e.target.value)}
                />
              </label>

              <div className="form-buttons">
                <button onClick={handleAddPastMedication}>Save</button>
                <button onClick={() => setShowAddPastForm(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medications;
