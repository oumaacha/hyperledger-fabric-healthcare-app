import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Pages/Admin/AdminDash';
import Patient from './Pages/Patient/PatientDash'
import Doctor from './Pages/Doctor/DoctorDash'
import Login from './Pages/LoginPage/Login';
import AppRoutesAdmin from "./Components/Admin/AppRoutes";
import AppRoutesPatient from "./Components/Patient/AppRoutes"
import AppRoutesDoctor from "./Components/Doctor/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />}>
            <Route index element={<AppRoutesAdmin />} />
        </Route>
        <Route path="/patient/*" element={<Patient />}>
            <Route index element={<AppRoutesPatient />} />
        </Route>
        <Route path="/doctor/*" element={<Doctor />}>
            <Route index element={<AppRoutesDoctor />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App
