import React, { useState, useEffect } from "react";
import Constants from "../../Utilities/Constants";

export default function AbsenceReports() {

  const [types, setTypes] = useState([]);
  const [usedDays, setUsedDays] = useState([]);

  useEffect(() => {
    getDays();
  }, []);

  function getDays() {

    const url = Constants.API_URL_GET_ABSENCETYPE_ALL;
    const url2 = Constants.API_URL_GET_ABSENCE_ALL;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((typefromServer) => {
        console.log(typefromServer);
        setTypes(typefromServer.result);
        
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    fetch(url2, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((daysfromServer) => {
        console.log(daysfromServer);
        setUsedDays(daysfromServer.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  const typeTotals = {};

  usedDays.forEach((type) => {
    const typeID = type.typeID;
    const days = type.days;
    if (typeTotals[typeID]) {
      typeTotals[typeID] += days;
    } else {
      typeTotals[typeID] = days;
    }
  });
  //console.table(typeTotals);

  return (
    <div className="container">
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Type of Absence</th>
              <th scope="col">Total nr of Used days</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>                
                <td>{type.typeName}</td>
                <td>{typeTotals[type.id]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}