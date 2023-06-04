import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  DatabaseOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  UserAddOutlined

} from "@ant-design/icons";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/patient-data");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Patient Data",
      icon: <DatabaseOutlined />,
      key: "/patient/patient-data",
    },
    {
      label: "Doctors",
      key: "/patient/patient-doctors",
      icon: <UserOutlined />,
    },
    {
      label: "Doctors Acces Control",
      key: "/patient/patient-doctor-acces",
      icon: <MedicineBoxOutlined />,
    },

  ];
  

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => navigate(item.key)}
        selectedKeys={[selectedKeys]}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default SideMenu;
