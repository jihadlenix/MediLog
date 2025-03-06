import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/LogIn";
import Signup from "../auth/signup";
import Dashboard from '../patient/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashPatient" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
