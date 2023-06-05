import React, { useState } from "react";
import { Modal, Button, Form, Typography, Input, Select } from "antd";
import { UserOutlined, CalendarOutlined, PhoneOutlined,
   HomeOutlined, ManOutlined, WomanOutlined, 
   HeartOutlined, MedicineBoxOutlined, 
   FileDoneOutlined, AlertOutlined, CalendarTwoTone,
    } from "@ant-design/icons";
import "../../../App.css";

const { Text } = Typography;

function PatientData() {
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [personalData, setPersonalData] = useState({
    firstName: "Ilham",
    lastName: "Ab",
    birthday: "2001-11-19",
    address: "Rabat",
    phone: "0653861554",
    gender: "female",
  });
  const [healthData, setHealthData] = useState({
    bloodgroup: "A+",

    medications: ["Medication 1", "Medication 2"],
    allergies: ["Allergy 1", "Allergy 2"],
    disease: "Disease",
    startDate: "2023-01-01",
    treatment: "Treatment",
    followUp: "Follow Up",
  });

  const handleUpdatePersonal = () => {
    // Logic to update personal data
    console.log("Updating personal data:", personalData);
    setShowPersonalModal(false);
  };

  const handleUpdateHealth = () => {
    // Logic to update health data
    console.log("Updating health data:", healthData);
    setShowHealthModal(false);
  };

  const handlePersonalDataChange = (name, value) => {
    setPersonalData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleHealthDataChange = (name, value) => {
    setHealthData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClosePersonalModal = () => {
    setShowPersonalModal(false);
  };

  const handleOpenPersonalModal = () => {
    setShowPersonalModal(true);
  };

  const handleCloseHealthModal = () => {
    setShowHealthModal(false);
  };

  const handleOpenHealthModal = () => {
    setShowHealthModal(true);
  };

  return (
    <div className="patient-data">
      <div className="admin-data" style={{ marginBottom: "20px", height: "250px" }}>
        <h5 className="mt-3 mb-3">Personal Data</h5>
        <div className="data-container">
          <div className="data-field">
            <UserOutlined className="field-icon" />
            <Text strong>First Name:</Text>
            <span>{personalData.firstName}</span>
          </div>
          <div className="data-field">
            <UserOutlined className="field-icon" />
            <Text strong>Last Name:</Text>
            <span>{personalData.lastName}</span>
          </div>
          <div className="data-field">
            <CalendarOutlined className="field-icon" />
            <Text strong>Birthday:</Text>
            <span>{personalData.birthday}</span>
          </div>
          <div className="data-field">
            <PhoneOutlined className="field-icon" />
            <Text strong>Contact:</Text>
            <span>{personalData.phone}</span>
          </div>
          <div className="data-field">
            <HomeOutlined className="field-icon" />
            <Text strong>Address:</Text>
            <span>{personalData.address}</span>
          </div>
          <div className="data-field">
            {personalData.gender === "male" ? (
              <ManOutlined className="field-icon" />
            ) : (
              <WomanOutlined className="field-icon" />
            )}
            <Text strong>Gender:</Text>
            <span>{personalData.gender}</span>
          </div>
        </div>
        <Button
          type="primary"
          onClick={handleOpenPersonalModal}
          style={{ backgroundColor: "#173560", borderColor: "#173560", marginTop: "10px" }}
        >
          Update Personal Data
        </Button>
        <Modal visible={showPersonalModal} onCancel={handleClosePersonalModal} footer={null}>
          <Typography.Title level={4}>Update Personal Information</Typography.Title>
          <Form layout="vertical">
            <Form.Item label="First Name">
              <Input
                type="text"
                name="firstName"
                value={personalData.firstName}
                onChange={(e) => handlePersonalDataChange("firstName", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input
                type="text"
                name="lastName"
                value={personalData.lastName}
                onChange={(e) => handlePersonalDataChange("lastName", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                type="tel"
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={personalData.phone}
                onChange={(e) => handlePersonalDataChange("phone", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Gender">
              <Select
                name="gender"
                value={personalData.gender}
                onChange={(value) => handlePersonalDataChange("gender", value)}
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
                value={personalData.address}
                onChange={(e) => handlePersonalDataChange("address", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Birthday">
              <Input
                type="date"
                name="birthday"
                value={personalData.birthday}
                onChange={(e) => handlePersonalDataChange("birthday", e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleClosePersonalModal}>Close</Button>
              <Button
                type="primary"
                onClick={handleUpdatePersonal}
                style={{ backgroundColor: "#173560", borderColor: "#173560", marginTop: "10px" }}
              >
                Update Personal Data
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="admin-data" style={{ marginBottom: "20px", height: "350px" }}>
        <h5 className="mt-3 mb-3">Health Data</h5>
        <div className="data-container">
          <div className="data-field">
            <MedicineBoxOutlined className="field-icon" />
            <Text strong>Medications:</Text>
            <span>{healthData.medications.join(", ")}</span>
          </div>
          <div className="data-field">
            <AlertOutlined className="field-icon" />
            <Text strong>Allergies:</Text>
            <span>{healthData.allergies.join(", ")}</span>
          </div>
  
          <div className="data-field">
  <FileDoneOutlined className="field-icon" />
  <Text strong>Disease:</Text>
  <span>{healthData.disease}</span>
</div>
<div className="data-field">
  <CalendarOutlined className="field-icon" />
  <Text strong>Start Date:</Text>
  <span>{healthData.startDate}</span>
</div>
<div className="data-field">
  <MedicineBoxOutlined className="field-icon" />
  <Text strong>Treatment:</Text>
  <span>{healthData.treatment}</span>
</div>
<div className="data-field">
  <HeartOutlined className="field-icon" />
  <Text strong>Follow Up:</Text>
  <span>{healthData.followUp}</span>
</div>
          <div className="data-field">
            <HeartOutlined className="field-icon" />
            <Text strong>Blood Group:</Text>
                <span>{healthData.bloodGroup}</span>
            </div>
        </div>
        <Button
          type="primary"
          onClick={handleOpenHealthModal}
          style={{ backgroundColor: "#173560", borderColor: "#173560", marginTop: "10px" }}
        >
          Update Health Data
        </Button>
        <Modal visible={showHealthModal} onCancel={handleCloseHealthModal} footer={null}>
          <Typography.Title level={4}>Update Health Information</Typography.Title>
          <Form layout="vertical">
      
            <Form.Item label="Medications">
              <Select
                mode="tags"
                name="medications"
                value={healthData.medications}
                onChange={(value) => handleHealthDataChange("medications", value)}
              />
            </Form.Item>
            <Form.Item label="Allergies">
              <Select
                mode="tags"
                name="allergies"
                value={healthData.allergies}
                onChange={(value) => handleHealthDataChange("allergies", value)}
              />
            </Form.Item>
          
            <Form.Item label="Disease">
              <Input
                type="text"
                name="disease"
                value={healthData.disease}
                onChange={(e) => handleHealthDataChange("disease", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Start Date">
              <Input
                type="date"
                name="startDate"
                value={healthData.startDate}
                onChange={(e) => handleHealthDataChange("startDate", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Treatment">
              <Input
                type="text"
                name="treatment"
                value={healthData.treatment}
                onChange={(e) => handleHealthDataChange("treatment", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Follow Up">
              <Input
                type="text"
                name="followUp"
                value={healthData.followUp}
                onChange={(e) => handleHealthDataChange("followUp", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Blood Group">
  <Select
    name="bloodGroup"
    value={healthData.bloodGroup}
    onChange={(value) => handleHealthDataChange("bloodGroup", value)}
  >
    <Select.Option value="">Select Blood Group</Select.Option>
    <Select.Option value="A+">A+</Select.Option>
    <Select.Option value="A-">A-</Select.Option>
    <Select.Option value="B+">B+</Select.Option>
    <Select.Option value="B-">B-</Select.Option>
    <Select.Option value="AB+">AB+</Select.Option>
    <Select.Option value="AB-">AB-</Select.Option>
    <Select.Option value="O+">O+</Select.Option>
    <Select.Option value="O-">O-</Select.Option>
  </Select>
</Form.Item>


      
            <Form.Item>
              <Button onClick={handleCloseHealthModal}>Close</Button>
              <Button
                type="primary"
                onClick={handleUpdateHealth}
                style={{ backgroundColor: "#173560", borderColor: "#173560", marginTop: "10px" }}
              >
                Update Health Data
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default PatientData;
