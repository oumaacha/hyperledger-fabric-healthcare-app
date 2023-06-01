import { Route, Routes } from "react-router-dom";



import DoctorsData from "../../../Pages/Doctor/DoctorsData/DoctorsData";
import DoctorsPatients from "../../../Pages/Doctor/DoctorsPatients/DoctorsPatients"



function AppRoutes() {
  return (
    <Routes>
      <Route path="/doctor-data" element={<DoctorsData/>}></Route>
      <Route path="/doctor-patients" element={<DoctorsPatients />}></Route>

    </Routes>
  );
}
export default AppRoutes;
