import React, { useState } from "react";
import Constants from "../../Utilities/Constants";

export default function AddAbsenceType(props) {

    const [formData, setFormData] = useState({
        typeName: '',
        days: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const typetoAdd = {
            id: 0,
            typeName: formData.typeName,
            days: formData.days,
        };
        const url = Constants.API_URL_ADD_ABSENCETYPE;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(typetoAdd)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onTypeAdded(typetoAdd);
    }
    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Add new Type of Absence </h1>

            <div className="mt-5">
                <label className="h3 form-label">Type</label>
                <input value={formData.typeName} name="typeName" type="text" className="form-control" onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Days</label>
                <input value={formData.days} name="days" type="number" className="form-control" onChange={handleChange}></input>
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg mt-5">Save</button>
            <button onClick={() => props.onTypeAdded(null)} className="btn btn-secondary btn-lg mt-5">Cancel</button>
        </form>

    )
}