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

  const handleAddVaccine = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/vaccines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...newVaccine,
          adminDate: new Date(newVaccine.adminDate) // Convert to Date object
        }),
      });

      if (res.ok) {
        const savedVaccine = await res.json();
        setVaccinationData([...vaccinationData, savedVaccine]);
        setNewVaccine({
          vaccineName: "",
          recommendedAge_doseNumber: "",
          adminDate: "",
          doctorName: "",
        });
        setShowForm(false);
      } else {
        console.error("Failed to save vaccine");
      }
    } catch (err) {
      console.error("Error adding vaccine:", err);
    }
  };

  return (
    <div className="vaccination-container">
      <LeftNavBar />
      <div className="content">
        <span className="title">Vaccination Record</span>

        {isDoctor && (
          <>
            <button className="add-vaccine-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Add Vaccine"}
            </button>

            {showForm && (
              <div className="vaccine-form">
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
                <button onClick={handleAddVaccine}>Submit</button>
              </div>
            )}
          </>
        )}

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
      </div>
    </div>
  );
}

export default VaccinationPage;
