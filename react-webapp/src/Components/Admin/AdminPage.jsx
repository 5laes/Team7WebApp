import React, { useState } from "react";
import useAuth from '../Hooks/useAuth';
import { Link, Navigate, useLocation } from 'react-router-dom'
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

  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const logout = async () => {
    setAuth({});
  }

  // cheap "rolecheck" because of BD and backend design
  if(auth.isAdmin === false)
  {
    return <Navigate to="/person" state={{ from: location}} replace />
  }

  return (
    <div>
      <div>{auth.id}</div>
      <div>{auth.name}</div>
      <div>
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
    // <Router>
    //   <AdminNavBar />
    //   <Routes>
    //     <Route exact path="/employees" element={<EmployeePage />} />
    //     <Route exact path="/absencetype" element={<AbsenceType />} />
    //     <Route exact path="/appliances" element={<Appliances />} />
    //   </Routes>
    // </Router>
  );
}
