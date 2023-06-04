import { Space } from "antd";
import "../../App.css";
import AppHeader from "../../Components/Patient/AppHeader";
import PageContent from "../../Components/Patient/PageContent";
import SideMenu from "../../Components/Patient/SideMenu";

function PatientDash() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu/>
        <PageContent/>
      </div>
    </div>
  );
}
export default PatientDash;
