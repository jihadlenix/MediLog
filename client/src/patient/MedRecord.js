import React, { useEffect, useState } from "react";
import "./MedicalRecords.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import CloseIcon from "@mui/icons-material/Close";
import LeftNavBar from "../components/LeftNavBar";

const MedicalRecords = ({ isDoctor = true }) => {
  const [visitSummaries, setVisitSummaries] = useState([
    { id: "visit1", label: "General Checkup - 10 Apr 2025" },
    { id: "visit2", label: "Cardiology Follow-up - 02 Mar 2025" },
  ]);
  const [doctors, setDoctors] = useState([
    { id: "doc1", label: "Dr. Sarah Lee - Neurologist" },
    { id: "doc2", label: "Dr. Robert Smith - Orthopedic" },
  ]);
  const [labResults, setLabResults] = useState([
    { id: "lab1", label: "Blood Test - 15 Mar 2025" },
    { id: "lab2", label: "MRI Scan - 28 Feb 2025" },
  ]);
  const [reportImages, setReportImages] = useState([
    { id: "report1", label: "Report - 01 Mar 2025" },
    { id: "report2", label: "Report - 15 Feb 2025" },
    { id: "report3", label: "Report - 05 Feb 2025" },
  ]);

  const [activeSection, setActiveSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [newReportLabel, setNewReportLabel] = useState("");
  const [showAddForm, setShowAddForm] = useState(null);
  const [newItemLabel, setNewItemLabel] = useState("");

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const openDetailsPopup = (itemId) => setSelectedItem(itemId);
  const closePopup = () => setSelectedItem(null);

  const handleAddReport = () => {
    const newReport = { id: `report_${Date.now()}`, label: newReportLabel.trim() };
    if (!newReport.label) return;
    setReportImages([...reportImages, newReport]);
    setNewReportLabel("");
    setShowAddReportForm(false);
  };

  const handleAddItem = (section) => {
    const newItem = { id: `${section}_${Date.now()}`, label: newItemLabel.trim() };
    if (!newItem.label) return;

    if (section === "visitSummaries") setVisitSummaries([...visitSummaries, newItem]);
    if (section === "doctors") setDoctors([...doctors, newItem]);
    if (section === "labResults") setLabResults([...labResults, newItem]);

    setNewItemLabel("");
    setShowAddForm(null);
  };

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
    const token = localStorage.getItem("token");

    const fetchVisitSummaries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/visit_summaries/my`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
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
        const res = await fetch(`${BASE_URL}/api/lab_results/my`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
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
          <div className="medrec-card" onClick={() => toggleSection("visitSummaries")}>
            <AssignmentIcon className="medrec-icon" />
            <h2>Visit Summaries</h2>
            {!activeSection && <p className="medrec-latest">{visitSummaries[0]?.label || "No visits yet"}</p>}
          </div>
          <div className="medrec-card" onClick={() => toggleSection("doctors")}>
            <PersonIcon className="medrec-icon" />
            <h2>Doctors List</h2>
            {!activeSection && <p className="medrec-latest">{doctors[0]?.label || "No doctors yet"}</p>}
          </div>
          <div className="medrec-card" onClick={() => toggleSection("labResults")}>
            <ScienceIcon className="medrec-icon" />
            <h2>Lab Results</h2>
            {!activeSection && <p className="medrec-latest">{labResults[0]?.label || "No lab results yet"}</p>}
          </div>
          <div className="medrec-card" onClick={() => toggleSection("reportImages")}>
            <AssignmentIcon className="medrec-icon" />
            <h2>Report Images</h2>
            {!activeSection && <p className="medrec-latest">{reportImages[0]?.label || "No reports yet"}</p>}
          </div>
        </div>

        {activeSection === "visitSummaries" && (
          <div className="medrec-list">
            <h2>Visit Summaries</h2>
            {visitSummaries.map((item) => (
              <div key={item.id} className="medrec-item" onClick={() => openDetailsPopup(item.id)}>{item.label}</div>
            ))}
            {isDoctor && !showAddForm && (
              <button onClick={() => setShowAddForm("visitSummaries")} className="medrec-btn">Add Visit</button>
            )}
            {isDoctor && showAddForm === "visitSummaries" && (
              <div className="medrec-form">
                <label>Visit Label:
                  <input type="text" value={newItemLabel} onChange={(e) => setNewItemLabel(e.target.value)} />
                </label>
                <button onClick={() => handleAddItem("visitSummaries")}>Save</button>
                <button onClick={() => setShowAddForm(null)}>Cancel</button>
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
            {isDoctor && !showAddForm && (
              <button onClick={() => setShowAddForm("doctors")} className="medrec-btn">Add Doctor</button>
            )}
            {isDoctor && showAddForm === "doctors" && (
              <div className="medrec-form">
                <label>Doctor Label:
                  <input type="text" value={newItemLabel} onChange={(e) => setNewItemLabel(e.target.value)} />
                </label>
                <button onClick={() => handleAddItem("doctors")}>Save</button>
                <button onClick={() => setShowAddForm(null)}>Cancel</button>
              </div>
            )}
          </div>
        )}

        {activeSection === "labResults" && (
          <div className="medrec-list">
            <h2>Lab Results</h2>
            {labResults.map((lab) => (
              <div key={lab.id} className="medrec-item" onClick={() => openDetailsPopup(lab.id)}>{lab.label}</div>
            ))}
            {isDoctor && !showAddForm && (
              <button onClick={() => setShowAddForm("labResults")} className="medrec-btn">Add Lab Result</button>
            )}
            {isDoctor && showAddForm === "labResults" && (
              <div className="medrec-form">
                <label>Lab Result Label:
                  <input type="text" value={newItemLabel} onChange={(e) => setNewItemLabel(e.target.value)} />
                </label>
                <button onClick={() => handleAddItem("labResults")}>Save</button>
                <button onClick={() => setShowAddForm(null)}>Cancel</button>
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
            {isDoctor && !showAddReportForm && (
              <button onClick={() => setShowAddReportForm(true)} className="medrec-btn">Upload New</button>
            )}
            {isDoctor && showAddReportForm && (
              <div className="medrec-form">
                <h3>Upload New Report Image</h3>
                <label>Report Label:
                  <input type="text" value={newReportLabel} onChange={(e) => setNewReportLabel(e.target.value)} />
                </label>
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
