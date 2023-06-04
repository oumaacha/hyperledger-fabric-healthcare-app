import React, { useEffect, useState } from "react";
import { Button, Space, Table, Typography, Modal, Form, Input } from "antd";
import { getCustomers } from "../../../API";

function PatientDoctorAccess() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [editForm] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  const handleGrant = (record) => {
    console.log("Grant:", record);
  };

  const handleRevoke = (record) => {
    console.log("Revoke:", record);
  };

  const handleEdit = (record) => {
    setEditedRecord(record);
    setEditModalVisible(true);
    editForm.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };

  const handleEditModalSubmit = (values) => {
    const updatedDataSource = dataSource.map((doctor) => {
      if (doctor.email === editedRecord.email) {
        return {
          ...doctor,
          ...values,
        };
      }
      return doctor;
    });
    setDataSource(updatedDataSource);

    setEditModalVisible(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: 150,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: 150,
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
      width: 200,
    },
    {
      title: "Speciality",
      dataIndex: "speciality",
      width: 200,
    },
    {
      title: "Actions",
      dataIndex: "",
      width: 150,
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" onClick={() => handleGrant(record)}>
              Grant
            </Button>
            <Button danger onClick={() => handleRevoke(record)}>
              Revoke
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Doctors access control</Typography.Title>
      <Table
        size="large"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        scroll={{ x: 1000 }} // Adjust the width here
      />

      {editedRecord && (
        <Modal
          title="Edit Doctor"
          visible={editModalVisible}
          onCancel={handleEditModalClose}
          footer={[
            <Button key="cancel" onClick={handleEditModalClose}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleEditModalSubmit}>
              Save
            </Button>,
          ]}
        >
          <Form form={editForm} onFinish={handleEditModalSubmit}>
            <Form.Item name="firstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input disabled />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="birthDate" label="Birth Date">
              <Input type="date" />
            </Form.Item>
            <Form.Item name="speciality" label="Speciality">
              <Input />
            </Form.Item>
            <Form.Item name="hospital" label="Hospital">
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Space>
  );
}

export default PatientDoctorAccess;
