import React, { useState } from "react";
import "./MedicalRecords.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import LeftNavBar from "../components/LeftNavBar";

const MedicalRecords = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // New state to track the active section

  const openPopup = (section) => {
    setActivePopup(section);
  };

  const closePopup = () => {
    setActivePopup(null);
    setSelectedItem(null);
  };

  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // Hide section if it's already open
    } else {
      setActiveSection(section); // Show new section
    }
  };

  const openDetailsPopup = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="medical-records-container">
      <LeftNavBar />
      <div class="content">
        <span class="title">Medical Records</span>

        <div className={`records-grid ${activeSection ? 'single-row' : 'double-grid'}`}>
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

        {/* Visit Summaries List */}
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

        {/* Doctors List Popup */}
        {activeSection === "doctors" && (
          <div className="list-container">
            <h2>Doctors List</h2>
            <div className="list-item" onClick={() => openDetailsPopup("doctor1")}>
              Dr. John Doe - Cardiologist
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("doctor2")}>
              Dr. Sarah Smith - General Physician
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("doctor3")}>
              Dr. Michael Lee - Neurologist
            </div>
          </div>
        )}

        {/* Lab Results List */}
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

        {/* Report Images List */}
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

        {/* Details Popup for Visits, Lab Results, and Reports */}
        {selectedItem && (
          <div className="popup-overlay">
            <div className="popup-card">
              <button className="close-btn" onClick={closePopup}>
                <CloseIcon />
              </button>
              <h2>Details</h2>
              {selectedItem === "consultation" && (
                <p><strong>Doctor:</strong> Dr. John Doe<br /><strong>Diagnosis:</strong> Hypertension<br /><strong>Prescription:</strong> Beta-blockers</p>
              )}
              {selectedItem === "followup" && (
                <p><strong>Doctor:</strong> Dr. Sarah Smith<br /><strong>Diagnosis:</strong> Asthma<br /><strong>Prescription:</strong> Inhaler</p>
              )}
              {selectedItem === "emergency" && (
                <p><strong>Doctor:</strong> Dr. Michael Lee<br /><strong>Diagnosis:</strong> Acute pain<br /><strong>Prescription:</strong> Painkillers</p>
              )}
              {selectedItem === "bloodTest" && (
                <p><strong>Test:</strong> Blood Test<br /><strong>Date:</strong> 10 Feb 2025<br /><strong>Result:</strong> Normal</p>
              )}
              {selectedItem === "ctScan" && (
                <p><strong>Test:</strong> CT Scan<br /><strong>Date:</strong> 20 Jan 2025<br /><strong>Result:</strong> No abnormalities</p>
              )}
              {selectedItem === "urineTest" && (
                <p><strong>Test:</strong> Urine Test<br /><strong>Date:</strong> 05 Jan 2025<br /><strong>Result:</strong> No infection detected</p>
              )}
              {selectedItem === "report1" && (
                <img src="report1.jpg" alt="Report 1" className="popup-image" />
              )}
              {selectedItem === "report2" && (
                <img src="report2.jpg" alt="Report 2" className="popup-image" />
              )}
              {selectedItem === "report3" && (
                <img src="report3.jpg" alt="Report 3" className="popup-image" />
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
