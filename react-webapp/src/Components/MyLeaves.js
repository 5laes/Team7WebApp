import React, { useEffect, useState } from "react";
import {Sidebar} from "./Sidebar";
import useAuth from '../Hooks/useAuth';
import Constants from "../Utilities/Constants";

export default function MyLeaves() {

  const [absenceTypes, setAbsenceTypes] = useState({ isSuccess: false, result: [] });
  const [absences, setAbsences] = useState({ isSuccess: false, result: [] });
  const { auth } = useAuth();

  useEffect(() => {

    const url = `${Constants.API_URL_GET_ABSENCE_PERSONID}/${auth.id}`

    fetch(url)
    .then((response) => response.json())
    .then((personAbsences) => {
      console.log(personAbsences);
      setAbsences(personAbsences);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }, [auth.id]);

  function getAbsences(){
    const url = `${Constants.API_URL_GET_ABSENCE_PERSONID}/${auth.id}`

    fetch(url)
    .then((response) => response.json())
    .then((personAbsences) => {
      console.log(personAbsences);
      setAbsences(personAbsences);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  useEffect(() => {
    fetch(Constants.API_URL_GET_ABSENCETYPE_ALL)
    .then((response) => response.json())
    .then((absenceTypesFromServer) => {
      console.log(absenceTypesFromServer);
      setAbsenceTypes(absenceTypesFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }, []);

  
  function deleteAbsence(id){
    const url = `${Constants.API_URL_DELETE_ABSENCE}/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        getAbsences(); //Gets data from DB everytime we delete something (prob bad idk)
        renderShit();
      })
      .catch((error => {
        console.log(error);
        alert(error);
      }));
  }

  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex flex-column align-items-center justify-content-center min-vh-100">
          <Sidebar />
        </div>
        <div className="col d-flex flex-column align-items-center justify-content-center min-vh-100">
          {renderShit()}
        </div>
      </div>
    </div>
  )

  function renderShit(){
    return(
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
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody >
            {absences.result.map((absence) => (
                  <tr key={absence.id} >
                    <td>{absence.id}</td>
                    <td>{absenceTypes.result.find((x) => x.id === parseInt(absence.typeID)).typeName}</td>
                    <td>{absence.days}</td>
                    <td style={{ backgroundColor: new Date(absence.dayRequested) < (new Date().setDate(new Date().getDate() - 1)) ? 'lightblue' : 'inherit' }}>{new Date(absence.dayRequested).toLocaleDateString('sv-SE')}</td>
                    <td style={{ backgroundColor: new Date(absence.leaveStart) < (new Date().setDate(new Date().getDate() - 1)) ? 'lightblue' : 'inherit' }}>{new Date(absence.leaveStart).toLocaleDateString('sv-SE')}</td>
                    <td style={{ backgroundColor: new Date(absence.leaveEnd) < (new Date().setDate(new Date().getDate() - 1)) ? 'lightblue' : 'inherit' }}>{new Date(absence.leaveEnd).toLocaleDateString('sv-SE')}</td>
                    <td style={{ background: absence.pending ? 'pink' : 'lightgreen' }}>{absence.pending ? '[Awaiting]' : '[Answered]'}</td>
                    <td style={{ background: absence.approved ? 'lightgreen' : 'red' }}>{absence.approved ? '[Approved]' : '[Not approved]'}</td>
                    <td>
                      <button onClick={() => {if(window.confirm(`are you sure you want to delete this report?`)) deleteAbsence(absence.id)}} className="btn btn-danger btn-lg">Delete</button>
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}