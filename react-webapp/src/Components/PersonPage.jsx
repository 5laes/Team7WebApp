import React, { useState } from "react";
import '../App.css';

export default function PersonPage(props) {
  const { user } = props; // Hämta användardata från props

const [absences, setAbsences] = useState([]);
const [showTable, setShowTable] = useState(false);


    function getAbsences() {
      const url = `https://localhost:7139/api/Absence/PersonID/${localStorage.key(0)}`;  
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((absencesfromServer) => {
          console.log(absencesfromServer);
          setAbsences(absencesfromServer);
          setShowTable(true);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
    function handleBackclick() {
      setShowTable(false);
    }
    return (
      <div className="container mt-3">
        <button onClick={getAbsences} className="btn btn-success btn-lg">
          Absence-raports
        </button>
        <p>Hej PERSON Med id:     {localStorage.key(0)}     </p>
        {showTable && renderAbsencestable()}
        {showTable && (
          <button onClick={handleBackclick} className="btn btn-success btn-lg">
            Back
          </button>
        )}
      </div>
    );

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
</td>                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
