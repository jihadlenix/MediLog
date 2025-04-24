import React, { useState } from "react";
import Input from "../components/Input";
import "./login.css";

const DrLogin = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    code: "",
    licenseNumber: "",
    specialty: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/doctors/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("tokenDr", token);
        localStorage.setItem("isDoctor", "true");
        localStorage.setItem("accessGrant", false);

        console.log("JWT TokenDr:", token);

        window.location.href = "/DocProfile";
      } else {
        const errorText = await response.text();
        alert("Login failed: " + errorText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Logging you in...</p>
        </div>
      ) : (
        <div className="login-box">
          <div className="login-header">
            <h2 className="login-title">Doctor Login</h2>
            <p className="login-subtitle">Welcome Doctor! Please enter your details.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <Input
              label="Code"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter your code"
            />
            <Input
              label="License Number"
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Enter your license number"
            />
            <Input
              label="Specialty"
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Enter your specialty"
            />

            <div className="forgot-password">
              <a href="/forgot-password">Forgot something?</a>
            </div>

            <button type="submit" className="login-button">Sign In</button>

            <div className="create-account">
              <p>Don't have an account? <a href="/DrSignup">Create one</a></p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DrLogin;
