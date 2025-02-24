import React from "react";
import "./Input.css";  // Import the new CSS file

const Input = ({ label, type, name, value, onChange, placeholder, error }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? "input-error" : ""}`}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Input;
