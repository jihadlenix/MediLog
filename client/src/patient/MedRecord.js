import React, { useEffect, useState } from "react";
import "./MedicalRecords.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import CloseIcon from "@mui/icons-material/Close";
import LeftNavBar from "../components/LeftNavBar";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MedicalRecords = ({
  isDoctor = localStorage.getItem("isDoctor") === "true",
}) => {
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
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [testsRequired, setTestsRequired] = useState("");

  // Lab result file upload states
  const [labUploadedFileName, setLabUploadedFileName] = useState("");
  const [labUploadedFileBytes, setLabUploadedFileBytes] = useState(null);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
    setSelectedItem(null); // reset any selected popup
  };

  const openDetailsPopup = (item) => setSelectedItem(item);
  const closePopup = () => setSelectedItem(null);

  const handleAddReport = () => {
    const newReport = {
      id: `report_${Date.now()}`,
      label: newReportLabel.trim(),
    };
    if (!newReport.label) return;
    setReportImages([...reportImages, newReport]);
    setNewReportLabel("");
    setShowAddReportForm(false);
  };

  const handleAddVisitSummary = async () => {
    if (!visitType || !visitDate || !visitDoctor) return;

    const formattedLabel = `${visitType} with ${visitDoctor} - ${new Date(
      visitDate
    ).toLocaleDateString()}`;
    const newSummary = {
      visitType,
      visitDate,
      doctorName: visitDoctor,
      description,
      diagnosis,
      testsRequired: testsRequired.split(",").map((t) => t.trim()),
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
          { ...data, id: data.id || data._id, label: formattedLabel },
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

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1]; // remove data:application/pdf;base64,...
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const handleAddLabResult = async () => {
    if (!newItemLabel.trim() || !labUploadedFileBytes || !labUploadedFileName)
      return;

    const pdfBlob = new Blob([labUploadedFileBytes]);
    const base64Pdf = await blobToBase64(pdfBlob);
    const token = localStorage.getItem("token");
    const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

    try {
      const res = await fetch(`${BASE_URL}/api/lab_results`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newItemLabel.trim(),
          pdfUrl: base64Pdf, // backend expects byte[]
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Added Lab Result:", data);

        // Immediately update state so it reflects on frontend
        const formatted = {
          id: data.id || data._id,
          label: `${data.name} - ${new Date(
            data.createdAt
          ).toLocaleDateString()}`,
          base64Pdf: data.pdfUrl || base64Pdf, // fallback to local value
        };

        setLabResults((prev) => [...prev, formatted]);

        // Reset form fields
        setNewItemLabel("");
        setLabUploadedFileName("");
        setLabUploadedFileBytes(null);
        setShowAddForm(null);
      } else {
        console.error("Error adding lab result:", await res.json());
      }
    } catch (err) {
      console.error("Error adding lab result:", err);
    }
  };

  // Handler for file input changes for lab results
  const handleLabFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLabUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        setLabUploadedFileBytes(byteArray);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleAddItem = (section) => {
    // This function is still used for other sections (like doctors)
    const newItem = {
      id: `${section}_${Date.now()}`,
      label: newItemLabel.trim(),
    };
    if (!newItem.label) return;

    if (section === "doctors") setDoctors([...doctors, newItem]);

    setNewItemLabel("");
    setShowAddForm(null);
  };

  const handleProvideAccess = async (doctorId) => {
    console.log("Granting access to doctor:", doctorId);
    const token = localStorage.getItem("token");
    const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

    try {
      // Step 1: Generate access link
      const resGenerateLink = await fetch(
        `${BASE_URL}/api/patients/generate-access-link`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!resGenerateLink.ok) {
        const err = await resGenerateLink.json();
        alert(
          `Failed to generate access link: ${err.message || "Unknown error"}`
        );
        return;
      }

      // Step 2: Send access link to doctor
      const resSendLink = await fetch(
        `${BASE_URL}/api/patients/send-access-link/${doctorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (resSendLink.ok) {
        alert("Access granted successfully!");
      } else {
        const err = await resSendLink.json();
        alert(`Failed to grant access: ${err.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error granting access:", error);
      alert("An error occurred while granting access.");
    }
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
            ...item,
            label: `${item.visitType} - ${new Date(
              item.visitDate
            ).toLocaleDateString()}`,
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
          console.log("Doctors:", data);
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
          console.log("Lab Results:", data);
          const formatted = data.map((item) => ({
            id: item.id || item._id,
            label: `${item.name} - ${new Date(
              item.createdAt
            ).toLocaleDateString()}`,
            base64Pdf: item.pdfUrl || null, // assuming it's named pdfUrl
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

        <div
          className={`medrec-grid ${
            activeSection ? "medrec-single" : "medrec-double"
          }`}
        >
          <div
            className="medrec-card"
            onClick={() => toggleSection("visitSummaries")}
          >
            <AssignmentIcon className="medrec-icon" />
            <h2>Visit Summaries</h2>
            {!activeSection && (
              <p className="medrec-latest">
                {visitSummaries[0]?.label || "No visits yet"}
              </p>
            )}
          </div>
          <div className="medrec-card" onClick={() => toggleSection("doctors")}>
            <PersonIcon className="medrec-icon" />
            <h2>Doctors List</h2>
            {!activeSection && (
              <p className="medrec-latest">
                {doctors[0]?.label || "No doctors yet"}
              </p>
            )}
          </div>
          <div
            className="medrec-card"
            onClick={() => toggleSection("labResults")}
          >
            <ScienceIcon className="medrec-icon" />
            <h2>Lab Results</h2>
            {!activeSection && (
              <p className="medrec-latest">
                {labResults[0]?.label || "No lab results yet"}
              </p>
            )}
          </div>
        </div>

        {activeSection === "visitSummaries" && (
          <div className="medrec-list">
            <h2>Visit Summaries</h2>
            {visitSummaries.map((item) => (
              <div
                key={item.id}
                className="medrec-item"
                onClick={() => openDetailsPopup(item)}
              >
                {item.label}
              </div>
            ))}

            {isDoctor && !showAddForm && (
              <button
                onClick={() => setShowAddForm("visitSummaries")}
                className="medrec-btn"
              >
                Add Visit
              </button>
            )}
            {selectedItem && (
              <div className="medrec-popup">
                <h3>Visit Details</h3>
                <p>
                  <strong>Type:</strong> {selectedItem.visitType}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedItem.visitDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Doctor:</strong> {selectedItem.doctorName}
                </p>
                <p>
                  <strong>Description:</strong> {selectedItem.description}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {selectedItem.diagnosis}
                </p>
                <p>
                  <strong>Tests Required:</strong>{" "}
                  {selectedItem.testsRequired?.join(", ")}
                </p>
                <button className="medrec-close-btn" onClick={closePopup}>
                  <CloseIcon className="medrec-close"/>
                </button>
              </div>
            )}

            {isDoctor && showAddForm === "visitSummaries" && (
              <div className="medrec-form">
                <h3>Add Visit Summary</h3>
                <div className="medrec-inputs">
                <label>
                  Visit Type:
                  <input
                    type="text"
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                  />
                </label>
                <label>
                  Visit Date:
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </label>
                <label>
                  Doctor Name:
                  <input
                    type="text"
                    value={visitDoctor}
                    onChange={(e) => setVisitDoctor(e.target.value)}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <label>
                  Diagnosis:
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </label>
                <label>
                  Tests Required (comma-separated):
                  <input
                    type="text"
                    value={testsRequired}
                    onChange={(e) => setTestsRequired(e.target.value)}
                  />
                </label>
                </div>
                <button onClick={handleAddVisitSummary}>
                  Add Visit Summary
                </button>
                <button onClick={() => setShowAddForm(null)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {activeSection === "doctors" && (
          <div className="medrec-list">
            <h2>Doctors List</h2>
            {doctors.map((doc) => (
              <div key={doc.id} className="medrec-item">
                <span>{doc.label}</span>
                {!isDoctor && (
                  <button
                    className="medrec-btn-small"
                    onClick={() => handleProvideAccess(doc.id)}
                  >
                    Provide Access
                  </button>
                )}
              </div>
            ))}
            {isDoctor && !showAddForm && (
              <button
                onClick={() => setShowAddForm("doctors")}
                className="medrec-btn"
              >
                Add Doctor
              </button>
            )}
            {isDoctor && showAddForm === "doctors" && (
              <div className="medrec-form">
                <h3>Add Doctor</h3>
                <label>
                  Doctor Name:
                  <input
                    type="text"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                  />
                </label>
                <button onClick={() => handleAddItem("doctors")}>
                  Add Doctor
                </button>
                <button onClick={() => setShowAddForm(null)}>
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>
        )}

        {activeSection === "labResults" && (
          <div className="medrec-list">
            <h2>Lab Results</h2>
            {labResults.map((item) => (
              <div key={item.id} className="medrec-item">
                {item.label}
                {item.base64Pdf && (
                  <button className="medrec-btn-small"
                    variant="outlined"
                    onClick={() => {
                      const byteCharacters = atob(item.base64Pdf);
                      const byteNumbers = new Array(byteCharacters.length)
                        .fill()
                        .map((_, i) => byteCharacters.charCodeAt(i));
                      const byteArray = new Uint8Array(byteNumbers);
                      const blob = new Blob([byteArray], {
                        type: "application/pdf",
                      });
                      const url = URL.createObjectURL(blob);
                      window.open(url);
                    }}
                  >
                    View PDF
                  </button>
                )}
              </div>
            ))}

            {isDoctor && !showAddForm && (
              <button
                onClick={() => setShowAddForm("labResults")}
                className="medrec-btn"
              >
                Add Lab Result
              </button>
            )}
            {isDoctor && showAddForm === "labResults" && (
              <div className="medrec-form">
                <h3>Add Lab Result</h3>
                <label>
                  Test Name:
                  <input
                    type="text"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                  />
                </label>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload File
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleLabFileChange}
                  />
                </Button>
                {labUploadedFileName && (
                  <p className="file-uploaded">
                    Uploaded: {labUploadedFileName}
                  </p>
                )}
                <button onClick={handleAddLabResult}>Add Lab Result</button>
                <button className="medrec-btn" onClick={() => setShowAddForm(null)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default MedicalRecords;
