import React, { useState } from "react";
import Input from "../components/Input";
import "./signup.css"; // Import the CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: "",
    phoneNumber: "",
    birthdate: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      {/* Main Signup Box */}
      <div className="signup-box">
        {/* Header Section */}
        <div className="signup-header">
          <h2 className="signup-title">Sign Up</h2>
          <p className="signup-subtitle">Create an account to get started.</p>
        </div>

        {/* Form Section */}
        <div className="signup-form">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Input
            label="ID Number"
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="Enter your ID number"
          />
          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          <Input
            label="Birthdate"
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          {/* Sign Up Button */}
          <button className="signup-button">Sign Up</button>

          {/* Already have an account Section */}
          <div className="already-have-account">
            <p>Already have an account? <a href="/login">Log in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
