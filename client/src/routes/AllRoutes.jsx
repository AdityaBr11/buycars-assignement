import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Oem from "../pages/Oem";
import Inventory from "../pages/Inventory";
import SecureRoute from "./SecureRoute";
import OemDetail from "../pages/OemDetail";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />
      <Route
        path="/oem"
        element={
          <>
            <SecureRoute>
              <Navbar />
              <Oem />
            </SecureRoute>
          </>
        }
      />
      <Route
        path="/oem/:id"
        element={
          <>
            <SecureRoute>
              <Navbar />
              <OemDetail/>
            </SecureRoute>
          </>
        }
      />
      <Route
        path="/inventory"
        element={
          <>
            <SecureRoute>
              <Navbar />
              <Inventory />
            </SecureRoute>
          </>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
