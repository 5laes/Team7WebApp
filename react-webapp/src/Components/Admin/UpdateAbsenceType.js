import React, { useState } from "react";
import Constants from "../../Utilities/Constants";

export default function UpdateAbsenceType(props) {
    const initialFormData = Object.freeze({
        typeName: props.type.typeName,
        days: props.type.days,
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const typetoUpdate = {
            id: props.type.id,
            typeName: formData.typeName,
            days: formData.days,

        };
        const url = Constants.API_URL_UPDATE_ABSENCETYPE;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(typetoUpdate),
        })
            .then((response) => response.json())
            .then((responseFromServer) => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onTypeUpdated(typetoUpdate);
    };
    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Update Type of Absence</h1>

            <div className="mt-5">
                <label className="h3 form-label">Type of Absence</label>
                <input value={formData.typeName} name="typeName" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Days</label>
                <input value={formData.days} name="days" type="number" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg mt-5">Save</button>
            <button onClick={() => props.onTypeUpdated(null)} className="btn btn-secondary btn-lg mt-5">Cancel</button>
        </form>
    );
}