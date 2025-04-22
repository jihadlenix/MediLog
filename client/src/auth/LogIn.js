import React, { useState } from "react";
import Input from "../components/Input";
import "./login.css";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false); // 🔄 loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const response = await fetch(`${BASE_URL}/api/patients/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("isDoctor", false); // Store username in local storage
        console.log("JWT Token:", token);

        // ✅ Redirect immediately — loader stays visible until page unloads
        window.location.href = "/dashPatient";
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
            <h2 className="login-title">Log In</h2>
            <p className="login-subtitle">Welcome back! Please enter your details.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <Input
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <div className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-button">Sign In</button>

            <div className="create-account">
              <p>Don't have an account? <a href="/Signup">Create one</a></p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
