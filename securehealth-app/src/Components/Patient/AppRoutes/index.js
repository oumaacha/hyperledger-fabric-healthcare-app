import { Route, Routes } from "react-router-dom";



import PatientData from "../../../Pages/Patient/PatientsData/PatientData";
import PatientsDoctors from "../../../Pages/Patient/PatientsDoctors/PatientDoctor"
import PatientsDoctorAccess from "../../../Pages/Patient/PatientsDoctorAccess/PatientDoctorAccess"


function AppRoutes() {
  return (
    <Routes>
      <Route path="/patient-data" element={<PatientData/>}></Route>
      <Route path="/patient-doctors" element={<PatientsDoctors />}></Route>
      <Route path="/patient-doctor-acces" element={<PatientsDoctorAccess />}></Route>

    </Routes>
  );
}
export default AppRoutes;
