import React, { useState } from "react";
import "./VaccinationRecord.css";
import LeftNavBar from "./LeftNavBar";

// Mock data for testing (vaccination records with doses)
const mockData = [
  {
    vaccineName: "Diphtheria, Tetanus, Pertussis (DTaP)",
    recommendedAge: "2 months, 3 months, 4 months, 15-18 months, 4-6 years",
    doses: [
      { doseNumber: "1st", recommendedAge: "2 months", dateGiven: "12-07-2005", doctorName: "Dr. Smith" },
      { doseNumber: "2nd", recommendedAge: "3 months", dateGiven: "12-08-2005", doctorName: "Dr. Smith" },
      { doseNumber: "3rd", recommendedAge: "4 months", dateGiven: "28-02-2006", doctorName: "Dr. Smith" },
      { doseNumber: "4th", recommendedAge: "15-18 months", dateGiven: "02-05-2006", doctorName: "Dr. Smith" },
      { doseNumber: "5th", recommendedAge: "4-6 years", dateGiven: "08-09-2009", doctorName: "Dr. Smith" },
    ],
  },
  {
    vaccineName: "Polio (Oral Polio Vaccine - OPV)",
    recommendedAge: "2 months, 3 months, 4 months, 15-18 months, 4-6 years",
    doses: [
      { doseNumber: "1st", recommendedAge: "2 months", dateGiven: "12-07-2005", doctorName: "Dr. Jones" },
      { doseNumber: "2nd", recommendedAge: "3 months", dateGiven: "12-08-2005", doctorName: "Dr. Jones" },
      { doseNumber: "3rd", recommendedAge: "4 months", dateGiven: "27-02-2006", doctorName: "Dr. Jones" },
      { doseNumber: "4th", recommendedAge: "15-18 months", dateGiven: "12-07-2006", doctorName: "Dr. Jones" },
      { doseNumber: "5th", recommendedAge: "4-6 years", dateGiven: "08-09-2009", doctorName: "Dr. Jones" },
    ],
  },
  {
    vaccineName: "Measles, Mumps, Rubella (MMR)",
    recommendedAge: "15 months, 5-6 years",
    doses: [
      { doseNumber: "1st", recommendedAge: "15 months", dateGiven: "10-04-2006", doctorName: "Dr. Brown" },
      { doseNumber: "2nd", recommendedAge: "5-6 years", dateGiven: "28-11-2012", doctorName: "Dr. Brown" },
    ],
  },
  {
    vaccineName: "Haemophilus Influenzae Type B (Hib)",
    recommendedAge: "2 months, 4 months, 6 months, 15 months",
    doses: [
      { doseNumber: "1st", recommendedAge: "2 months", dateGiven: "12-07-2005", doctorName: "" },
      { doseNumber: "2nd", recommendedAge: "4 months", dateGiven: "12-08-2005", doctorName: "" },
      { doseNumber: "3rd", recommendedAge: "6 months", dateGiven: "02-05-2006", doctorName: "" },
      { doseNumber: "4th", recommendedAge: "15 months", dateGiven: "12-07-2006", doctorName: "" },
    ],
  },
  {
    vaccineName: "Hepatitis B",
    recommendedAge: "At birth, 1 month, 4 months",
    doses: [
      { doseNumber: "1st", recommendedAge: "At birth", dateGiven: "02-05-2005", doctorName: "" },
      { doseNumber: "2nd", recommendedAge: "1 month", dateGiven: "04-06-2005", doctorName: "" },
      { doseNumber: "3rd", recommendedAge: "4 months", dateGiven: "16-09-2005", doctorName: "" },
    ],
  },
];

const VaccinationRecord = ({ data = mockData, isDoctor = true, onEdit, onAdd }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableRecord, setEditableRecord] = useState(null);

  const handleEdit = (dose) => {
    setEditMode(true);
    setEditableRecord(dose);
  };

  const handleSave = () => {
    // Placeholder for saving logic (e.g., update the state or make an API call)
    alert("Changes saved!");
    setEditMode(false);
    setEditableRecord(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableRecord(null);
  };

  return (
    <div className="vaccination-container">
      <LeftNavBar />
      <div class="content">
        <span class="title">Vaccination Record</span>

        {/* Check if there is data to display */}
        {data.length === 0 ? (
          <p>No vaccination records available.</p>
        ) : (
          <table className="vaccination-table">
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Recommended Age / Dose Number</th>
                <th>Date Given</th>
                <th>Doctor's Name</th>
                {isDoctor && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <React.Fragment key={index}>
                  {/* Main row for the vaccine */}
                  {record.doses.map((dose, doseIndex) => (
                    <tr key={doseIndex}>
                      {doseIndex === 0 && (
                        <td rowSpan={record.doses.length}>{record.vaccineName}</td>
                      )}
                      {/* Dose details */}
                      <td>
                        {dose.recommendedAge} / {dose.doseNumber}
                      </td>
                      <td>{dose.dateGiven}</td>
                      <td>{dose.doctorName || ""}</td>
                      {isDoctor && (
                        <td>
                          <button onClick={() => handleEdit(dose)}>Edit</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {/* Show Add button only for doctors */}
        {isDoctor && <button onClick={onAdd} className="add-button">Add New Record</button>}

        {/* Edit form for doctor */}
        {editMode && editableRecord && (
          <div className="edit-form">
            <h3>Edit Dose</h3>
            <label>
              Recommended Age / Dose Number:
              <input
                type="text"
                value={`${editableRecord.recommendedAge} / ${editableRecord.doseNumber}`}
                disabled
              />
            </label>
            <label>
              Date Given:
              <input
                type="date"
                value={editableRecord.dateGiven}
                onChange={(e) => setEditableRecord({ ...editableRecord, dateGiven: e.target.value })}
              />
            </label>
            <label>
              Doctor's Name:
              <input
                type="text"
                value={editableRecord.doctorName}
                onChange={(e) => setEditableRecord({ ...editableRecord, doctorName: e.target.value })}
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Test the VaccinationRecord component (without backend)
const VaccinationPage = () => {
  const handleEdit = (record) => {
    alert(`Editing record: ${record.vaccineName}`);
  };

  const handleAdd = () => {
    alert("Adding new vaccination record.");
  };

  return (
    <VaccinationRecord
      onEdit={handleEdit}
      onAdd={handleAdd}
    />
  );
};

export default VaccinationPage;
