import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Pages/Admin/AdminDash';
import Login from './Pages/LoginPage/Login';
import AppRoutes from "./Components/Admin/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />}>
            <Route index element={<AppRoutes />} />
                </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App
