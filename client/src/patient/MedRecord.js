import React, { useEffect, useState } from "react";
import "./MedicalRecords.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import CloseIcon from "@mui/icons-material/Close";
import LeftNavBar from "../components/LeftNavBar";

const MedicalRecords = ({ isDoctor = true }) => {
  const [visitSummaries, setVisitSummaries] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [reportImages, setReportImages] = useState([
    { id: "report1", label: "Report - 01 Mar 2025" },
    { id: "report2", label: "Report - 15 Feb 2025" },
    { id: "report3", label: "Report - 05 Feb 2025" },
  ]);

  const [activeSection, setActiveSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [newReportLabel, setNewReportLabel] = useState("");

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const openDetailsPopup = (itemId) => setSelectedItem(itemId);
  const closePopup = () => setSelectedItem(null);

  const handleAddReport = () => {
    const newReport = { id: `report_${Date.now()}`, label: newReportLabel.trim() };
    setReportImages([...reportImages, newReport]);
    setNewReportLabel("");
    setShowAddReportForm(false);
  };

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
    const token = localStorage.getItem("token");

    const fetchVisitSummaries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/visit_summaries/my`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Fetched Visit Summaries:", data);
          const formatted = data.map((item) => ({
            id: item.id || item._id,
            label: `${item.visitType} - ${new Date(item.visitDate).toLocaleDateString()}`,
          }));
          setVisitSummaries(formatted);
          
        }
      } catch (err) {
        console.error("Error fetching visit summaries:", err);
      }
    };

    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/doctors`);
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched Doctors:", data);
          const formatted = data.map((doc) => ({
            id: doc.id || doc._id,
            label: `${doc.fullName || doc.name} - ${doc.specialty}`,
          }));
          setDoctors(formatted);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    const fetchLabResults = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/lab_results/my`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched Lab Results:", data);
          const formatted = data.map((item) => ({
            id: item.id || item._id,
            label: `${item.testName} - ${new Date(item.testDate).toLocaleDateString()}`,
          }));
          setLabResults(formatted);
        }
      } catch (err) {
        console.error("Error fetching lab results:", err);
      }
    };

    fetchVisitSummaries();
    fetchDoctors();
    fetchLabResults();
  }, []);

  return (
    <div className="medrec-container">
      <div className="medrec-navbar">
        <LeftNavBar />
      </div>
      <div className="medrec-content">
        <span className="medrec-title">Medical Records</span>

        <div className={`medrec-grid ${activeSection ? "medrec-single" : "medrec-double"}`}>
          <div className="medrec-card" onClick={() => toggleSection("visitSummaries")}> <AssignmentIcon className="medrec-icon" /> <h2>Visit Summaries</h2> {!activeSection && <p className="medrec-latest">{visitSummaries[0]?.label || "No visits yet"}</p>} </div>
          <div className="medrec-card" onClick={() => toggleSection("doctors")}> <PersonIcon className="medrec-icon" /> <h2>Doctors List</h2> {!activeSection && <p className="medrec-latest">{doctors[0]?.label || "No doctors yet"}</p>} </div>
          <div className="medrec-card" onClick={() => toggleSection("labResults")}> <ScienceIcon className="medrec-icon" /> <h2>Lab Results</h2> {!activeSection && <p className="medrec-latest">{labResults[0]?.label || "No lab results yet"}</p>} </div>
          <div className="medrec-card" onClick={() => toggleSection("reportImages")}> <AssignmentIcon className="medrec-icon" /> <h2>Report Images</h2> {!activeSection && <p className="medrec-latest">{reportImages[0]?.label || "No reports yet"}</p>} </div>
        </div>

        {activeSection === "visitSummaries" && (
          <div className="medrec-list">
            <h2>Visit Summaries</h2>
            {visitSummaries.map((item) => (
              <div key={item.id} className="medrec-item" onClick={() => openDetailsPopup(item.id)}>{item.label}</div>
            ))}
          </div>
        )}

        {activeSection === "doctors" && (
          <div className="medrec-list">
            <h2>Doctors List</h2>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="medrec-item" onClick={() => openDetailsPopup(doctor.id)}>{doctor.label}</div>
            ))}
          </div>
        )}

        {activeSection === "labResults" && (
          <div className="medrec-list">
            <h2>Lab Results</h2>
            {labResults.map((lab) => (
              <div key={lab.id} className="medrec-item" onClick={() => openDetailsPopup(lab.id)}>{lab.label}</div>
            ))}
          </div>
        )}

        {activeSection === "reportImages" && (
          <div className="medrec-list">
            <h2>Report Images</h2>
            {reportImages.map((report) => (
              <div key={report.id} className="medrec-item" onClick={() => openDetailsPopup(report.id)}>{report.label}</div>
            ))}
            {isDoctor && !showAddReportForm && (<button onClick={() => setShowAddReportForm(true)} className="medrec-btn">Upload New</button>)}
            {isDoctor && showAddReportForm && (
              <div className="medrec-form">
                <h3>Upload New Report Image</h3>
                <label>Report Label:<input type="text" value={newReportLabel} onChange={(e) => setNewReportLabel(e.target.value)} /></label>
                <button onClick={handleAddReport}>Save</button>
                <button onClick={() => setShowAddReportForm(false)}>Cancel</button>
              </div>
            )}
          </div>
        )}

        {selectedItem && (
          <div className="medrec-popup-overlay">
            <div className="medrec-popup-card">
              <button className="medrec-close-btn" onClick={closePopup}><CloseIcon /></button>
              <h2>Details</h2>
              <p>ID: {selectedItem}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
