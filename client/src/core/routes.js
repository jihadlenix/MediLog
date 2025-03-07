import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/LogIn";
import Signup from "../auth/signup";
import Dashboard from '../patient/Dashboard';
import LeftNavBar from '../components/LeftNavBar';
import Medications from '../patient/Medications';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashPatient" element={<Dashboard />} />
      <Route path="/nav" element={< LeftNavBar/>} />
      <Route path="/medications" element={< Medications/>} />


    </Routes>
  );
};

export default AppRoutes;
