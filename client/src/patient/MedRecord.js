import React, { useState } from "react";
import "./MedicalRecords.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import LeftNavBar from "../components/LeftNavBar";

const MedicalRecords = ({ isDoctor = true }) => {
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

  const [activeSection, setActiveSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const openDetailsPopup = (itemId) => {
    setSelectedItem(itemId);
  };
  const closePopup = () => {
    setSelectedItem(null);
  };

  const [showAddVisitForm, setShowAddVisitForm] = useState(false);
  const [newVisitLabel, setNewVisitLabel] = useState("");

  const [showAddLabForm, setShowAddLabForm] = useState(false);
  const [newLabLabel, setNewLabLabel] = useState("");

  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [newReportLabel, setNewReportLabel] = useState("");

  const handleAddVisit = () => {
    const newVisit = { id: `visit_${Date.now()}`, label: newVisitLabel.trim() };
    setVisitSummaries([...visitSummaries, newVisit]);
    setNewVisitLabel("");
    setShowAddVisitForm(false);
  };

  const handleAddLab = () => {
    const newLab = { id: `lab_${Date.now()}`, label: newLabLabel.trim() };
    setLabResults([...labResults, newLab]);
    setNewLabLabel("");
    setShowAddLabForm(false);
  };

  const handleAddReport = () => {
    const newReport = { id: `report_${Date.now()}`, label: newReportLabel.trim() };
    setReportImages([...reportImages, newReport]);
    setNewReportLabel("");
    setShowAddReportForm(false);
  };

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
          <div className="medrec-card" onClick={() => toggleSection("reportImages")}> <ImageIcon className="medrec-icon" /> <h2>Report Images</h2> {!activeSection && <p className="medrec-latest">{reportImages[0]?.label || "No reports yet"}</p>} </div>
        </div>

        {activeSection === "visitSummaries" && (
          <div className="medrec-list">
            <h2>Visit Summaries</h2>
            {visitSummaries.map((item) => (
              <div key={item.id} className="medrec-item" onClick={() => openDetailsPopup(item.id)}>{item.label}</div>
            ))}
            {isDoctor && !showAddVisitForm && (<button onClick={() => setShowAddVisitForm(true)} className="medrec-btn">Add New</button>)}
            {isDoctor && showAddVisitForm && (
              <div className="medrec-form">
                <h3>Add New Visit Summary</h3>
                <label>Description/Label:<input type="text" value={newVisitLabel} onChange={(e) => setNewVisitLabel(e.target.value)} /></label>
                <button onClick={handleAddVisit}>Save</button>
                <button onClick={() => setShowAddVisitForm(false)}>Cancel</button>
              </div>
            )}
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
            {isDoctor && !showAddLabForm && (<button onClick={() => setShowAddLabForm(true)} className="medrec-btn">Add New</button>)}
            {isDoctor && showAddLabForm && (
              <div className="medrec-form">
                <h3>Add New Lab Result</h3>
                <label>Result Description:<input type="text" value={newLabLabel} onChange={(e) => setNewLabLabel(e.target.value)} /></label>
                <button onClick={handleAddLab}>Save</button>
                <button onClick={() => setShowAddLabForm(false)}>Cancel</button>
              </div>
            )}
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
              {/* You can extend conditions below for better dynamic support */}
              {selectedItem === "consultation" && (<p><strong>Doctor:</strong> Dr. John Doe<br /><strong>Diagnosis:</strong> Hypertension<br /><strong>Prescription:</strong> Beta-blockers</p>)}
              {selectedItem === "followup" && (<p><strong>Doctor:</strong> Dr. Sarah Smith<br /><strong>Diagnosis:</strong> Asthma<br /><strong>Prescription:</strong> Inhaler</p>)}
              {selectedItem === "emergency" && (<p><strong>Doctor:</strong> Dr. Michael Lee<br /><strong>Diagnosis:</strong> Acute pain<br /><strong>Prescription:</strong> Painkillers</p>)}
              {selectedItem === "bloodTest" && (<p><strong>Test:</strong> Blood Test<br /><strong>Date:</strong> 10 Feb 2025<br /><strong>Result:</strong> Normal</p>)}
              {selectedItem === "ctScan" && (<p><strong>Test:</strong> CT Scan<br /><strong>Date:</strong> 20 Jan 2025<br /><strong>Result:</strong> No abnormalities</p>)}
              {selectedItem === "urineTest" && (<p><strong>Test:</strong> Urine Test<br /><strong>Date:</strong> 05 Jan 2025<br /><strong>Result:</strong> No infection detected</p>)}
              {selectedItem === "doctor1" && (<p><strong>Doctor:</strong> Dr. John Doe - Cardiologist</p>)}
              {selectedItem === "doctor2" && (<p><strong>Doctor:</strong> Dr. Sarah Smith - General Physician</p>)}
              {selectedItem === "doctor3" && (<p><strong>Doctor:</strong> Dr. Michael Lee - Neurologist</p>)}
              {selectedItem.startsWith("report") && (<img src={`${selectedItem}.jpg`} alt={selectedItem} className="medrec-popup-image" />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;