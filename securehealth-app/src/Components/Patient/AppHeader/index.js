import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Image, List, Menu, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComments, getOrders } from "../../../API";
import logo from "../../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    // Handle menu item click (e.g., profile, logout)
    if (e.key === "profile") {
      navigate("patient-data"); // Redirect to profile page
    } else if (e.key === "logout") {
      navigate("/login"); // Redirect to login page
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<FontAwesomeIcon icon={faUser} />}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<FontAwesomeIcon icon={faRightFromBracket} />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="AppHeader">
      <img src={logo} alt="Logo" />
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Space align="center">
          <Avatar icon={<FontAwesomeIcon icon={faUser} />} />
          <Typography.Text className="admin-name">Patient Name</Typography.Text>
          <FontAwesomeIcon icon={faCaretDown} style={{color:'white'}} />
        </Space>
      </Dropdown>
    </div>
  );
}

export default AppHeader;
