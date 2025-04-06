import React, { useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./Surgeries.css";
import SearchIcon from "@mui/icons-material/Search";

const Surgeries = () => {
  const [expandedSurgeries, setExpandedSurgeries] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddFormCurrent, setShowAddFormCurrent] = useState(false); // for current surgeries
  const [showAddFormPast, setShowAddFormPast] = useState(false); // for past surgeries
  const [newSurgery, setNewSurgery] = useState({
    type: "",
    goal: "",
    date: "",
    time: "",
    location: "",
    doctor: "",
    postInstructions: "",
  });

  // Use state to manage surgeries
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

  // Add state for past surgeries
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
      id: isPast ? pastSurgeries.length + 1 : currentSurgeries.length + 1,
      ...newSurgery,
    };
    if (isPast) {
      setPastSurgeries([...pastSurgeries, newEntry]); // Update past surgeries state
    } else {
      setCurrentSurgeries([...currentSurgeries, newEntry]); // Update current surgeries state
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
    isPast ? setShowAddFormPast(false) : setShowAddFormCurrent(false);
  };

  const filteredCurrentSurgeries = currentSurgeries
    .filter((surg) => surg.type.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredPastSurgeries = pastSurgeries
    .filter((surg) => surg.type.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="medications-page">
      <LeftNavBar />
      <div className="medications-content">
        <div className="medications-header">
          <h2>Surgeries</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search surgeries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="search-icon" />
          </div>
        </div>

        {/* Current Surgeries Section */}
        <div className="sub-header">
          <h3>Current Surgeries</h3>
          <button className="add" onClick={() => setShowAddFormCurrent(!showAddFormCurrent)}>
            {showAddFormCurrent ? "Cancel" : "Add Surgery"}
          </button>
        </div>

        {/* Add Surgery Form (Current Surgeries) */}
        {showAddFormCurrent && (
          <div className="add-form">
            <h4>Add Surgery</h4>
            <div className="form-field">
              <label>Surgery Type</label>
              <input
                type="text"
                value={newSurgery.type}
                onChange={(e) => setNewSurgery({ ...newSurgery, type: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Goal</label>
              <input
                type="text"
                value={newSurgery.goal}
                onChange={(e) => setNewSurgery({ ...newSurgery, goal: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                value={newSurgery.date}
                onChange={(e) => setNewSurgery({ ...newSurgery, date: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Time</label>
              <input
                type="time"
                value={newSurgery.time}
                onChange={(e) => setNewSurgery({ ...newSurgery, time: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Location</label>
              <input
                type="text"
                value={newSurgery.location}
                onChange={(e) => setNewSurgery({ ...newSurgery, location: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Doctor</label>
              <input
                type="text"
                value={newSurgery.doctor}
                onChange={(e) => setNewSurgery({ ...newSurgery, doctor: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Post Instructions</label>
              <input
                type="text"
                value={newSurgery.postInstructions}
                onChange={(e) => setNewSurgery({ ...newSurgery, postInstructions: e.target.value })}
              />
            </div>
            <button className="save" onClick={() => handleAddSurgery(false)}>
              Save
            </button>
          </div>
        )}

        {/* Current Surgeries List */}
        <div className="medications-cards">
          {filteredCurrentSurgeries.length > 0 ? (
            filteredCurrentSurgeries.map((surg) => (
              <div key={surg.id} className="medication-card">
                <p>
                  <strong>Type:</strong> {surg.type}
                </p>
                <p>
                  <strong>Goal:</strong> {surg.goal}
                </p>
                <p>
                  <strong>Date:</strong> {surg.date}
                </p>
                <p>
                  <strong>Time:</strong> {surg.time}
                </p>
                <p>
                  <strong>Location:</strong> {surg.location}
                </p>
                <p>
                  <strong>Doctor:</strong> {surg.doctor}
                </p>
                <p>
                  <strong>Post Instructions:</strong> {surg.postInstructions}
                </p>
              </div>
            ))
          ) : (
            <p>No current surgeries found.</p>
          )}
        </div>

        {/* Past Surgeries Section */}
        <div className="section">
          <div className="sub-header">
            <h3>Past Surgeries</h3>
            <button className="add" onClick={() => setShowAddFormPast(!showAddFormPast)}>
              {showAddFormPast ? "Cancel" : "Add Surgery"}
            </button>
          </div>

          {/* Add Surgery Form (Past Surgeries) */}
          {showAddFormPast && (
            <div className="add-form">
              <h4>Add Surgery</h4>
              <div className="form-field">
                <label>Surgery Type</label>
                <input
                  type="text"
                  value={newSurgery.type}
                  onChange={(e) => setNewSurgery({ ...newSurgery, type: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Goal</label>
                <input
                  type="text"
                  value={newSurgery.goal}
                  onChange={(e) => setNewSurgery({ ...newSurgery, goal: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Date</label>
                <input
                  type="date"
                  value={newSurgery.date}
                  onChange={(e) => setNewSurgery({ ...newSurgery, date: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Time</label>
                <input
                  type="time"
                  value={newSurgery.time}
                  onChange={(e) => setNewSurgery({ ...newSurgery, time: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Location</label>
                <input
                  type="text"
                  value={newSurgery.location}
                  onChange={(e) => setNewSurgery({ ...newSurgery, location: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Doctor</label>
                <input
                  type="text"
                  value={newSurgery.doctor}
                  onChange={(e) => setNewSurgery({ ...newSurgery, doctor: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Post Instructions</label>
                <input
                  type="text"
                  value={newSurgery.postInstructions}
                  onChange={(e) => setNewSurgery({ ...newSurgery, postInstructions: e.target.value })}
                />
              </div>
              <button className="save" onClick={() => handleAddSurgery(true)}>
                Save
              </button>
            </div>
          )}

          {/* Past Surgeries List */}
          <ul className="medications-list">
            {filteredPastSurgeries.length > 0 ? (
              filteredPastSurgeries.map((surg) => (
                <li key={surg.id} className="medication-item">
                  <div
                    className="medication-header"
                    onClick={() => toggleExpand(surg.id)}
                  >
                    <h4>{surg.type}</h4>
                    <span>{expandedSurgeries[surg.id] ? "▼" : "▶"}</span>
                  </div>
                  {expandedSurgeries[surg.id] && (
                    <div className="medication-info">
                      <p><strong>Goal:</strong> {surg.goal}</p>
                      <p><strong>Date:</strong> {surg.date}</p>
                      <p><strong>Time:</strong> {surg.time}</p>
                      <p><strong>Location:</strong> {surg.location}</p>
                      <p><strong>Doctor:</strong> {surg.doctor}</p>
                      <p><strong>Post Instructions:</strong> {surg.postInstructions}</p>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No past surgeries found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Surgeries;