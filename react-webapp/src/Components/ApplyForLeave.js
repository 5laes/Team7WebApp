import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import 'bootstrap-icons/font/bootstrap-icons.css'
import Constants from '../Utilities/Constants';
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ApplyForLeave(props) {
  const [absenceTypes, setAbsenceTypes] = useState({ isSuccess: false, result: [] });
  const [personAbsences, setPersonAbsences] = useState({ isSuccess: false, result: [] });
  const { auth } = useAuth();
  const [daysRequested, setDaysRequested] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "typeID":1,
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

  useEffect(() => {

    const url = `${Constants.API_URL_GET_ABSENCE_PERSONID}/${auth.id}`

    fetch(url)
    .then((response) => response.json())
    .then((personAbsences) => {
      console.log(personAbsences);
      setPersonAbsences(personAbsences);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }, [auth.id]);

  useEffect(() => {
    absenceTypes.result.map((absenceType) => (
      personAbsences.result.map((personAbsence) => {
        if(absenceType.id === personAbsence.typeID){
          absenceType.days -= personAbsence.days
          setAbsenceTypes(absenceTypes);
        }
      })
    ))
  }, [absenceTypes, personAbsences])

  useEffect(() => {
    const startDate = new Date(formData.leaveStart);
    const endDate = new Date(formData.leaveEnd);

    const diffInTime = endDate.getTime() - startDate.getTime();

    const diffInDays = diffInTime / (1000 * 3600 * 24)

    setDaysRequested(diffInDays + 1)
  }, [formData.leaveStart, formData.leaveEnd])

  function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

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

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '-' + dd + '-' + yyyy;

  if(isDateBeforeToday(new Date(formData.leaveStart))){

    alert(`You can't select a start date (${formData.leaveStart}) older than current date (${today})`);
    return;
  }

  if(isDateBeforeToday(new Date(formData.leaveEnd))){
    alert(`You can't select a end date (${formData.leaveStart}) older than current date (${today})`);
    return;
  }

  if(daysRequested > selectedAbsenceType.days){
    alert(`ERROR: To many days requested (${daysRequested}). You can only request ${selectedAbsenceType.days} days for ${selectedAbsenceType.typeName}`);
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
        if(absenceFromServer.isSuccess){
          alert("Successfully sent request");
          navigate("/person", { replace: true });
        }
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
        <div className="col d-flex flex-column align-items-center justify-content-center min-vh-100">
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
                            {absenceTypes.typeName}, {" Max: "} {absenceTypes.days} {" Days"}
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

            <div className="mt-5">
              Days requested: {daysRequested}
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

