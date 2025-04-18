import React, { useEffect, useState } from "react";
import "./MedicalRecords.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import CloseIcon from "@mui/icons-material/Close";
import LeftNavBar from "../components/LeftNavBar";

const MedicalRecords = ({ isDoctor = localStorage.getItem("isDoctor") }) => {
  const [visitSummaries, setVisitSummaries] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [reportImages, setReportImages] = useState([]);

  const [activeSection, setActiveSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [newReportLabel, setNewReportLabel] = useState("");
  const [showAddForm, setShowAddForm] = useState(null);
  const [newItemLabel, setNewItemLabel] = useState("");

  // Visit summary form fields
  const [visitType, setVisitType] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitDoctor, setVisitDoctor] = useState("");
  const [description, setDescription] = useState(""); // Changed to 'description'
  const [diagnosis, setDiagnosis] = useState(""); // Changed to 'diagnosis'
  const [testsRequired, setTestsRequired] = useState(""); // Changed to 'testsRequired'

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

  const handleAddVisitSummary = async () => {
    if (!visitType || !visitDate || !visitDoctor) return;

    const formattedLabel = `${visitType} with ${visitDoctor} - ${new Date(visitDate).toLocaleDateString()}`;
    const newSummary = {
      visitType,
      visitDate,
      doctorName: visitDoctor,  // Change to 'doctorName'
      description,  // Change to 'description'
      diagnosis,  // Change to 'diagnosis'
      testsRequired: testsRequired.split(",").map((t) => t.trim()),  // Change to 'testsRequired'
    };

    const token = localStorage.getItem("token");
    const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

    try {
      const res = await fetch(`${BASE_URL}/api/visit_summaries`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSummary),
      });
      console.log("Visit Summary Data:", {
        visitType,
        visitDate,
        visitDoctor,
        description,
        diagnosis,
        testsRequired,
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Added Visit Summary:", data);
        setVisitSummaries([
          ...visitSummaries,
          { id: data.id, label: formattedLabel },
        ]);

        // Reset the form
        setVisitType("");
        setVisitDate("");
        setVisitDoctor("");
        setDescription("");
        setDiagnosis("");
        setTestsRequired("");
        setShowAddForm(null);
      } else {
        console.error("Error adding visit summary:", await res.json());
      }
    } catch (err) {
      console.error("Error adding visit summary:", err);
    }
  };

  const handleAddItem = (section) => {
    const newItem = { id: `${section}_${Date.now()}`, label: newItemLabel.trim() };
    if (!newItem.label) return;

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
          console.log("Visit Summaries:", data);
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
                <h3>Add Visit Summary</h3>
                <label>Visit Type:
                  <input type="text" value={visitType} onChange={(e) => setVisitType(e.target.value)} />
                </label>
                <label>Visit Date:
                  <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
                </label>
                <label>Doctor Name:
                  <input type="text" value={visitDoctor} onChange={(e) => setVisitDoctor(e.target.value)} />
                </label>
                <label>Description:
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>Diagnosis:
                  <textarea value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
                </label>
                <label>Tests Required (comma-separated):
                  <input type="text" value={testsRequired} onChange={(e) => setTestsRequired(e.target.value)} />
                </label>
                <button onClick={handleAddVisitSummary}>Add Visit Summary</button>
                <button onClick={() => setShowAddForm(null)}><CloseIcon /></button>
              </div>
            )}
          </div>
        )}

        {activeSection === "doctors" && (
          <div className="medrec-list">
            <h2>Doctors List</h2>
            {doctors.map((item) => (
              <div key={item.id} className="medrec-item">{item.label}</div>
            ))}
            {isDoctor && !showAddForm && (
              <button onClick={() => setShowAddForm("doctors")} className="medrec-btn">Add Doctor</button>
            )}
            {isDoctor && showAddForm === "doctors" && (
              <div className="medrec-form">
                <h3>Add Doctor</h3>
                <label>Doctor Name:
                  <input type="text" value={newItemLabel} onChange={(e) => setNewItemLabel(e.target.value)} />
                </label>
                <button onClick={() => handleAddItem("doctors")}>Add Doctor</button>
                <button onClick={() => setShowAddForm(null)}><CloseIcon /></button>
              </div>
            )}
          </div>
        )}

        {activeSection === "labResults" && (
          <div className="medrec-list">
            <h2>Lab Results</h2>
            {labResults.map((item) => (
              <div key={item.id} className="medrec-item">{item.label}</div>
            ))}
            {isDoctor && !showAddForm && (
              <button onClick={() => setShowAddForm("labResults")} className="medrec-btn">Add Lab Result</button>
            )}
            {isDoctor && showAddForm === "labResults" && (
              <div className="medrec-form">
                <h3>Add Lab Result</h3>
                <label>Test Name:
                  <input type="text" value={newItemLabel} onChange={(e) => setNewItemLabel(e.target.value)} />
                </label>
                <button onClick={() => handleAddItem("labResults")}>Add Lab Result</button>
                <button onClick={() => setShowAddForm(null)}><CloseIcon /></button>
              </div>
            )}
          </div>
        )}

        {activeSection === "reportImages" && (
          <div className="medrec-list">
            <h2>Report Images</h2>
            {reportImages.map((item) => (
              <div key={item.id} className="medrec-item">{item.label}</div>
            ))}
            {isDoctor && !showAddReportForm && (
              <button onClick={() => setShowAddReportForm(true)} className="medrec-btn">Add Report</button>
            )}
            {isDoctor && showAddReportForm && (
              <div className="medrec-form">
                <h3>Add Report Image</h3>
                <label>Report Label:
                  <input
                    type="text"
                    value={newReportLabel}
                    onChange={(e) => setNewReportLabel(e.target.value)}
                  />
                </label>
                <button onClick={handleAddReport}>Add Report</button>
                <button onClick={() => setShowAddReportForm(false)}><CloseIcon /></button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
