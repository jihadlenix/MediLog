import React, { useState } from "react";
import "./UserInfoForm.css";

const UserInfoForm = () => {
  const [fullName, setFullName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">User Information</h2>
        <form className="user-form">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="dob-group">
            <label className="input-label">Date of Birth</label>
            <div className="dob-fields">
              <select className="dob-select" value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select className="dob-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </select>
              <select className="dob-select" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Year</option>
                {[...Array(100)].map((_, i) => (
                  <option key={i} value={2025 - i}>{2025 - i}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="select-group">
            <label className="input-label">Gender</label>
            <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="spacer"></div>
          </div>
          <div className="select-group">
            <label className="input-label">I am a:</label>
            <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div className="spacer"></div>
          <div className="upload-group">
            <label className="upload-button">
              Upload Image of ID or Passport
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
            </label>
          </div>
          <div className="spacer"></div>
          {/* Next Button */}
          
          <div className="next-button-container">
            <button className="next-button">Next</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
