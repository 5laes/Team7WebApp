import React, { useState } from "react";
import useAuth from '../Hooks/useAuth';
import { useLocation, Navigate } from 'react-router-dom';

export default function AbsenceCreateForm() {
    const [formData, setFormData] = useState({
        typeID: "",
        days: "",
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
            formData.days === "" ||
            formData.leaveStart === "") {
            alert('You must enter all fields.')
            e.preventDefault();
            return;
        }

        const absenceToCreate = {
            id: 0,
            typeID: formData.typeID,
            days: formData.days,
            dayRequested: Date.now(),
            personID: personID,
            pending: true,
            approved: false,
            leaveStart: formData.leaveStart,
            leaveEnd: (function () {
                const newLeaveEnd = new Date(formData.leaveStart);
                const days = parseInt(formData.days, 10); // Konvertera till ett heltal med bas 10

                if (!isNaN(days)) {
                    newLeaveEnd.setDate(newLeaveEnd.getDate() + days);
                }
                return newLeaveEnd;
            })(),
        };

        const urlToCreate = `https://localhost:7139/api/Absence`;

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
                    <label className="h3 form-label">Amount of days requested</label>
                    <input
                        value={formData.days}
                        name="days"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                    />
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

                <button onClick={handleSubmit} className="btn btn-success btn-lg  mt-2">
                    Add
                </button>
            </form>
        </div>
    );
}
