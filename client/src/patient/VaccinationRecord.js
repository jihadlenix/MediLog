import React, { useState, useEffect } from "react";
import "./VaccinationRecord.css"; // Make sure this CSS file exists
import LeftNavBar from "../components/LeftNavBar"; // Adjust path if needed

// -------------------
// Mock Data
// -------------------
const initialData1 = [
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

function VaccinationPage() {
  const [vaccinationData, setVaccinationData] = useState(null);

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
    const token = localStorage.getItem("token");

    const fetchVaccines = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/vaccines/my`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched vaccine data:", data);
          setVaccinationData(data);
        } else {
          console.error("Failed to fetch vaccine data");
        }
      } catch (err) {
        console.error("Error fetching vaccines:", err);
      }
    };

    fetchVaccines();
  }, []);
  function formatDateToMMDDYYYY(isoDateString) {
    const date = new Date(isoDateString);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
  const handleEdit = (updatedDose) => {
    alert(`Saving changes for dose: ${updatedDose.doseNumber}`);
  };

  const handleAdd = (newRecord) => {
    setVaccinationData([...vaccinationData, newRecord]);
  };


    return (
      <div className="vaccination-container">
        <LeftNavBar />
        <div className="content">
          <span className="title">Vaccination Record</span>
  
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
                    <td>{vaccine.recommendedAgeDose}</td>
                    <td>{formatDateToMMDDYYYY(vaccine.createdAt)}</td>
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
