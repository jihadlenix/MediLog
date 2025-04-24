import React, { useState, useEffect } from "react";
import "./VaccinationRecord.css";
import LeftNavBar from "../components/LeftNavBar";

function VaccinationPage() {
  const [vaccinationData, setVaccinationData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newVaccine, setNewVaccine] = useState({
    vaccineName: "",
    recommendedAge_doseNumber: "",
    adminDate: "",
    doctorName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const token = localStorage.getItem("token");
  const isDoctor = localStorage.getItem("isDoctor") === "true";

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/vaccines/my`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          const data = await res.json();
          setVaccinationData(data);
        } else {
          console.error("Failed to fetch vaccine data");
        }
      } catch (err) {
        console.error("Error fetching vaccines:", err);
      }
    };

    fetchVaccines();
  }, [BASE_URL, token]);

  const formatDateToMMDDYYYY = (isoDateString) => {
    const date = new Date(isoDateString);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleEditClick = (vaccine, index) => {
    setNewVaccine({
      vaccineName: vaccine.vaccineName,
      recommendedAge_doseNumber: vaccine.recommendedAge_doseNumber,
      adminDate: vaccine.adminDate,
      doctorName: vaccine.doctorName,
    });
    setIsEditing(true);
    setShowForm(true);
    setEditingIndex(index);
  };

  const handleSaveVaccine = async () => {
    const url = isEditing
      ? `${BASE_URL}/api/vaccines/${vaccinationData[editingIndex].id}`
      : `${BASE_URL}/api/vaccines`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newVaccine,
          adminDate: new Date(newVaccine.adminDate),
        }),
      });

      if (res.ok) {
        const updatedVaccine = await res.json();

        if (isEditing) {
          const updatedList = [...vaccinationData];
          updatedList[editingIndex] = updatedVaccine;
          setVaccinationData(updatedList);
        } else {
          setVaccinationData([...vaccinationData, updatedVaccine]);
        }

        // Reset form
        setNewVaccine({
          vaccineName: "",
          recommendedAge_doseNumber: "",
          adminDate: "",
          doctorName: "",
        });
        setShowForm(false);
        setIsEditing(false);
        setEditingIndex(null);
      } else {
        console.error("Failed to save vaccine");
      }
    } catch (err) {
      console.error("Error saving vaccine:", err);
    }
  };

  const handleCancelEdit = () => {
    setNewVaccine({
      vaccineName: "",
      recommendedAge_doseNumber: "",
      adminDate: "",
      doctorName: "",
    });
    setShowForm(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  return (
    <div className="vaccination-container">
      <LeftNavBar />
      <div className="content">
        <span className="vaccine-title">Vaccination Record</span>

        
        {!vaccinationData || vaccinationData.length === 0 ? (
          <p>No vaccination records available.</p>
        ) : (
          <table className="vaccination-table">
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Recommended Age / Dose Number</th>
                <th>Date Given</th>
                <th>Doctor's Name</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationData.map((vaccine, index) => (
                <tr key={index}>
                  <td>{vaccine.vaccineName}</td>
                  <td>{vaccine.recommendedAge_doseNumber}</td>
                  <td>{formatDateToMMDDYYYY(vaccine.adminDate)}</td>
                  <td>{vaccine.doctorName}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}

{isDoctor && (
          <>          
            {showForm && (
              <div className="edit-form">
                <div className="vaccine-inputs">
                  <input
                    type="text"
                    name="vaccineName"
                    placeholder="Vaccine Name"
                    value={newVaccine.vaccineName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="recommendedAge_doseNumber"
                    placeholder="Recommended Age / Dose Number"
                    value={newVaccine.recommendedAge_doseNumber}
                    onChange={handleInputChange}
                  />
                  <input
                    type="date"
                    name="adminDate"
                    placeholder="Administration Date"
                    value={newVaccine.adminDate}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="doctorName"
                    placeholder="Doctor Name"
                    value={newVaccine.doctorName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button onClick={handleSaveVaccine}>
                    {isEditing ? "Update" : "Submit"}
                  </button>
                  {isEditing && (
                    <button className="cancel-edit-btn" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}


        {isDoctor && (
  <button
    className="add-vaccine-btn"
    onClick={() => {
      setShowForm(!showForm);
      if (isEditing) handleCancelEdit();
    }}
  >
    {showForm ? "Cancel" : "Add Vaccine"}
  </button>
)}



      </div>
    </div>
  );
}

export default VaccinationPage;
