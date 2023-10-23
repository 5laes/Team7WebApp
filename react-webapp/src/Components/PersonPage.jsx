import React from 'react'
import useAuth from '../Hooks/useAuth';
import { Link, Navigate, useLocation } from 'react-router-dom';

export default function PersonPage() {

  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const logout = async () => {
    setAuth({});
  }

  // cheap "rolecheck" because of BD and backend design
  if(auth.isAdmin === true)
  {
    return <Navigate to="/admin" state={{ from: location}} replace />
  }

  return (
    <div>
      <p>person</p>
      <p>person</p>
      <p>person</p>
      <div>
        {auth.id}
      </div>
      <div>
        {auth.name}
      </div>
      <div>
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  )
}
