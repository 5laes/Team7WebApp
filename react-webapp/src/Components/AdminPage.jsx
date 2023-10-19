import React, { useState } from "react";
import { AdminNavBar } from "./AdminNavbar";
import EmployeePage from "./EmployeePage";
import AbsenceType from "./AbsenceTypePage";
import Appliances from "./AppliancesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 
 
export default function AdminPage() {
  return (
    <Router>
      <AdminNavBar />
      <Routes>
        <Route exact path="/employees" element={<EmployeePage />} />
        <Route exact path="/absencetype" element={<AbsenceType />} />
        <Route exact path="/appliances" element={<Appliances />} />
      </Routes>
    </Router>
  );
}
