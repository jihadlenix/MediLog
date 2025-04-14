import React, { useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./HealthRecords.css";
import SearchIcon from "@mui/icons-material/Search";

const Surgeries = () => {
  // Hardcoded role check; replace with real data in your app
  const isDoctor = true;

  const [expandedSurgeries, setExpandedSurgeries] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddFormCurrent, setShowAddFormCurrent] = useState(false);
  const [showAddFormPast, setShowAddFormPast] = useState(false);

  const [newSurgery, setNewSurgery] = useState({
    type: "",
    goal: "",
    date: "",
    time: "",
    location: "",
    doctor: "",
    postInstructions: "",
  });

  const [currentSurgeries, setCurrentSurgeries] = useState([
    {
      id: 1,
      type: "Appendectomy",
      goal: "Remove infected appendix",
      date: "2024-03-01",
      time: "10:00 AM",
      location: "City Hospital, OR 3",
      doctor: "Dr. James Carter",
      postInstructions: "Rest for 2 weeks, avoid lifting heavy objects.",
    },
    {
      id: 2,
      type: "Knee Replacement",
      goal: "Replace damaged knee joint",
      date: "2024-02-15",
      time: "08:00 AM",
      location: "General Hospital, OR 5",
      doctor: "Dr. Sarah Wilson",
      postInstructions: "Physical therapy recommended, avoid strain for 6 weeks.",
    },
  ]);

  const [pastSurgeries, setPastSurgeries] = useState([
    {
      id: 3,
      type: "Gallbladder Removal",
      goal: "Remove Gallbladder",
      date: "2023-10-01",
      time: "09:30 AM",
      location: "Regional Medical Center, OR 2",
      doctor: "Dr. John Smith",
      postInstructions: "Avoid fatty foods, follow up in 2 weeks.",
    },
    {
      id: 4,
      type: "Cataract Surgery",
      goal: "Fix Cataract",
      date: "2023-08-10",
      time: "11:15 AM",
      location: "Eye Care Clinic, Room 1",
      doctor: "Dr. Emily Davis",
      postInstructions: "Wear sunglasses, avoid bright light, follow up in 3 days.",
    },
  ]);

  const toggleExpand = (id) => {
    setExpandedSurgeries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddSurgery = (isPast) => {
    const newEntry = {
      id: Date.now(),
      ...newSurgery,
    };

    if (isPast) {
      setPastSurgeries([...pastSurgeries, newEntry]);
      setShowAddFormPast(false);
    } else {
      setCurrentSurgeries([...currentSurgeries, newEntry]);
      setShowAddFormCurrent(false);
    }

    setNewSurgery({
      type: "",
      goal: "",
      date: "",
      time: "",
      location: "",
      doctor: "",
      postInstructions: "",
    });
  };

  const filteredCurrent = currentSurgeries.filter((surg) =>
    surg.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPast = pastSurgeries.filter((surg) =>
    surg.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hr-page">
      <LeftNavBar />
      <div className="hr-content">
        <div className="hr-header">
          <h2>Surgeries</h2>
          <div className="hr-search-bar">
            <input
              type="text"
              placeholder="Search surgeries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="hr-search-icon" />
          </div>
        </div>

        {/* Current Surgeries */}
        <div className="hr-sub-header">
          <h3>Recent Surgeries</h3>
          {/* Only show this button if the user is a doctor */}
          {isDoctor && (
            <button
              className="hr-add-btn"
              onClick={() => setShowAddFormCurrent(!showAddFormCurrent)}
            >
              {showAddFormCurrent ? "Cancel" : "Add New"}
            </button>
          )}
        </div>

        {/* Add Form for Current Surgeries */}
        {showAddFormCurrent && (
          <div className="hr-add-form">
            {Object.keys(newSurgery).map((field) => (
              <div key={field} className="hr-form-field">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                  value={newSurgery[field]}
                  onChange={(e) =>
                    setNewSurgery({ ...newSurgery, [field]: e.target.value })
                  }
                />
              </div>
            ))}
            <button className="hr-save-btn" onClick={() => handleAddSurgery(false)}>
              Save
            </button>
          </div>
        )}

        {/* Render Current Surgeries */}
        <div className="hr-cards">
          {filteredCurrent.map((surg) => (
            <div key={surg.id} className="hr-card">
              <p><strong>Type:</strong> {surg.type}</p>
              <p><strong>Goal:</strong> {surg.goal}</p>
              <p><strong>Date:</strong> {surg.date}</p>
              <p><strong>Time:</strong> {surg.time}</p>
              <p><strong>Location:</strong> {surg.location}</p>
              <p><strong>Doctor:</strong> {surg.doctor}</p>
              <p><strong>Post Instructions:</strong> {surg.postInstructions}</p>
            </div>
          ))}
        </div>

        {/* Past Surgeries */}
        <div className="hr-section">
          <div className="hr-sub-header">
            <h3>Past Surgeries</h3>
            {/* Only show this button if the user is a doctor */}
            {isDoctor && (
              <button
                className="hr-add-btn"
                onClick={() => setShowAddFormPast(!showAddFormPast)}
              >
                {showAddFormPast ? "Cancel" : "Add New"}
              </button>
            )}
          </div>

          {/* Add Form for Past Surgeries */}
          {showAddFormPast && (
            <div className="hr-add-form">
              {Object.keys(newSurgery).map((field) => (
                <div key={field} className="hr-form-field">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                    value={newSurgery[field]}
                    onChange={(e) =>
                      setNewSurgery({ ...newSurgery, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
              <button className="hr-save-btn" onClick={() => handleAddSurgery(true)}>
                Save
              </button>
            </div>
          )}

          {/* Expandable Past Surgeries */}
          <ul className="hr-list">
            {filteredPast.map((surg) => (
              <li key={surg.id} className="hr-list-item">
                <div
                  className="hr-list-header"
                  onClick={() => toggleExpand(surg.id)}
                >
                  <h4>{surg.type}</h4>
                  <span>{expandedSurgeries[surg.id] ? "▼" : "▶"}</span>
                </div>
                {expandedSurgeries[surg.id] && (
                  <div className="hr-list-details">
                    <p><strong>Goal:</strong> {surg.goal}</p>
                    <p><strong>Date:</strong> {surg.date}</p>
                    <p><strong>Time:</strong> {surg.time}</p>
                    <p><strong>Location:</strong> {surg.location}</p>
                    <p><strong>Doctor:</strong> {surg.doctor}</p>
                    <p><strong>Post Instructions:</strong> {surg.postInstructions}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Surgeries;
