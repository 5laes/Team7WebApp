import React, { useState } from "react";
import { AdminNavBar } from "./AdminNavbar";
import EmployeePage from "./EmployeePage";
import AbsenceType from "./AbsenceTypePage";
import Appliances from "./AppliancesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

let names = ["Pedro", "Jose", "Gabriel", "Pedro"];

names.map((namn) => {
  return "Mr. " + namn;
  //above adds to the variables(REPLACES value)
  // return <h1>{namn}</h1>  //returns h1
});

names.filter((namNet) => {
  return namNet !== "Pedro"; //excludes PedroS
});

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
