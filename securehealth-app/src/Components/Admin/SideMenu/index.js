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
  const [selectedKeys, setSelectedKeys] = useState("/admin");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Admin Data",
      icon: <DatabaseOutlined />,
      key: "/admin-data",
    },
    {
      label: "Patients",
      key: "/admin-patients",
      icon: <UserOutlined />,
    },
    {
      label: "Doctors",
      key: "/admin-doctors",
      icon: <MedicineBoxOutlined />,
    },
    {
      label: "Add Patient",
      key: "/admin-new-patient",
      icon: <UserAddOutlined />,
    },
    {
      label: "Add Doctor",
      key: "/admin-new-doctor",
      icon: <UserAddOutlined />,
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
