import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import ApplyForLeave from "./ApplyForLeave";
import MyLeaves from "./MyLeaves";
import {Sidebar} from "./Sidebar";



export default function PersonPage(props) {

  const { auth, setAuth } = useAuth();
  const location = useLocation();

  // cheap "rolecheck" because of BD and backend design
  if(auth.isAdmin === true)
  {
    alert("You are an Admin, you can not visit that page!");
    return <Navigate to="/" state={{ from: location}} replace />
  }

  return (
    <div>
      <Sidebar>
        <Link to="/apply-for-leave">Apply for leave</Link>
        <Link to="/my-leaves">My Leaves</Link>
      </Sidebar>
      <Routes>
        <Route path="/apply-for-leave" element={<ApplyForLeave />} />
        <Route path="/my-leaves" element={<MyLeaves />} />
      </Routes>
    </div>
  )
}