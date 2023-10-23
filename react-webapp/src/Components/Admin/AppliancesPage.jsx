import React, { useState } from "react";

export default function Appliances() {
  const [appliances, setAppliances] = useState([]);
  //const [persons, setPersons] = useState([]);
  const [showTable, setShowTable] = useState(false);
  //const [showAddForm, setShowAddForm] = useState(false);
  //const [currentUpdate, setCurrentUpdate] = useState(null);

  function getAppliances() {
    const url = "https://localhost:7139/api/Absence";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((absencefromServer) => {
        console.log(absencefromServer);
        setAppliances(absencefromServer);
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
      <button onClick={getAppliances} className="btn btn-light btn-lg">
        All Appliances
      </button>
    </div>
  );
}
