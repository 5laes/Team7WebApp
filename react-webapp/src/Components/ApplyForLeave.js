import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import 'bootstrap-icons/font/bootstrap-icons.css'
import Constants from '../Utilities/Constants';
import useAuth from "../Hooks/useAuth";

export default function ApplyForLeave(props) {
  const [absenceTypes, setAbsenceTypes] = useState({ isSuccess: false, result: [] });
  const [selectedAbsenceType, setSelectedAbsenceType] = useState('');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    "typeID": 1, // Initialize typeID as an empty string
    "personID": 0,
    "leaveStart": '',
    "leaveEnd": '',
  });

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('formData.typeID:', formData.typeID);
  console.log('absenceTypes.result:', absenceTypes.result);

  const selectedAbsenceType = absenceTypes.result.find(
    (absenceType) => absenceType.id === parseInt(formData.typeID)
  );

  console.log('selectedAbsenceType:', selectedAbsenceType);

  if (!selectedAbsenceType) {
    console.error("Selected absence type not found");
    return;
  }


    const absenceToAdd = {
      "id": 0,
      "typeID": selectedAbsenceType.id,
      "personID": auth.id, // fixed person id
      "leaveStart": formData.leaveStart,
      "leaveEnd": formData.leaveEnd,
    };

    const url = Constants.API_URL_ADD_ABSENCE;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(absenceToAdd),
    })
      .then((response) => response.json())
      .then((absenceFromServer) => {
        console.log(absenceFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100">
          <Sidebar />
        </div>
        <div className="col d-flex flex-column align-items-center justify-content-center min-vh-100">
          <div>
            <h3>Apply for leave</h3>
            <div>
              {absenceTypes.isSuccess ? (
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label>
                      Leave Type:
                      <select
                       value={formData.typeID}
                       className="form-control"
                       onChange={(e) => {
                         const selectedType = parseInt(e.target.value);
                         setFormData({ ...formData, typeID: selectedType });
                       }}
                      >
                        {absenceTypes.result.map((absenceTypes) => (
                          <option key={absenceTypes.id} value={absenceTypes.id}>
                            {absenceTypes.typeName}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div>
            <div className="mt-5">
                <label className="h3 form-label">Leave Start day:</label>
                <input value={formData.leaveStart} name="leaveStart" type="date"  onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Leave End day:</label>
                <input value={formData.leaveEnd} name="leaveEnd" type="date"  onChange={handleChange}></input>
            </div>

            <button onClick={handleFormSubmit} className="btn btn-dark btn-lg mt-5">Apply!</button>
            
            </div>
                </form>
              ) : (
                <p>Loading absence types...</p>
              )}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

