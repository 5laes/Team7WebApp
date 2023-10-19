import React, { useState } from "react";

export default function AddEmployee(props) {

    const [formData, setFormData] = useState({
        name: '',
        password: '',

        email: '',
        age: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const emptoAdd = {
            id: 0,
            name: formData.name,
            password: formData.password,

            email: formData.email,
            age: formData.age,
        };
        const url = 'https://localhost:7139/api/Person';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emptoAdd)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onEmployeeAdded(emptoAdd);
    }
    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Add new Employee </h1>

            <div className="mt-5">
                <label className="h3 form-label">Name</label>
                <input value={formData.name} name="name" type="text" className="form-control" onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Password</label>
                <input value={formData.password} name="password" type="text" className="form-control" onChange={handleChange}></input>
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Email</label>
                <input value={formData.email} name="email" type="text" className="form-control" onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Age</label>
                <input value={formData.age} name="age" type="text" className="form-control" onChange={handleChange}></input>
            </div>



            <button onClick={handleSubmit} className="btn btn-dark btn-lg mt-5">Save</button>
            <button onClick={() => props.onEmployeeAdded(null)} className="btn btn-secondary btn-lg mt-5">Cancel</button>
        </form>

    )
}
