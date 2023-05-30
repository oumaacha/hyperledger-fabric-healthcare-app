import Login from "./Pages/LoginPage/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
