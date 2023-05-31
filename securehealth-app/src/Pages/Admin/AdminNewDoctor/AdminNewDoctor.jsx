import { Form, Input, Button, Row, Col, Typography, Select } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, CalendarOutlined, SolutionOutlined } from "@ant-design/icons";
import { useState } from "react";

function AddDoctor() {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);

  const handleFormSubmit = (values) => {
    const newDoctor = {
      ...values,
      id: doctors.length + 1, // Assign a unique ID to the new doctor
    };

    setDoctors([...doctors, newDoctor]);
    form.resetFields();
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Typography.Title level={4}>Add New Doctor</Typography.Title>
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
                <Select prefix={<SolutionOutlined />} placeholder="Select gender">
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
                <Input prefix={<HomeOutlined />} />
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
                name="speciality"
                label="Speciality"
                rules={[{ required: true, message: "Please enter the speciality" }]}
              >
                <Input prefix={<SolutionOutlined />} />
              </Form.Item>
            </Col>
          </Row>
        
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Doctor
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default AddDoctor;
