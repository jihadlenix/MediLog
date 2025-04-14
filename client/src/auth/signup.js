import React, { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./signup.css";

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_DOMAIN_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    phoneNumber: "",
    idNumber: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let error = "";

    if (field === "email") {
      const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) error = "Invalid email address";
    }

    if (field === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(value)) {
        error = "Password must be 8+ chars with uppercase, lowercase, and number";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(formData).forEach(([key, value]) => validate(key, value));
    if (Object.values(errors).some((err) => err)) return;

    try {
      const response = await fetch(`${BASE_URL}/api/patients/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          gender: formData.gender || "Not specified",
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
          idNumber: formData.idNumber,
        }),
      });

      if (response.ok) {
        alert("Signup successful! Please verify your email.");
        navigate("/login");
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

        <form className="signup-form" onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
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

          <div className="input-wrapper">
            <label>Birthdate</label>
            <DatePicker
              selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
              onChange={(date) =>
                setFormData({ ...formData, dateOfBirth: date.toISOString().split("T")[0] })
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Select your birthdate"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
              className="custom-datepicker"
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="gender">Gender (Optional)</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="custom-datepicker"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Not specified">Prefer not to say</option>
            </select>
          </div>

          <button className="signup-button" type="submit">
            Sign Up
          </button>

          <div className="already-have-account">
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
