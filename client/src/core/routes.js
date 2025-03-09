import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/LogIn";
import Signup from "../auth/signup";
import Dashboard from '../patient/Dashboard';
import MedRecord from '../patient/MedRecord'
import DocProfile from "../doctor/docProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashPatient" element={<Dashboard />} />
      <Route path="/medRecord" element={<MedRecord />} />
      <Route path="/docProfile" element={<DocProfile />} />
    </Routes>
  );
};

export default AppRoutes;
