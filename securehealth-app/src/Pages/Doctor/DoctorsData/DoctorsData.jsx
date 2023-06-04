import React, { useState } from "react";
import { Modal, Button, Form, Typography, Input, Select } from "antd";
import { UserOutlined, CalendarOutlined, PhoneOutlined, HomeOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";
import "../../../App.css";

const { Text } = Typography;

function DoctorData() {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Ilham",
    lastName: "Ab",
    birthday: "2001-11-19",
    address: "Rabat",
    phone: "0653861554",
    gender: "female",

  });

  const handleUpdate = () => {
    // Logic to update the user information
    console.log("Updating user data:", userData);
    setShowModal(false);
  };

  const handleChange = (name, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="admin-data">
      <h5 className="mt-3 mb-3">My Data</h5>
      <div className="data-container">
        <div className="data-field">
          <UserOutlined className="field-icon" />
          <Text strong>First Name:</Text>
          <span>{userData.firstName}</span>
        </div>
        <div className="data-field">
          <UserOutlined className="field-icon" />
          <Text strong>Last Name:</Text>
          <span>{userData.lastName}</span>
        </div>
        <div className="data-field">
          <CalendarOutlined className="field-icon" />
          <Text strong>Birthday:</Text>
          <span>{userData.birthday}</span>
        </div>
        <div className="data-field">
          <PhoneOutlined className="field-icon" />
          <Text strong>Contact:</Text>
          <span>{userData.phone}</span>
        </div>
        <div className="data-field">
          <HomeOutlined className="field-icon" />
          <Text strong>Address:</Text>
          <span>{userData.address}</span>
        </div>
        <div className="data-field">
          {userData.gender === "male" ? (
            <ManOutlined className="field-icon" />
          ) : (
            <WomanOutlined className="field-icon" />
          )}
          <Text strong>Gender:</Text>
          <span>{userData.gender}</span>
        </div>
      </div>

      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ backgroundColor: "#173560", borderColor: "#173560", marginTop: "10px" }}
      >
        Update
      </Button>

      <Modal visible={showModal} onCancel={handleCloseModal} footer={null}>
        <Typography.Title level={4}>Update User Information</Typography.Title>
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              type="tel"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              name="gender"
              value={userData.gender}
              onChange={(value) => handleChange("gender", value)}
            >
              <Select.Option value="">Select Gender</Select.Option>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Address">
            <Input
              type="text"
              name="address"
              value={userData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Birthday">
            <Input
              type="date"
              name="birthday"
              value={userData.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCloseModal}>Close</Button>
            <Button
              type="primary"
              onClick={handleUpdate}
              style={{ backgroundColor: "#173560", borderColor: "#173560", marginTop: "10px" }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DoctorData;
