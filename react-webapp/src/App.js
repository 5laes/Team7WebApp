import './App.css';
<<<<<<< HEAD
<<<<<<< HEAD
import AdminPage from './Components/Admin/AdminPage';
import React, { useState } from 'react';
import PersonPage from './Components/PersonPage';
=======
>>>>>>> c12be06 (auth added)
=======
>>>>>>> master
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import AdminPage from './Components/AdminPage'
import PersonPage from './Components/PersonPage'


export default function App() {
<<<<<<< HEAD
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()

  const handleSubmit = async e => {
    e.preventDefault();

    const url = `${Constants.API_URL_GET_PERSON_EMAIL}?email=${encodeURI(email)}`

    const response = await axios.get(
      url
    );

    if (response.data.result.password === password) {
      // set the state of the user
      setUser(response.data)

      localStorage.clear();
      // store the user in localStorage
      // sets token and object data of inlogged user
      localStorage.setItem(response.data.result.id, response.data)
      console.log(response.data)
    }
    else {
      alert("wrong password");
    }
  };

  // checks if the person who is logged in is an admin or not
  if (user) {
    if (user.result.isAdmin) {
      return <AdminPage />;
    }
    return <PersonPage />;
  }

  // if there's no user, show the login form
=======
>>>>>>> c12be06 (auth added)
=======
>>>>>>> master
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login/>} />

        {/*Cant fix rolebased auth because of how DB and backend is built*/}
        <Route element={<RequireAuth />}>
          <Route path="admin" element={<AdminPage/>} />
          <Route path="person" element={<PersonPage/>} />
        </Route>
      </Route>
    </Routes>
  );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
};

//function som visas när man trycker på knapp
// function StuffToDo() {
//   return (
//     <div>

//       <div>
//         <ul>
//           <li>Admin/Person page Get all = List of absence(raport) </li>
//           <ul>
//             <li>///Admin funcions edit/Delete) </li>
//             <li>///Person functions add/delete </li>
//           </ul>
//           <li>Admin page get all = list of absenceType </li>
//           <li>Admin page get all = list of persons</li>
//           <li>Admin page for = create Person </li>
//           <li>Admin/Person page for = getall list absent(raports) page</li>
//           <li>Admin page for = create-absenceType </li>
//         </ul>
//       </div>

//       <p>other stuff later...</p>
//       <div>
//         <ul>
//           <li>Personalen ska kunna se sin totala återstående ledighetstid för varje ledighetstyp.
//           </li>
//           <li>Personalen ska få en bekräftelse via e-post när deras ansökan har godkänts eller avslagits.
//           </li>
//           <li>Administratören ska kunna filtrera ansökningar efter status (godkänd, avslagen, väntande).
//           </li>
//           <li>Personalen ska kunna se alla sina tidigare ansökningar och deras status.
//           </li>
//           <li>Administratören ska kunna se en översikt över total använd ledighetstid för varje ledighetstyp.
//           </li>
//           <li>Systemet ska ha en funktion för att spara och exportera rapporter över använd ledighetstid för varje ledighetstyp under en viss tidsperiod.
//           </li>
//           <li>Appen ska vara online och publicerad på Azure.</li>
//           <li>Readme!</li>
//         </ul>
//       </div>
//     </div>


//   );

//-----------------------------------------

// const [showPersonPage, setShowPersonPage] = useState(false);
// const [showAdminPage, setShowAdminPage] = useState(false); //visar adminpage, false för den visar inte från start
// const [showSTD, setShowSTD] = useState(false);//visar function StuffToDo, false för den visar inte från start
// const [count, setCount] = useState(0);
// console.log(count);
// const handleClick = () => {
//   setCount(count + 1);
//   // setCount((tidVal)=>tidVal+1);//above would not work
//   // setCount((tidVal)=>tidVal+1);//saves SAME value
// }

// const toggleSTD = () => {
//   setShowSTD(!showSTD);          //togglefuntionerna. använder 'set' för att kontrollera värdet och sätter värdet till motsatsen.
//   if (!showSTD) {         // om 'show' så sätts showadmin till false för att INTE visa adminpage
//     setShowAdminPage(false);
//     setShowPersonPage(false);
//   }
// };

// const toggleAdminPage = () => {
//   setShowAdminPage(!showAdminPage);
//   if (!showAdminPage) {
//     setShowSTD(false);
//     setShowPersonPage(false);
//   }
// };


// const togglePersonPage = () => {
//   setShowPersonPage(!showPersonPage);
//   if (!showPersonPage) {
//     setShowSTD(false);
//     setShowAdminPage(false);
//   }
// };





// return (
//   <div className="App">
//     <header className="App-header">
//       <LoginPage />
//       {/* <Register /> */}

//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Start Page <br /><small>(for loggin in and eventual authentication/authorization)</small><br /> Some stuff to do</p>
//       <button onClick={toggleAdminPage}>AdminPage</button>         {/* Knappen för att visa/dölja AdminPage */}
//       <button onClick={togglePersonPage}>PersonPage</button>
//       <button onClick={toggleSTD}>Show Stuff To Do</button>

//       {showAdminPage && <AdminPage />} {/* Shows value of showAdminPage && component AdminPage*/}
//       {showPersonPage && <PersonPage />}
//       {showSTD && <StuffToDo />}


//       <p>{count}</p>
//       <button onClick={handleClick} >Counter</button>


//     </header>
//   </div>
// );


=======
};
>>>>>>> c12be06 (auth added)
=======
};
>>>>>>> 85835af (more fix, structure and start of AbsenceTypes)
=======
};
>>>>>>> master
