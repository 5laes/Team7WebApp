import React, { useState } from "react";
import useAuth from '../Hooks/useAuth';
import { useLocation, Navigate } from 'react-router-dom';
import Constants from "../Utilities/Constants";

export default function AbsenceCreateForm() {
    const [formData, setFormData] = useState({
        typeID: "",
        leaveEnd: "",
        leaveStart: "",
    });

    const { auth } = useAuth();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        const personID = auth.id;

        if (formData.typeID === "" ||
            formData.leaveEnd === "" ||
            formData.leaveStart === "") {
            alert('You must enter all fields.')
            e.preventDefault();
            return;
        }
        var today = new Date();
        var leaveStart = new Date(formData.leaveStart);
        var leaveEnd = new Date(formData.leaveEnd);

        if (leaveStart < today || leaveEnd < today) {
            alert('You must enter dates past this day. Please choose a valid date.');
            e.preventDefault();
            return;
        }
        if (leaveEnd < leaveStart) {
            alert('You erroneously entered a leave-date before a start-date.');
            e.preventDefault();
            return;
        }

        const absenceToCreate = {
            typeID: formData.typeID,
            personID: personID,
            leaveStart: formData.leaveStart,
            leaveEnd: formData.leaveEnd,
        };

        const urlToCreate = Constants.API_URL_ADD_ABSENCE;

        fetch(urlToCreate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(absenceToCreate),
        })
            .then((response) => response.json())
            .then((responseFromServer) => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })


        // return <Navigate to="/person" />
    };

    return (
        <div className="table-responsive">
            <form className="w-100 px-5">
                <div className="mt-2">
                    <label className="h3 form-label">Type of absence</label>
                    <div>
                        <label>Vacation</label>
                        <input
                            type="radio"
                            name="typeID"
                            value="1"
                            checked={formData.typeID === "1"}
                            onChange={handleChange}
                        /><br />
                        <label>Vabb</label>
                        <input
                            type="radio"
                            name="typeID"
                            value="2"
                            checked={formData.typeID === "2"}
                            onChange={handleChange}
                        /><br />
                        <label>Sick</label>
                        <input
                            type="radio"
                            name="typeID"
                            value="3"
                            checked={formData.typeID === "3"}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div className="mt-2">
                    <label className="h3 form-label">Start of leave-date</label>
                    <input
                        value={formData.leaveStart}
                        name="leaveStart"
                        type="date"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-2">
                    <label className="h3 form-label">End of leave-date</label>
                    <input
                        value={formData.leaveEnd}
                        name="leaveEnd"
                        type="date"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <button onClick={handleSubmit} className="btn btn-success btn-lg  mt-2">
                    Add
                </button>
            </form>
        </div>
    );
}
