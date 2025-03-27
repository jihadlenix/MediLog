import React, { useState } from "react";
import Input from "../components/Input";
import "./login.css";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;

  // Still call it 'email' in the form
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/patients/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 👇 Send email as 'username' in the request body
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        alert("Login successful!");
        console.log("JWT Token:", token);
        // You can navigate to a protected route here
      } else {
        const errorText = await response.text();
        alert("Login failed: " + errorText);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">Log In</h2>
          <p className="login-subtitle">Welcome back! Please enter your details.</p>
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
    </div>
  );
};

export default Login;
