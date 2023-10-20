import React, { useState } from "react";



export default function AbsenceCreateForm() {

    const [formData, setFormData] = useState("");

    const handleChange = (e) => {
        //e => eventObject
        setFormData({
            //to the value the user entered
            ...formData,
            [e.target.name]: e.target.value, //name is the name for the properties below! ex name ="title"
            //the element will be set to the value entered
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault(); //will prevent default actions happening
        //handling form submission here
        const absenceToCreate = {
            id: 0,
            typeID: formData.typeID,
            days: formData.days,
            dayRequested: Date.now,
            personID: formData.personID, ///den som sökers id!
            pending: true,
            approved: false,
            leaveStart: formData.leaveStart,
            leaveEnd: (function () {
                const newLeaveEnd = new Date(formData.leaveStart);
                const days = formData.days;
                newLeaveEnd.setDate(newLeaveEnd.getDate() - days);
                return newLeaveEnd;
            })(), //IIFE
        };

        const urlToCreate = `https://localhost:7139/api/Absence`;

        fetch(urlToCreate, {
            method: "POST", //http post request till server
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(absenceToCreate), //converts to json
        })
            .then((response) => response.json())
            .then((responseFromServer) => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        // props.onBookCreated(bookToCreate);
    };


    return (
        <div className="table-responsive ">
            <form className="w-100 px-5">

                <div className="mt-3">
                    <label className="h3 form-label">Type of absence	</label>
                    <div>
                        <label>Vacation</label><input
                            type="radio" name="typeID"
                            value="1"
                            checked={formData.typeID}
                            onChange={handleChange}
                        /><br />
                        <label>Vabb</label> <input
                            type="radio" name="typeID"
                            value="2"
                            checked={formData.typeID}
                            onChange={handleChange}
                        /><br />
                        <label>Sick</label> <input
                            type="radio" name="typeID"
                            value="3"
                            checked={formData.typeID}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="h3 form-label">Amount of days requested	</label>
                    <input
                        value={formData.days}
                        name="days"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-3">
                    <label className="h3 form-label">Start of leave-date	</label>
                    <input
                        value={formData.leaveStart}
                        name="leaveStart"
                        type="date"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                {/* {showCreate && (<> */}

                <button onClick={handleSubmit} className="btn btn-primary btn-lg w-100  mt-2">
                    Add
                </button>
                {/* </> */}
                {/* )} */}
            </form>
        </div>
    )
}
