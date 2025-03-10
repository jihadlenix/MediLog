import React, { useState } from "react";
import "./EmailVer.css";

const EmailVerification = () => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted code:", code);
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Email Verification</h2>
        <p className="input-label" style={{ textAlign: "center" }}>
          Enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
          </div>
          
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Didn’t receive an email? <a href="http://localhost:3000/login" style={{ color: "#129BC9" }}>Send again</a>
          </p>
          <div className="submit-button-container">
            <button className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;