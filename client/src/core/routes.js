import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/LogIn";
import Signup from "../auth/signup";
import Dashboard from '../patient/Dashboard';
import MedRecord from '../patient/MedRecord'
import DocProfile from "../doctor/docProfile";
import LeftNavBar from '../components/LeftNavBar';
import Medications from '../patient/Medications';
import Welcome from '../welcome/Welcome';
import VaccinationRecord from "../patient/VaccinationRecord";
import Surgeries from "../patient/Surgeries";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashPatient" element={<Dashboard />} />
      <Route path="/medRecord" element={<MedRecord />} />
      <Route path="/docProfile" element={<DocProfile />} />
      <Route path="/nav" element={< LeftNavBar />} />
      <Route path="/medications" element={< Medications />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/vaccines" element={<VaccinationRecord />} />
      <Route path="/surgeries" element={<Surgeries />} />
    </Routes>
  );
};

export default AppRoutes;


