import { Space } from "antd";
import "../../App.css";
import AppHeader from "../../Components/Doctor/AppHeader";
import PageContent from "../../Components/Doctor/PageContent";
import SideMenu from "../../Components/Doctor/SideMenu";

function DoctortDash() {
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
export default DoctortDash;
