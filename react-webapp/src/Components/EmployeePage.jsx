import React, { useState } from "react";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

export default function EmployeePage() {
  const [persons, setPersons] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(null);

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
  function deleteEmployee(id) {
    const url = `https://localhost:7139/api/Person/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onEmployeeDeleted(id);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  return (
    <div className="container">
      {showAddForm === false && currentUpdate === null && (
        <div>
          <button onClick={getPersons} className="btn btn-light btn-lg">
            All Employees
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-light btn-lg"
          >
            Add new Employee
          </button>
        </div>
      )}
      {showTable &&
        showAddForm === false &&
        currentUpdate === null &&
        renderPersonstable()}
      {showAddForm && <AddEmployee onEmployeeAdded={onEmployeeAdded} />}
      {currentUpdate !== null && (
        <UpdateEmployee person={currentUpdate} onEmpUpdated={onEmpUpdated} />
      )}
      {showTable && (
        <button onClick={handleBackclick} className="btn btn-light btn-lg">
          Back
        </button>
      )}
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
              <th scope="col"></th>
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
                <td>
                  <button
                    onClick={() => setCurrentUpdate(person)}
                    className="btn btn-success btn-lg"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${person.name}"?`
                        )
                      )
                        deleteEmployee(person.id);
                    }}
                    className="btn btn-dark btn-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  function onEmployeeAdded(addedEmp) {
    setShowAddForm(false);

    if (addedEmp === null) {
      return;
    }
    alert(`Employee was added`);
    setShowTable(false);
  }

  function onEmpUpdated(updatedEmp) {
    setCurrentUpdate(null);

    if (updatedEmp === null) {
      return;
    }
    let empsCopy = [...persons.result];

    const index = empsCopy.findIndex((empsCopyEmp) => {
      if (empsCopyEmp.id === updatedEmp.id) {
        return true;
      }
    });
    if (index !== -1) {
      empsCopy[index] = updatedEmp;
    }

    setPersons(empsCopy);

    alert(`"${updatedEmp.name}" is updated.`);
    setShowTable(false);
  }
  function onEmployeeDeleted(deletedEmp) {
    let empsCopy = [...persons.result];

    const index = empsCopy.findIndex((empsCopyEmp) => {
      if (empsCopyEmp.id === deletedEmp.id) {
        return true;
      }
    });

    if (index !== -1) {
      empsCopy.splice(index, 1);
    }

    setPersons(empsCopy);

    alert("Employee deleted");

    setShowTable(false);
  }
}
