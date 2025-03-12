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
        <div className={`records-grid ${activeSection ? 'single-row' : 'double-grid'}`}>
          {/* Visit Summaries */}
          <div className="record-card" onClick={() => toggleSection("visitSummaries")}>
            <AssignmentIcon className="icon" />
            <h3>Visit Summaries</h3>
            {!activeSection && (
              <p className="latest-item">
                Latest Visit: Consultation - 01 Feb 2025
              </p>
            )}
          </div>

          {/* Doctors List */}
          <div className="record-card" onClick={() => toggleSection("doctors")}>
            <PersonIcon className="icon" />
            <h3>Doctors List</h3>
            {!activeSection && (
              <p className="latest-item">
                Latest Doctor: Dr. John Doe - Cardiologist
              </p>
            )}
          </div>

          {/* Lab Results */}
          <div className="record-card" onClick={() => toggleSection("labResults")}>
            <ScienceIcon className="icon" />
            <h3>Lab Results</h3>
            {!activeSection && (
              <p className="latest-item">
                Latest Result: Blood Test - 10 Feb 2025
              </p>
            )}
          </div>

          {/* Report Images */}
          <div className="record-card" onClick={() => toggleSection("reportImages")}>
            <ImageIcon className="icon" />
            <h3>Report Images</h3>
            {!activeSection && (
              <p className="latest-item">
                Latest Report: Report - 01 Mar 2025
              </p>
            )}
          </div>
        </div>

        {/* Visit Summaries List */}
        {activeSection === "visitSummaries" && (
          <div className="list-container">
            <h2>Visit Summaries</h2>
            <div className="list-item" onClick={() => openDetailsPopup("consultation")}>
              Consultation - 01 Feb 2025
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("followup")}>
              Follow-up - 15 Jan 2025
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("emergency")}>
              Emergency Visit - 05 Dec 2024
            </div>
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
            <div className="list-item" onClick={() => openDetailsPopup("bloodTest")}>
              Blood Test - 10 Feb 2025
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("ctScan")}>
              CT Scan - 20 Jan 2025
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("urineTest")}>
              Urine Test - 05 Jan 2025
            </div>
          </div>
        )}

        {/* Report Images List */}
        {activeSection === "reportImages" && (
          <div className="list-container">
            <h2>Report Images</h2>
            <div className="list-item" onClick={() => openDetailsPopup("report1")}>
              Report - 01 Mar 2025
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("report2")}>
              Report - 15 Feb 2025
            </div>
            <div className="list-item" onClick={() => openDetailsPopup("report3")}>
              Report - 05 Feb 2025
            </div>
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
