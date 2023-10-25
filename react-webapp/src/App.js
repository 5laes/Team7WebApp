import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import AdminPage from './Components/Admin/AdminPage'
import EmployeePage from './Components/Admin/EmployeePage';
import AbsenceTypePage from './Components/Admin/AbsenceTypePage'
import AppliancesPage from './Components/Admin/AppliancesPage';
import Default from './Components/default';
import PersonPage from './Components/PersonPage';
import ApplyForLeave from './Components/ApplyForLeave';
import MyLeaves from './Components/MyLeaves';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />

        {/*Cant fix rolebased auth because of how DB and backend is built*/}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Default/>} />
          <Route path="employees" element={<EmployeePage/>} />
          <Route path="absencetype" element={<AbsenceTypePage/>} />
          <Route path="appliances" element={<AppliancesPage/>} />
          <Route path="admin" element={<AdminPage/>} />
          <Route path="person" element={<PersonPage/>} />
          <Route path="applyForLeave" element ={<ApplyForLeave/>} />
          <Route path="myLeaves" element={<MyLeaves/>}/>
        </Route>
      </Route>
    </Routes>
  );
};
