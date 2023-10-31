import React, { useState } from "react";
import Constants from "../../Utilities/Constants";

export default function UpdateEmployee(props) {
    const initialFormData = Object.freeze({
        name: props.person.name,
        password: props.person.password,
        isAdmin: props.person.isAdmin,
        email: props.person.email,
        age: props.person.age,
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

        const emptoUpdate = {
            id: props.person.id,
            name: formData.name,
            password: formData.password,
            isAdmin: formData.isAdmin,
            email: formData.email,
            age: formData.age,
        };
        const url = Constants.API_URL_UPDATE_PERSON;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emptoUpdate),
        })
            .then((response) => response.json())
            .then((responseFromServer) => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onEmpUpdated(emptoUpdate);
    };
    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Update Employee</h1>

            <div className="mt-5">
                <label className="h3 form-label">Name</label>
                <input value={formData.name} name="name" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Password</label>
                <input value={formData.password} name="password" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Email</label>
                <input value={formData.email} name="email" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Admin</label>
                <input
                    checked={formData.isAdmin}
                    name="isAdmin"
                    type="checkbox"
                    style={{ width: "35px", height: "25px" }}
                    className="form-checkbox"
                    onChange={(e) => {
                        setFormData({
                            ...formData, isAdmin: e.target.checked,
                        });
                    }}
                />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Age</label>
                <input value={formData.age} name="age" type="text" className="form-control" onChange={handleChange} />
            </div>



            <button onClick={handleSubmit} className="btn btn-dark btn-lg mt-5">Save</button>
            <button onClick={() => props.onEmpUpdated(null)} className="btn btn-secondary btn-lg mt-5">Cancel</button>
        </form>
    );
}
