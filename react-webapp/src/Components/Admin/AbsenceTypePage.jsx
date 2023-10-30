import React, { useState } from "react";
import AddAbsenceType from "./AddAbsenceType";
import UpdateAbsenceType from "./UpdateAbsenceType";
import { Link } from "react-router-dom";

export default function AbsenceType() {
  const [types, setTypes] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(null);

  function getTypes() {
    const url = "https://localhost:7139/api/AbsenceType";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((typefromServer) => {
        console.log(typefromServer);
        setTypes(typefromServer);
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
  function deleteType(id) {
    const url = `https://localhost:7139/api/AbsenceType/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onTypeDeleted(id);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  function ButtonToTable() {
    return (
      <Link to="/absencereports">
        <button className="btn btn-light btn-lg">Reports</button>
      </Link>
    );
  }
  return (
    <div className="container">
      {showAddForm === false && currentUpdate === null && (
        <div>
          <button onClick={getTypes} className="btn btn-light btn-lg">
            All Types of Absences
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-light btn-lg"
          >
            Add new Type of Absence
          </button>
          {ButtonToTable()}
        </div>
      )}
      {showTable &&
        showAddForm === false &&
        currentUpdate === null &&
        renderTypetable()}
      {showAddForm && <AddAbsenceType onTypeAdded={onTypeAdded} />}
      {currentUpdate !== null && (
        <UpdateAbsenceType type={currentUpdate} onTypeUpdated={onTypeUpdated} />
      )}
    </div>
  );
  function renderTypetable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Type</th>
              <th scope="col">number of days</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {types.result.map((type) => (
              <tr key={type.id}>
                <th scope="row">{type.id}</th>
                <td>{type.typeName}</td>
                <td>{type.days}</td>
                <td>
                  <button
                    onClick={() => setCurrentUpdate(type)}
                    className="btn btn-secondary btn-lg"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${type.typeName}"?`
                        )
                      )
                        deleteType(type.id);
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
        <button onClick={handleBackclick} className="btn btn-light btn-lg">
          Cancel
        </button>
      </div>
    );
  }
  function onTypeAdded(addedType) {
    setShowAddForm(false);

    if (addedType === null) {
      return;
    }
    alert(`New Type of Absence was added`);
    setShowTable(false);
  }
  function onTypeUpdated(updatedType) {
    setCurrentUpdate(null);

    if (updatedType === null) {
      return;
    }
    let typesCopy = [...types.result];

    const index = typesCopy.findIndex((typesCopyType) => {
      if (typesCopyType.id === updatedType.id) {
        return true;
      }
    });
    if (index !== -1) {
      typesCopy[index] = updatedType;
    }

    setTypes(typesCopy);

    alert(`"${updatedType.typeName}" is updated.`);
    setShowTable(false);
  }
  function onTypeDeleted(deletedType) {
    let typesCopy = [...types.result];

    const index = typesCopy.findIndex((typesCopyType) => {
      if (typesCopyType.id === deletedType.id) {
        return true;
      }
    });

    if (index !== -1) {
      typesCopy.splice(index, 1);
    }

    setTypes(typesCopy);

    alert("Type deleted");

    setShowTable(false);
  }
}
