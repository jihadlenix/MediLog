import React, { useState } from "react";
import Input from "../components/Input";
import "./login.css"; // Make sure to import the CSS file here


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      {/* Main Login Box */}
      <div className="login-box">

        {/* Header Section */}
        <div className="login-header">
          <h2 className="login-title">Log In</h2>
          <p className="login-subtitle">Welcome back! Please enter your details.</p>
        </div>

        {/* Form Section */}
        <div className="login-form">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          {/* Forgot Password Section */}
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>

          {/* Sign In Button */}
          <button className="login-button">Sign In</button>

          {/* Create Account Section */}
          <div className="create-account">
            <p>Don't have an account? <a href="/signup">Create one</a></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
