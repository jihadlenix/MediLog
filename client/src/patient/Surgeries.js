import React, { useEffect, useState } from "react";
import LeftNavBar from "../components/LeftNavBar";
import "./HealthRecords.css";
import SearchIcon from "@mui/icons-material/Search";

const Surgeries = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const [expandedSurgeries, setExpandedSurgeries] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddFormCurrent, setShowAddFormCurrent] = useState(false);
  const [showAddFormPast, setShowAddFormPast] = useState(false);
  const [currentSurgeries, setCurrentSurgeries] = useState([]);
  const [pastSurgeries, setPastSurgeries] = useState([]);
  const [newSurgery, setNewSurgery] = useState({
    type: "",
    goal: "",
    date: "",
    time: "",
    location: "",
    doctor: "",
    postInstructions: "",
  });

  // Temporary isDoctor check; replace with real logic
  const isDoctor = true;

  useEffect(() => {
    const fetchSurgeries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/surgeries/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch surgeries");

        const data = await response.json();
        const current = [];
        const past = [];

        data.forEach((s) => {
          const surgeryObj = {
            id: s.id,
            type: s.surgeryType,
            goal: s.description,
            date: new Date(s.createdAt).toISOString().split("T")[0],
            time: new Date(s.createdAt).toISOString().split("T")[1]?.slice(0, 5),
            location: "",
            doctor: "",
            postInstructions: "",
          };

          if (s.status === "past") {
            past.push(surgeryObj);
          } else {
            current.push(surgeryObj);
          }
        });

        setCurrentSurgeries(current);
        setPastSurgeries(past);
      } catch (error) {
        console.error("Error fetching surgeries:", error);
      }
    };

    fetchSurgeries();
  }, [BASE_URL]);

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

        <div className="hr-sub-header">
          <h3>Recent Surgeries</h3>
          {isDoctor && (
            <button
              className="hr-add-btn"
              onClick={() => setShowAddFormCurrent(!showAddFormCurrent)}
            >
              {showAddFormCurrent ? "Cancel" : "Add"}
            </button>
          )}
        </div>

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

        <div className="hr-section">
          <div className="hr-sub-header">
            <h3>Past Surgeries</h3>
            {isDoctor && (
              <button
                className="hr-add-btn"
                onClick={() => setShowAddFormPast(!showAddFormPast)}
              >
                {showAddFormPast ? "Cancel" : "Add"}
              </button>
            )}
          </div>

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

          <ul className="hr-list">
            {filteredPast.map((surg) => (
              <li key={surg.id} className="hr-list-item">
                <div className="hr-list-header" onClick={() => toggleExpand(surg.id)}>
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
