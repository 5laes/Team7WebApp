import React, { useState, useEffect } from "react";
import UpdateAppliance from "./UpdateAppliance";

export default function Appliances() {
  const [appliances, setAppliances] = useState([]);
  const [persons, setPersons] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentUpdate, setCurrentUpdate] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAppliances();
  }, []);

  function getAppliances() {
    const url = "https://localhost:7139/api/Absence";
    const url2 = "https://localhost:7139/api/Person";
    const url3 = "https://localhost:7139/api/AbsenceType";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((absencefromServer) => {
        console.log(absencefromServer);
        setAppliances(absencefromServer.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    fetch(url2, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((persfromServer) => {
        console.log(persfromServer);
        setPersons(persfromServer.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    fetch(url3, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((typefromServer) => {
        console.log(typefromServer);
        setTypes(typefromServer.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  function deleteAppliance(id) {
    const url = `https://localhost:7139/api/Absence/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onApplianceDeleted(id);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  function findPersonById(personID) {
    return persons.find((person) => person.id === personID);
  }
  function findTypeById(typeID) {
    return types.find((type) => type.id === typeID);
  }
  function formatDate(date) {
    return new Date(date).toLocaleString();
  }
  function filterAppliances(appliances) {
    if (filter === "all") {
      return appliances;
    } else if (filter === "pending") {
      return appliances.filter((appliance) => appliance.pending);
    } else if (filter === "approved") {
      return appliances.filter((appliance) => appliance.approved);
    } else if (filter === "notApproved") {
      return appliances.filter(
        (appliance) => !appliance.approved && !appliance.pending
      );
    }
  }
  function countAppliancesByFilter(filterName) {
    if (filterName === "all") {
      return appliances.length;
    }
    if (filterName === "pending") {
      return appliances.filter((appliance) => appliance.pending).length;
    }
    if (filterName === "approved") {
      return appliances.filter((appliance) => appliance.approved).length;
    }
    if (filterName === "notApproved") {
      return appliances.filter(
        (appliance) => !appliance.approved && !appliance.pending
      ).length;
    }
  }
  return (
    <div className="container">
      {currentUpdate === null && (
        <div>
          <button
            onClick={() => setFilter("all")}
            className="btn btn-light btn-lg"
          >
            All ({countAppliancesByFilter("all")})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className="btn btn-light btn-lg"
          >
            Pending ({countAppliancesByFilter("pending")})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className="btn btn-light btn-lg"
          >
            Approved ({countAppliancesByFilter("approved")})
          </button>
          <button
            onClick={() => setFilter("notApproved")}
            className="btn btn-light btn-lg"
          >
            Denied ({countAppliancesByFilter("notApproved")})
          </button>
        </div>
      )}
      {currentUpdate === null && renderTable()}
      {currentUpdate !== null && (
        <UpdateAppliance
          appliance={currentUpdate}
          onApplianceUpdated={onApplianceUpdated}
        />
      )}
    </div>
  );
  function renderTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              {/* <th>Appliance ID</th>
              <th>Person ID</th> */}
              <th scope="col">Employee</th>
              <th scope="col">Type of Absence</th>
              <th scope="col">Day of Request</th>
              <th scope="col">Pending</th>
              <th scope="col">Days</th>
              <th scope="col">Leave start</th>
              <th scope="col">Leave end</th>
              <th scope="col">Approved</th>
            </tr>
          </thead>
          <tbody>
            {filterAppliances(appliances).map((appliance) => (
              <tr key={appliance.id}>
                {/* <td>{appliance.id}</td>
                <td>{appliance.personID}</td> */}
                <td>
                  {findPersonById(appliance.personID)
                    ? findPersonById(appliance.personID).name
                    : "Person not found"}
                </td>
                <td>
                  {findTypeById(appliance.typeID)
                    ? findTypeById(appliance.typeID).typeName
                    : "type of absence not found"}
                </td>
                <td>{formatDate(appliance.dayRequested)}</td>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: "25px", height: "20px" }}
                    checked={appliance.pending}
                    readOnly
                  />
                </td>
                <td>{appliance.days}</td>
                <td>{formatDate(appliance.leaveStart)}</td>
                <td>{formatDate(appliance.leaveEnd)}</td>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: "25px", height: "20px" }}
                    checked={appliance.approved}
                    readOnly
                  />
                </td>
                <td>
                  <button
                    onClick={() => setCurrentUpdate(appliance)}
                    className="btn btn-secondary btn-lg"
                  >
                    Handle appliance
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete this appliance?`
                        )
                      )
                        deleteAppliance(appliance.id);
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
  function onApplianceUpdated(updatedAppliance) {
    setCurrentUpdate(null);

    if (updatedAppliance === null) {
      return;
    }
    let appsCopy = [...appliances];

    const index = appsCopy.findIndex((appsCopyapp) => {
      if (appsCopyapp.id === updatedAppliance.id) {
        return true;
      }
    });
    if (index !== -1) {
      appsCopy[index] = updatedAppliance;
    }

    setAppliances(appsCopy);

    alert(`Appliance  is updated.`);

    {
      getAppliances();
    }
  }
  function onApplianceDeleted(deletedAppl) {
    let appsCopy = [...appliances];

    const index = appsCopy.findIndex((appsCopyapp) => {
      if (appsCopyapp.id === deletedAppl.id) {
        return true;
      }
    });

    if (index !== -1) {
      appsCopy.splice(index, 1);
    }

    setAppliances(appsCopy);

    alert("Appliance deleted");
    {
      getAppliances();
    }
  }
}
