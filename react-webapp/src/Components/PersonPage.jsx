import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import ApplyForLeave from "./ApplyForLeave";
import MyLeaves from "./MyLeaves";
import {Sidebar} from "./Sidebar";





export default function PersonPage(props) {

  //const [absences, setAbsences] = useState([]);
  //const [showTable, setShowTable] = useState(false);
 // const [showCreate, setShowCreate]= useState(false);
  const { auth, setAuth } = useAuth();
  const location = useLocation();

    const logout = async () => {
    setAuth({});
  }

  // cheap "rolecheck" because of BD and backend design
  if(auth.isAdmin === true)
  {
    alert("You are an Admin, you can not visit that page!");
    return <Navigate to="/" state={{ from: location}} replace />
  }

   /* function getAbsences() {
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

    function createAbsence(){
      setShowTable(false);
      setShowCreate(true);
    }
*/
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
       /* <button onClick={getAbsences} className="btn btn-success btn-lg">Absence-raports</button>
        <button onClick= {createAbsence}className="btn btn-success btn-lg mx-2">Create new</button>
        <button className="btn btn-warning btn-lg  my-2 " onClick={logout}>Sign Out</button>
        {showCreate && (<><AbsenceCreateForm/> <button onClick={() => setShowCreate(false)} className="btn btn-dark btn-lg w-100 my-2">
          Back</button></>)}

        <div>
        {showTable && renderAbsencestable()}
        {showTable && (<button onClick={handleBackclick} className="btn btn-dark w-100 btn-lg my-2">Back</button>)}
        </div>
      </div>
    )*/




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









    /*function renderAbsencestable() {

  
    function renderAbsencestable() {

      return (
        <>
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
            <tbody >
              {absences.result.map((absence) => (
                <tr key={absence.id} >
                  <td>{absence.id}</td>
                  <td>{absence.typeID === 1 ? 'Vacation'
                  : absence.typeID === 2 ? 'VABB'
                  : absence.typeID === 3 ? 'Sick': 'Unknown Type'}</td>
                  <td  >{absence.days}</td>
                  <td style={{ backgroundColor: new Date(absence.dayRequested) < (new Date().setDate(new Date().getDate() - 1)) ? 'lightblue' : 'inherit' }}>{new Date(absence.dayRequested).toLocaleDateString('sv-SE')}</td>
                  <td style={{ backgroundColor: new Date(absence.leaveStart) < (new Date().setDate(new Date().getDate() - 1)) ? 'lightblue' : 'inherit' }}>{new Date(absence.leaveStart).toLocaleDateString('sv-SE')}</td>
                  <td style={{ backgroundColor: new Date(absence.leaveEnd) < (new Date().setDate(new Date().getDate() - 1)) ? 'lightblue' : 'inherit' }}>{new Date(absence.leaveEnd).toLocaleDateString('sv-SE')}</td>
                  <td style={{ background: absence.pending ? 'pink' : 'lightgreen' }}>
                  {absence.pending ? '[Awaiting]' : '[Confirmed]'}</td>
                  <td style={{ background: absence.approved ? 'lightgreen' : 'red' }}>
                  {absence.approved ? '[Approved]' : '[Not approved]'}
                </td> </tr>
              ))}
            </tbody>
          </table>
        </div>
              </>
      );
    } 
  }

}*/



