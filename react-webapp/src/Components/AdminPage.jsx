import React, { useState } from "react";

export default function AdminPage() {
  const [persons, setPersons] = useState([]);
  const [showTable, setShowTable] = useState(false);

  function getPersons() {
    const url = "https://localhost:7139/api/Person";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((persfromServer) => {
        console.log(persfromServer);
        setPersons(persfromServer);
        setShowTable(true);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  function handleBackclick() {
    setShowTable(false);
  }

  return (
    <div className="container">
      <button onClick={getPersons} className="btn btn-light btn-lg">
        Employees
      </button>
      {showTable && renderPersonstable()}
      {showTable && <button onClick={handleBackclick} className="btn btn-light btn-lg">Back</button>}
    </div>
  );

  function renderPersonstable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Password</th>
              <th scope="col">Admin</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            {persons.result.map((person) => (
              <tr key={person.id}>
                <th scope="row">{person.id}</th>
                <td>{person.name}</td>
                <td>{person.password}</td>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: "25px", height: "20px" }}
                    checked={person.isAdmin}
                    readOnly
                  />
                </td>
                <td>{person.email}</td>
                <td>{person.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
