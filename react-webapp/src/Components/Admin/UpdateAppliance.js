import React, { useState } from "react";

export default function UpdateAppliance(props) {

    const initialFormData = Object.freeze({
        pending: props.appliance.pending,
        approved: props.appliance.approved,
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

        const applianceToUpdate = {
            id: props.appliance.id,
            pending: formData.pending,
            approved: formData.approved,
        };
        const url = "https://localhost:7139/api/Absence";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applianceToUpdate),
        })
            .then((response) => response.json())
            .then((responseFromServer) => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onApplianceUpdated(applianceToUpdate);
    };
    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Approve/Deny appliance</h1>
            {/* <div className="mt-5">
                <label className="h3 form-label">Name</label>
                <input value={formData.name} name="name" type="text" className="form-control" onChange={handleChange} />
            </div> */}
            <div className="mt-5">
                <label className="h3 form-label">Pending</label>
                <input
                    checked={formData.pending}
                    name="pending"
                    type="checkbox"
                    style={{ width: "35px", height: "25px" }}
                    className="form-checkbox"
                    onChange={(e) => {
                        setFormData({
                            ...formData, pending: e.target.checked,
                        });
                    }}
                />
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Approved</label>
                <input
                    checked={formData.approved}
                    name="approved"
                    type="checkbox"
                    style={{ width: "35px", height: "25px" }}
                    className="form-checkbox"
                    onChange={(e) => {
                        setFormData({
                            ...formData, approved: e.target.checked,
                        });
                    }}
                />
            </div>
            <button onClick={handleSubmit} className="btn btn-dark btn-lg mt-5">Save</button>
            <button onClick={() => props.onApplianceUpdated(null)} className="btn btn-secondary btn-lg mt-5">Cancel</button>
        </form>
    );
}
