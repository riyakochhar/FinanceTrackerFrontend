import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Transactions from "../pages/Transactions";

function AppRoutes() {
  const storedUser = localStorage.getItem("user");
  let userId;
  if (storedUser) {
    userId = JSON.parse(storedUser)?._id;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            userId ? (
              <Navigate to="/home" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
