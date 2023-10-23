import React, { useState } from "react";
import '../App.css';
import AbsenceCreateForm from "./AbsenceCreateForm";
import useAuth from '../Hooks/useAuth';
import { Link, Navigate, useLocation } from 'react-router-dom';



export default function PersonPage(props) {

  const [absences, setAbsences] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showCreate, setShowCreate]= useState(false);
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

    function getAbsences() {
      const url = `https://localhost:7139/api/Absence/PersonID/${auth.id}`;  
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((absencesfromServer) => {
          console.log(absencesfromServer);
          setAbsences(absencesfromServer);
          setShowTable(true);
          setShowCreate(false);

        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
    function handleBackclick() {
      setShowTable(false);
    }

    { function createAbsence(){
      setShowTable(false);
      setShowCreate(true);
    }

    return (
      <div className="container mt-3">
        <button onClick={getAbsences} className="btn btn-success btn-lg">Absence-raports</button>
        <button onClick= {createAbsence}className="btn btn-success btn-lg mx-2">Create new</button>
        {showCreate && (
        <> 
          <AbsenceCreateForm/>
          <button onClick={() => setShowCreate(false)} className="btn btn-dark btn-lg mt-2 w-100 mx-2">Back</button>
        </>
        )}
        {showTable && renderAbsencestable()}
        {showTable && (
          <button onClick={handleBackclick} className="btn btn-dark btn-lg">Back</button>
        )}
        <div>
          <button onClick={logout}>Sign Out</button>
        </div>
      </div>
    )



// import React from 'react'
// import useAuth from '../Hooks/useAuth';
// import { Link, Navigate, useLocation } from 'react-router-dom';

// export default function PersonPage() {

//   const { auth, setAuth } = useAuth();
//   const location = useLocation();

//   const logout = async () => {
//     setAuth({});
//   }

//   // cheap "rolecheck" because of BD and backend design
//   if(auth.isAdmin === true)
//   {
//     return <Navigate to="/admin" state={{ from: location}} replace />
//   }

//   return (
//     <div>
//       <p>person</p>
//       <p>person</p>
//       <p>person</p>
//       <div>
//         {auth.id}
//       </div>
//       <div>
//         {auth.name}
//       </div>
//       <div>
//         <button onClick={logout}>Sign Out</button>
//       </div>
//       </div>
//     );









    function renderAbsencestable() {
      return (
        <div className="table-responsive mt-5">
          <table className="table table-bordered border-dark">
            <thead>
              <tr>
                <th scope="col">Raport-Id</th>
                <th scope="col">Type of absence</th>
                <th scope="col">Amount of days requested</th>
                <th scope="col">Day of registered request</th>
                <th scope="col">Start of leave-date</th>
                <th scope="col">End of leave-date</th>
                <th scope="col">Pending</th>
                <th scope="col">Approved</th>
              </tr>
            </thead>
            <tbody>
              {absences.result.map((absence) => (
                <tr key={absence.id}>
                  <td>{absence.id}</td>
                  <td>{absence.typeID === 1 ? 'Vacation'
                  : absence.typeID === 2 ? 'VABB'
                  : absence.typeID === 3 ? 'Sick': 'Unknown Type'}</td>
                  <td>{absence.days}</td>
                  <td>{new Date(absence.dayRequested).toLocaleDateString('sv-SE')}</td>
                  <td>{new Date(absence.leaveStart).toLocaleDateString('sv-SE')}</td>
                  <td>{new Date(absence.leaveEnd).toLocaleDateString('sv-SE')}</td>
                  <td style={{ background: absence.pending ? 'pink' : 'lightgreen' }}>
                  {absence.pending ? '[Awaiting]' : '[Confirmed]'}</td>
                  <td style={{ background: absence.approved ? 'lightgreen' : 'red' }}>
                  {absence.approved ? '[Approved]' : '[Not approved]'}
                </td> </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } 
  }
}
