import React, { useState } from "react";
import "./MedicalRecords.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import LeftNavBar from "../components/LeftNavBar";

// (Optional) You could pass `isDoctor` in from a parent component.
// For demonstration, we'll assume isDoctor = true.
const MedicalRecords = ({ isDoctor = true }) => {
  // -------------------------
  // 1) State for each section
  // -------------------------
  const [visitSummaries, setVisitSummaries] = useState([
    { id: "consultation", label: "Consultation - 01 Feb 2025" },
    { id: "followup", label: "Follow-up - 15 Jan 2025" },
    { id: "emergency", label: "Emergency Visit - 05 Dec 2024" },
  ]);

  const [doctors] = useState([
    { id: "doctor1", label: "Dr. John Doe - Cardiologist" },
    { id: "doctor2", label: "Dr. Sarah Smith - General Physician" },
    { id: "doctor3", label: "Dr. Michael Lee - Neurologist" },
  ]);

  const [labResults, setLabResults] = useState([
    { id: "bloodTest", label: "Blood Test - 10 Feb 2025" },
    { id: "ctScan", label: "CT Scan - 20 Jan 2025" },
    { id: "urineTest", label: "Urine Test - 05 Jan 2025" },
  ]);

  const [reportImages, setReportImages] = useState([
    { id: "report1", label: "Report - 01 Mar 2025" },
    { id: "report2", label: "Report - 15 Feb 2025" },
    { id: "report3", label: "Report - 05 Feb 2025" },
  ]);

  // Tracks which section is open (visitSummaries, doctors, labResults, reportImages)
  const [activeSection, setActiveSection] = useState(null);

  // Tracks which item is selected for the popup (e.g. 'consultation', 'doctor1', etc.)
  const [selectedItem, setSelectedItem] = useState(null);

  // -------------------------
  // 2) Toggle section logic
  // -------------------------
  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // -------------------------
  // 3) Popup logic
  // -------------------------
  const openDetailsPopup = (itemId) => {
    setSelectedItem(itemId);
  };
  const closePopup = () => {
    setSelectedItem(null);
  };

  // -------------------------
  // 4) "Add new" forms
  // -------------------------
  // We'll have a small "Add" form for each of the four sections.
  // showAdd_X_Form toggles visibility; newX stores user input.

  const [showAddVisitForm, setShowAddVisitForm] = useState(false);
  const [newVisitLabel, setNewVisitLabel] = useState("");

  const [showAddLabForm, setShowAddLabForm] = useState(false);
  const [newLabLabel, setNewLabLabel] = useState("");

  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [newReportLabel, setNewReportLabel] = useState("");

  // 4a) Add Visit
  const handleAddVisit = () => {
    const newId = "visit_" + Date.now(); // unique-ish ID
    const newVisit = { id: newId, label: newVisitLabel.trim() };
    setVisitSummaries([...visitSummaries, newVisit]);
    setNewVisitLabel("");
    setShowAddVisitForm(false);
  };

  // 4c) Add Lab Result
  const handleAddLab = () => {
    const newId = "lab_" + Date.now();
    const newLab = { id: newId, label: newLabLabel.trim() };
    setLabResults([...labResults, newLab]);
    setNewLabLabel("");
    setShowAddLabForm(false);
  };

  // 4d) Add Report Image
  const handleAddReport = () => {
    const newId = "report_" + Date.now();
    const newReport = { id: newId, label: newReportLabel.trim() };
    setReportImages([...reportImages, newReport]);
    setNewReportLabel("");
    setShowAddReportForm(false);
  };

  return (
    <div className="medical-records-container">
      <LeftNavBar />

      <div className="content">
        <span className="title">Medical Records</span>

        {/* 
          By default, we show four "cards" (Visit Summaries, Doctors List, etc.).
          Clicking on each toggles the detail list for that section.
        */}
        <div className={`records-grid ${activeSection ? "single-row" : "double-grid"}`}>
          {/* Visit Summaries */}
          <div className="record-card" onClick={() => toggleSection("visitSummaries")}>
            <AssignmentIcon className="icon" />
            <h2>Visit Summaries</h2>
            {!activeSection && (
              <p class="latest-item">
                {visitSummaries[0] ? visitSummaries[0].label : "No visits yet"}
              </p>
            )}
          </div>

          {/* Doctors List */}
          <div className="record-card" onClick={() => toggleSection("doctors")}>
            <PersonIcon className="icon" />
            <h2>Doctors List</h2>
            {!activeSection && (
              <p class="latest-item">
                {doctors[0] ? doctors[0].label : "No doctors yet"}
              </p>
            )}
          </div>

          {/* Lab Results */}
          <div className="record-card" onClick={() => toggleSection("labResults")}>
            <ScienceIcon className="icon" />
            <h2>Lab Results</h2>
            {!activeSection && (
              <p class="latest-item">
                {labResults[0] ? labResults[0].label : "No lab results yet"}
              </p>
            )}
          </div>

          {/* Report Images */}
          <div className="record-card" onClick={() => toggleSection("reportImages")}>
            <ImageIcon className="icon" />
            <h2>Report Images</h2>
            {!activeSection && (
              <p class="latest-item">
                {reportImages[0] ? reportImages[0].label : "No reports yet"}
              </p>
            )}
          </div>
        </div>

        {/* -------------------------------
            Visit Summaries Section
        ------------------------------- */}
        {activeSection === "visitSummaries" && (
          <div className="list-container">
            <h2>Visit Summaries</h2>
            {visitSummaries.map((item) => (
              <div
                key={item.id}
                className="list-item"
                onClick={() => openDetailsPopup(item.id)}
              >
                {item.label}
              </div>
            ))}

            {/* If user is a doctor => Add new visit */}
            {isDoctor && !showAddVisitForm && (
              <button onClick={() => setShowAddVisitForm(true)} class="add-btn">
                Add New
              </button>
            )}

            {/* Simple form for adding a new visit */}
            {isDoctor && showAddVisitForm && (
              <div className="add-form">
                <h3>Add New Visit Summary</h3>
                <label>
                  Description/Label:
                  <input
                    type="text"
                    value={newVisitLabel}
                    onChange={(e) => setNewVisitLabel(e.target.value)}
                  />
                </label>
                <button onClick={handleAddVisit}>Save</button>
                <button onClick={() => setShowAddVisitForm(false)}>Cancel</button>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------
            Doctors Section
        ------------------------------- */}
        {activeSection === "doctors" && (
          <div className="list-container">
            <h2>Doctors List</h2>
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="list-item"
                onClick={() => openDetailsPopup(doctor.id)}
              >
                {doctor.label}
              </div>
            ))}
          </div>
        )}

        {/* -------------------------------
            Lab Results Section
        ------------------------------- */}
        {activeSection === "labResults" && (
          <div className="list-container">
            <h2>Lab Results</h2>
            {labResults.map((lab) => (
              <div
                key={lab.id}
                className="list-item"
                onClick={() => openDetailsPopup(lab.id)}
              >
                {lab.label}
              </div>
            ))}

            {/* Lab "Add" form if user is a doctor */}
            {isDoctor && !showAddLabForm && (
              <button onClick={() => setShowAddLabForm(true)} class="add-btn">
                Add New
              </button>
            )}
            {isDoctor && showAddLabForm && (
              <div className="add-form">
                <h3>Add New Lab Result</h3>
                <label>
                  Result Description:
                  <input
                    type="text"
                    value={newLabLabel}
                    onChange={(e) => setNewLabLabel(e.target.value)}
                  />
                </label>
                <button onClick={handleAddLab}>Save</button>
                <button onClick={() => setShowAddLabForm(false)}>Cancel</button>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------
            Report Images Section
        ------------------------------- */}
        {activeSection === "reportImages" && (
          <div className="list-container">
            <h2>Report Images</h2>
            {reportImages.map((report) => (
              <div
                key={report.id}
                className="list-item"
                onClick={() => openDetailsPopup(report.id)}
              >
                {report.label}
              </div>
            ))}

            {/* Report "Add" form if user is a doctor */}
            {isDoctor && !showAddReportForm && (
              <button onClick={() => setShowAddReportForm(true)} class="add-btn">
                Upload New
              </button>
            )}
            {isDoctor && showAddReportForm && (
              <div className="add-form">
                <h3>Upload New Report Image</h3>
                <label>
                  Report Label:
                  <input
                    type="text"
                    value={newReportLabel}
                    onChange={(e) => setNewReportLabel(e.target.value)}
                  />
                </label>
                <button onClick={handleAddReport}>Save</button>
                <button onClick={() => setShowAddReportForm(false)}>Cancel</button>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------
            Details Popup for any selected item
            (matches 'id' from visits/doctors/labs/reports)
        ------------------------------------------- */}
        {selectedItem && (
          <div className="popup-overlay">
            <div className="popup-card">
              <button className="close-btn" onClick={closePopup}>
                <CloseIcon />
              </button>
              <h2>Details</h2>

              {/* Hard-coded examples, like your original code: */}
              {selectedItem === "consultation" && (
                <p>
                  <strong>Doctor:</strong> Dr. John Doe<br />
                  <strong>Diagnosis:</strong> Hypertension<br />
                  <strong>Prescription:</strong> Beta-blockers
                </p>
              )}
              {selectedItem === "followup" && (
                <p>
                  <strong>Doctor:</strong> Dr. Sarah Smith<br />
                  <strong>Diagnosis:</strong> Asthma<br />
                  <strong>Prescription:</strong> Inhaler
                </p>
              )}
              {selectedItem === "emergency" && (
                <p>
                  <strong>Doctor:</strong> Dr. Michael Lee<br />
                  <strong>Diagnosis:</strong> Acute pain<br />
                  <strong>Prescription:</strong> Painkillers
                </p>
              )}
              {selectedItem === "bloodTest" && (
                <p>
                  <strong>Test:</strong> Blood Test<br />
                  <strong>Date:</strong> 10 Feb 2025<br />
                  <strong>Result:</strong> Normal
                </p>
              )}
              {selectedItem === "ctScan" && (
                <p>
                  <strong>Test:</strong> CT Scan<br />
                  <strong>Date:</strong> 20 Jan 2025<br />
                  <strong>Result:</strong> No abnormalities
                </p>
              )}
              {selectedItem === "urineTest" && (
                <p>
                  <strong>Test:</strong> Urine Test<br />
                  <strong>Date:</strong> 05 Jan 2025<br />
                  <strong>Result:</strong> No infection detected
                </p>
              )}
              {selectedItem === "report1" && (
                <img
                  src="report1.jpg"
                  alt="Report 1"
                  className="popup-image"
                />
              )}
              {selectedItem === "report2" && (
                <img
                  src="report2.jpg"
                  alt="Report 2"
                  className="popup-image"
                />
              )}
              {selectedItem === "report3" && (
                <img
                  src="report3.jpg"
                  alt="Report 3"
                  className="popup-image"
                />
              )}
              {selectedItem === "doctor1" && (
                <p><strong>Doctor:</strong> Dr. John Doe - Cardiologist</p>
              )}
              {selectedItem === "doctor2" && (
                <p><strong>Doctor:</strong> Dr. Sarah Smith - General Physician</p>
              )}
              {selectedItem === "doctor3" && (
                <p><strong>Doctor:</strong> Dr. Michael Lee - Neurologist</p>
              )}

              {/*
                If you add new items, they won't match these hard-coded conditions.
                You can either handle them similarly or store extra info in each item.
              */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
