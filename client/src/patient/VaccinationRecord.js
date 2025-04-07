import React, { useState } from "react";
import "./VaccinationRecord.css"; // Make sure this CSS file exists
import LeftNavBar from "../components/LeftNavBar"; // Adjust path if needed

// -------------------
// Mock Data
// -------------------
const initialData = [
  {
    vaccineName: "Diphtheria, Tetanus, Pertussis (DTaP)",
    recommendedAge: "2 months, 3 months, 4 months, 15-18 months, 4-6 years",
    doses: [
      {
        doseNumber: "1st",
        recommendedAge: "2 months",
        dateGiven: "12-07-2005",
        doctorName: "Dr. Smith",
      },
      {
        doseNumber: "2nd",
        recommendedAge: "3 months",
        dateGiven: "12-08-2005",
        doctorName: "Dr. Smith",
      },
      {
        doseNumber: "3rd",
        recommendedAge: "4 months",
        dateGiven: "28-02-2006",
        doctorName: "Dr. Smith",
      },
      {
        doseNumber: "4th",
        recommendedAge: "15-18 months",
        dateGiven: "02-05-2006",
        doctorName: "Dr. Smith",
      },
      {
        doseNumber: "5th",
        recommendedAge: "4-6 years",
        dateGiven: "08-09-2009",
        doctorName: "Dr. Smith",
      },
    ],
  },
  {
    vaccineName: "Polio (Oral Polio Vaccine - OPV)",
    recommendedAge: "2 months, 3 months, 4 months, 15-18 months, 4-6 years",
    doses: [
      {
        doseNumber: "1st",
        recommendedAge: "2 months",
        dateGiven: "12-07-2005",
        doctorName: "Dr. Jones",
      },
      {
        doseNumber: "2nd",
        recommendedAge: "3 months",
        dateGiven: "12-08-2005",
        doctorName: "Dr. Jones",
      },
      {
        doseNumber: "3rd",
        recommendedAge: "4 months",
        dateGiven: "27-02-2006",
        doctorName: "Dr. Jones",
      },
      {
        doseNumber: "4th",
        recommendedAge: "15-18 months",
        dateGiven: "12-07-2006",
        doctorName: "Dr. Jones",
      },
      {
        doseNumber: "5th",
        recommendedAge: "4-6 years",
        dateGiven: "08-09-2009",
        doctorName: "Dr. Jones",
      },
    ],
  },
  {
    vaccineName: "Measles, Mumps, Rubella (MMR)",
    recommendedAge: "15 months, 5-6 years",
    doses: [
      {
        doseNumber: "1st",
        recommendedAge: "15 months",
        dateGiven: "10-04-2006",
        doctorName: "Dr. Brown",
      },
      {
        doseNumber: "2nd",
        recommendedAge: "5-6 years",
        dateGiven: "28-11-2012",
        doctorName: "Dr. Brown",
      },
    ],
  },
  {
    vaccineName: "Haemophilus Influenzae Type B (Hib)",
    recommendedAge: "2 months, 4 months, 6 months, 15 months",
    doses: [
      {
        doseNumber: "1st",
        recommendedAge: "2 months",
        dateGiven: "12-07-2005",
        doctorName: "",
      },
      {
        doseNumber: "2nd",
        recommendedAge: "4 months",
        dateGiven: "12-08-2005",
        doctorName: "",
      },
      {
        doseNumber: "3rd",
        recommendedAge: "6 months",
        dateGiven: "02-05-2006",
        doctorName: "",
      },
      {
        doseNumber: "4th",
        recommendedAge: "15 months",
        dateGiven: "12-07-2006",
        doctorName: "",
      },
    ],
  },
  {
    vaccineName: "Hepatitis B",
    recommendedAge: "At birth, 1 month, 4 months",
    doses: [
      {
        doseNumber: "1st",
        recommendedAge: "At birth",
        dateGiven: "02-05-2005",
        doctorName: "",
      },
      {
        doseNumber: "2nd",
        recommendedAge: "1 month",
        dateGiven: "04-06-2005",
        doctorName: "",
      },
      {
        doseNumber: "3rd",
        recommendedAge: "4 months",
        dateGiven: "16-09-2005",
        doctorName: "",
      },
    ],
  },
];

// -------------------
// Main "Page" Component
// -------------------
function VaccinationPage() {
  // Keep the vaccination data in React state so we can update it
  const [vaccinationData, setVaccinationData] = useState(initialData);

  // Called when user saves an edited dose
  const handleEdit = (updatedDose) => {
    // This is where you'd do a real update in state or call an API.
    // For demo, we’ll just show an alert:
    alert(`Saving changes for dose: ${updatedDose.doseNumber}`);
    // In a real app, you'd find the matching vaccine/dose in vaccinationData
    // and update the dateGiven / doctorName, then call setVaccinationData(newArray).
  };

  // Called when user adds a brand new vaccine
  const handleAdd = (newRecord) => {
    // Merge the new record into the existing array
    setVaccinationData([...vaccinationData, newRecord]);
  };

  return (
    <VaccinationRecord
      data={vaccinationData}
      isDoctor={false}
      onEdit={handleEdit}
      onAdd={handleAdd}
    />
  );
}

// -------------------
// VaccinationRecord Component
// -------------------
function VaccinationRecord({ data, isDoctor = true, onEdit, onAdd }) {
  const [editMode, setEditMode] = useState(false);
  const [editableRecord, setEditableRecord] = useState(null);

  // State for toggling the add-new form
  const [showAddForm, setShowAddForm] = useState(false);

  // State for new vaccine form fields
  const [newVaccineName, setNewVaccineName] = useState("");
  const [newVaccineRecommendedAge, setNewVaccineRecommendedAge] = useState("");
  const [newDoseNumber, setNewDoseNumber] = useState("");
  const [newDoseDateGiven, setNewDoseDateGiven] = useState("");
  const [newDoseDoctorName, setNewDoseDoctorName] = useState("");

  // -------------
  // EDIT LOGIC
  // -------------
  const handleEditClick = (dose) => {
    setEditMode(true);
    setEditableRecord({ ...dose }); // copy so we can modify
  };

  const handleSave = () => {
    // Call the parent's onEdit, passing the updated dose
    onEdit(editableRecord);
    // Reset edit mode
    setEditMode(false);
    setEditableRecord(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableRecord(null);
  };

  // -------------
  // ADD LOGIC
  // -------------
  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddCancel = () => {
    // Reset form fields and hide form
    clearNewVaccineFields();
    setShowAddForm(false);
  };

  const clearNewVaccineFields = () => {
    setNewVaccineName("");
    setNewVaccineRecommendedAge("");
    setNewDoseNumber("");
    setNewDoseDateGiven("");
    setNewDoseDoctorName("");
  };

  const handleAddSubmit = () => {
    const newRecord = {
      vaccineName: newVaccineName.trim(),
      recommendedAge: newVaccineRecommendedAge.trim(),
      doses: [
        {
          doseNumber: newDoseNumber.trim(),
          recommendedAge: newVaccineRecommendedAge.trim(),
          dateGiven: newDoseDateGiven,
          doctorName: newDoseDoctorName.trim(),
        },
      ],
    };
    // Pass this new record up to the parent
    onAdd(newRecord);

    // Reset form
    clearNewVaccineFields();
    setShowAddForm(false);
  };

  return (
    <div className="vaccination-container">
      <LeftNavBar />
      <div className="content">
        <span className="title">Vaccination Record</span>

        {/* If no data, show placeholder */}
        {(!data || data.length === 0) ? (
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
                  {record.doses.map((dose, doseIndex) => (
                    <tr key={doseIndex}>
                      {/* Vaccine Name (spanning rows for multiple doses) */}
                      {doseIndex === 0 && (
                        <td rowSpan={record.doses.length}>
                          {record.vaccineName}
                        </td>
                      )}
                      <td>
                        {dose.recommendedAge} / {dose.doseNumber}
                      </td>
                      <td>{dose.dateGiven}</td>
                      <td>{dose.doctorName}</td>
                      {isDoctor && (
                        <td>
                          <button onClick={() => handleEditClick(dose)}>
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {/* "Add New Record" button for doctors */}
        {isDoctor && !showAddForm && (
          <button onClick={handleAddClick} className="add-button">
            Add New Record
          </button>
        )}

        {/* The Add Vaccine form */}
        {isDoctor && showAddForm && (
          <div className="edit-form">
            <h3>Add New Vaccine</h3>

            <label>
              Vaccine Name:
              <input
                type="text"
                value={newVaccineName}
                onChange={(e) => setNewVaccineName(e.target.value)}
              />
            </label>
            <label>
              Recommended Age:
              <input
                type="text"
                value={newVaccineRecommendedAge}
                onChange={(e) => setNewVaccineRecommendedAge(e.target.value)}
              />
            </label>
            <label>
              Dose Number:
              <input
                type="text"
                value={newDoseNumber}
                onChange={(e) => setNewDoseNumber(e.target.value)}
              />
            </label>
            <label>
              Date Given:
              <input
                type="date"
                value={newDoseDateGiven}
                onChange={(e) => setNewDoseDateGiven(e.target.value)}
              />
            </label>
            <label>
              Doctor's Name:
              <input
                type="text"
                value={newDoseDoctorName}
                onChange={(e) => setNewDoseDoctorName(e.target.value)}
              />
            </label>

            <div className="form-buttons">
              <button onClick={handleAddSubmit}>Save</button>
              <button onClick={handleAddCancel}>Cancel</button>
            </div>
          </div>
        )}

        {/* The Edit Dose form */}
        {editMode && editableRecord && (
          <div className="edit-form">
            <h3>Edit Dose</h3>

            <label>
              Recommended Age / Dose Number:
              <input
                type="text"
                value={`${editableRecord.recommendedAge} / ${editableRecord.doseNumber}`}
                readOnly
              />
            </label>
            <label>
              Date Given:
              <input
                type="date"
                value={editableRecord.dateGiven}
                onChange={(e) =>
                  setEditableRecord({
                    ...editableRecord,
                    dateGiven: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Doctor's Name:
              <input
                type="text"
                value={editableRecord.doctorName}
                onChange={(e) =>
                  setEditableRecord({
                    ...editableRecord,
                    doctorName: e.target.value,
                  })
                }
              />
            </label>

            <div className="form-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaccinationPage;
