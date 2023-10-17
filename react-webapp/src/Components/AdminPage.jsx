import React, { useState } from "react";
import { AdminNavBar } from "./AdminNavbar";
import EmployeePage from "./EmployeePage";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


export default function AdminPage() {

  return(

    <Router>
    <AdminNavBar/>
    <Routes>
    <Route exact path='/employees' element={<EmployeePage/>}/>
    {/* <Route exact path='/absencetype' element={<PortfolioComponent/>}/>
    <Route exact path='/appliances' element={<ContactComponent/>}/>     */}
    </Routes>
  </Router>
  
  );  
}
