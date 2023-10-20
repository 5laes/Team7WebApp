import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import AdminPage from './Components/AdminPage'
import PersonPage from './Components/PersonPage'


export default function App() {
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
};
