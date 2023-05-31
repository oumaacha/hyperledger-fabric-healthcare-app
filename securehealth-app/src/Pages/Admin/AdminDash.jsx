import { Space } from "antd";
import "../../App.css";
import AppHeader from "../../Components/Admin/AppHeader"
import PageContent from "../../Components/Admin/PageContent";
import SideMenu from "../../Components/Admin/SideMenu/";

function App() {
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
export default App;
