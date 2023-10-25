import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import 'bootstrap-icons/font/bootstrap-icons.css'
import MyLeaves from './MyLeaves'
import ApplyForLeave from './ApplyForLeave'




export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const logout = async () => {
    setAuth({});
  }

  const onSetSidebar = (open) => {
    setSidebar(open);
  };
   // cheap "rolecheck" because of BD and backend design
   if(auth.isAdmin === true)
   {
     return <Navigate to="/admin" state={{ from: location}} replace />
   }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark col-auto col-md-2 min-vh-100 d-flex flex-column">
        <div className="mb-3 smaller-text">
            <span className='d-none d-sm-inline smaller-text text-white'>
            <i className="bi bi-person">{auth.email}</i></span> 
            <button onClick={logout} className="btn btn-link text-white">
                  <i className="bi bi-box-arrow-right"></i>
                  <span className='d-none d-sm-inline smaller-text'>Logout</span>
            </button>
          </div>
          <NavLink to="/applyForLeave."exact="true">
            <i className="bi bi-pencil-square"></i>
            Apply for leave
          </NavLink>
          <NavLink to="/myLeaves" exact="true"> 
            <i className="bi bi-book"></i>
              My Leaves
          </NavLink>
        </div>
      </div>
    </div>
  );
};
