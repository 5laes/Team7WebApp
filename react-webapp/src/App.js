import logo from './logo.svg';
import './App.css';
import AdminPage from './Components/AdminPage';
import React, { useState } from 'react';
import PersonPage from './Components/PersonPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginPage } from './Components/LoginPage';
import { Register } from './Components/Register';

export default function App() {
  const [showPersonPage, setShowPersonPage] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false); //visar adminpage, false för den visar inte från start
  const [showSTD, setShowSTD] = useState(false);//visar function StuffToDo, false för den visar inte från start
  const [count, setCount] = useState(0);
  console.log(count);
  const handleClick = () => {
    setCount(count + 1);
    // setCount((tidVal)=>tidVal+1);//above would not work
    // setCount((tidVal)=>tidVal+1);//saves SAME value
  }

  const toggleSTD = () => {
    setShowSTD(!showSTD);          //togglefuntionerna. använder 'set' för att kontrollera värdet och sätter värdet till motsatsen.
    if (!showSTD) {         // om 'show' så sätts showadmin till false för att INTE visa adminpage
      setShowAdminPage(false);
      setShowPersonPage(false);
    }
  };

  const toggleAdminPage = () => {
    setShowAdminPage(!showAdminPage);
    if (!showAdminPage) {
      setShowSTD(false);
      setShowPersonPage(false);
    }
  };


  const togglePersonPage = () => {
    setShowPersonPage(!showPersonPage);
    if (!showPersonPage) {
      setShowSTD(false);
      setShowAdminPage(false);
    }
  };





  return (
    <div className="App">
      <header className="App-header">
        <LoginPage />
        {/* <Register /> */}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Start Page <br /><small>(for loggin in and eventual authentication/authorization)</small><br /> Some stuff to do</p>
        <button onClick={toggleAdminPage}>AdminPage</button>         {/* Knappen för att visa/dölja AdminPage */}
        <button onClick={togglePersonPage}>PersonPage</button>
        <button onClick={toggleSTD}>Show Stuff To Do</button>

        {showAdminPage && <AdminPage />} {/* Shows value of showAdminPage && component AdminPage*/}
        {showPersonPage && <PersonPage />}
        {showSTD && <StuffToDo />}


        <p>{count}</p>
        <button onClick={handleClick} >Counter</button>


      </header>
    </div>
  );
};

//function som visas när man trycker på knapp 
function StuffToDo() {
  return (
    <div>

      <div>
        <ul>
          <li>Admin/Person page Get all = List of absence(raport) </li>
          <ul>
            <li>///Admin funcions edit/Delete) </li>
            <li>///Person functions add/delete </li>
          </ul>
          <li>Admin page get all = list of absenceType </li>
          <li>Admin page get all = list of persons</li>
          <li>Admin page for = create Person </li>
          <li>Admin/Person page for = getall list absent(raports) page</li>
          <li>Admin page for = create-absenceType </li>
        </ul>
      </div>

      <p>other stuff later...</p>
      <div>
        <ul>
          <li>Personalen ska kunna se sin totala återstående ledighetstid för varje ledighetstyp.
          </li>
          <li>Personalen ska få en bekräftelse via e-post när deras ansökan har godkänts eller avslagits.
          </li>
          <li>Administratören ska kunna filtrera ansökningar efter status (godkänd, avslagen, väntande).
          </li>
          <li>Personalen ska kunna se alla sina tidigare ansökningar och deras status.
          </li>
          <li>Administratören ska kunna se en översikt över total använd ledighetstid för varje ledighetstyp.
          </li>
          <li>Systemet ska ha en funktion för att spara och exportera rapporter över använd ledighetstid för varje ledighetstyp under en viss tidsperiod.
          </li>
          <li>Appen ska vara online och publicerad på Azure.</li>
          <li>Readme!</li>
        </ul>
      </div>
    </div>


  );
}

