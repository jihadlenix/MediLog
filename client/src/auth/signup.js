import React, { useState } from "react";
import Input from "../components/Input";
import "./signup.css"; // Import the CSS file for styling

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/patients/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          gender: "Not specified", // change or add gender field to the form if needed
          dateOfBirth: formData.birthdate,
          phoneNumber: formData.phoneNumber,
          idNumber: formData.idNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Signup successful!");
        console.log("User created:", data);
        // You can redirect here using navigate() from react-router-dom
      } else {
        const errorText = await response.text();
        alert("Signup failed: " + errorText);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h2 className="signup-title">Sign Up</h2>
          <p className="signup-subtitle">Create an account to get started.</p>
        </div>

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

          <button className="signup-button" onClick={handleSubmit}>
            Sign Up
          </button>

          <div className="already-have-account">
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
