import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Transactions from "../pages/Transactions";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
