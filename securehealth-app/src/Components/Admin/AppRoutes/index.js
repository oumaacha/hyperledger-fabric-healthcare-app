import { Route, Routes } from "react-router-dom";
import AdminData from "../../../Pages/Admin/AdminData/AdminData";
import AdminPatients from "../../../Pages/Admin/AdminPatients/AdminPatients";
import AdminDoctors from "../../../Pages/Admin/AdminDoctors/AdminDoctors";
import AdminNewPatient from "../../../Pages/Admin/AdminNewPatient/AdminNewPatient";
import AdminNewDoctor from "../../../Pages/Admin/AdminNewDoctor/AdminNewDoctor";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin-data" element={<AdminData/>}></Route>
      <Route path="/admin-patients" element={<AdminPatients />}></Route>
      <Route path="/admin-doctors" element={<AdminDoctors />}></Route>
      <Route path="/admin-new-patient" element={<AdminNewPatient />}></Route>
      <Route path="/admin-new-doctor" element={<AdminNewDoctor/>}></Route>
    </Routes>
  );
}
export default AppRoutes;
