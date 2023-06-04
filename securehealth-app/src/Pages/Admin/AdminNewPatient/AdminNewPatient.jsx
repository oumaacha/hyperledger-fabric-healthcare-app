import { Form, Input, Button, Row, Col, Typography, Select } from "antd";
import { UserOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined,HomeOutlined } from "@ant-design/icons";
import { useState } from "react";

function AddPatient() {
  const [form] = Form.useForm();
  const [patients, setPatients] = useState([]);

  const handleFormSubmit = (values) => {
    const newPatient = {
      ...values,
      id: patients.length + 1, // Assign a unique ID to the new patient
    };

    setPatients([...patients, newPatient]);
    form.resetFields();
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Typography.Title level={4}>Add New Patient</Typography.Title>
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter the first name" }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter the last name" }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bloodGroup"
                label="Blood Group"
                rules={[{ required: true, message: "Please select the blood group" }]}
              >
                <Select placeholder="Select blood group" suffixIcon={<i className="anticon"><svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M476 690.3l-258.7-258.7c-4.7-4.7-12.3-4.7-17 0l-29.8 29.8c-4.7 4.7-4.7 12.3 0 17l287.4 287.4c4.7 4.7 12.3 4.7 17 0l287.4-287.4c4.7-4.7 4.7-12.3 0-17l-29.8-29.8c-4.7-4.7-12.3-4.7-17 0L548 690.3c-4.7 4.6-12.3 4.6-17-.1z"></path></svg></i>}>
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
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please enter the phone number" }]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select the gender" }]}
              >
                <Select placeholder="Select gender" suffixIcon={<i className="anticon"><svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M476 690.3l-258.7-258.7c-4.7-4.7-12.3-4.7-17 0l-29.8 29.8c-4.7 4.7-4.7 12.3 0 17l287.4 287.4c4.7 4.7 12.3 4.7 17 0l287.4-287.4c4.7-4.7 4.7-12.3 0-17l-29.8-29.8c-4.7-4.7-12.3-4.7-17 0L548 690.3c-4.7 4.6-12.3 4.6-17-.1z"></path></svg></i>}>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter the address" }]}
              >
                <Input prefix={<EnvironmentOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthDate"
                label="Birth Date"
                rules={[{ required: true, message: "Please enter the birth date" }]}
              >
                <Input prefix={<CalendarOutlined />} type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="hospital"
                label="Hospital"
                rules={[{ required: true, message: "Please choose the hospital" }]}
              >
                <Select prefix={<HomeOutlined />} placeholder="Select Hospital">
                  <Select.Option value="hospital_rabat">Hospital Rabat</Select.Option>
                  <Select.Option value="hospital_casa">Hospital Casa</Select.Option>
                </Select>
              </Form.Item>
              </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Patient
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default AddPatient;
