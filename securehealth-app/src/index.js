
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Pages/Admin/AdminDash';
import Login from './Pages/LoginPage/Login';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    <Admin/>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
