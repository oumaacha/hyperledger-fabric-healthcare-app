import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  DatabaseOutlined,
  MedicineBoxOutlined,
  UserOutlined,

} from "@ant-design/icons";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/doctor-data");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Doctor Data",
      icon: <DatabaseOutlined />,
      key: "/doctor/doctor-data",
    },
    {
      label: "Patients",
      key: "/doctor/doctor-patients",
      icon: <UserOutlined />,
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
