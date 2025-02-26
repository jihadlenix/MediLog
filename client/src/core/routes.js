import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/LogIn";
import Signup from "../auth/signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
