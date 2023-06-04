import { Button, Space, Table, Typography, Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../../API";

const { Option } = Select;

function AdminPatients() {
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
    const updatedDataSource = dataSource.map((patient) => {
      if (patient.email === editedRecord.email) {
        return {
          ...patient,
          ...values,
        };
      }
      return patient;
    });
    setDataSource(updatedDataSource);
    setEditModalVisible(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Blood Group",
      dataIndex: "blood_group",
    },
    {
      title: "Allergies",
      dataIndex: "allergies",
    },
    {
      title: "Disease",
      dataIndex: "disease",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "Follow",
      dataIndex: "follow",
    },
    {
      title: "Treatment",
      dataIndex: "Follow up period",
    },
    {
      title: "Hospital",
      dataIndex: "Hospital",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address) => {
        return (
          <span>
            {address.address}, {address.city}
          </span>
        );
      },
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Patients</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />

      {editedRecord && (
        <Modal
          title="Edit Patient"
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
          <Form
            form={editForm}
            onFinish={handleEditModalSubmit}
          >
            <Form.Item name="firstName" label="First Name" initialValue={editedRecord.firstName}>
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" initialValue={editedRecord.lastName}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" initialValue={editedRecord.email}>
              <Input disabled />
            </Form.Item>
            <Form.Item name="phone" label="Phone" initialValue={editedRecord.phone}>
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" initialValue={editedRecord.gender}>
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item name="blood_group" label="Blood Group" initialValue={editedRecord.blood_group}>
              <Select>
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
              </Select>
            </Form.Item>
            <Form.Item name="allergies" label="Allergies" initialValue={editedRecord.allergies}>
              <Input />
            </Form.Item>
            <Form.Item name="disease" label="Disease" initialValue={editedRecord.disease}>
              <Input />
            </Form.Item>
            <Form.Item name="startDate" label="Start Date" initialValue={editedRecord.startDate}>
              <Input type="date" />
            </Form.Item>
            <Form.Item name="follow" label="Follow Up" initialValue={editedRecord.follow}>
              <Input />
            </Form.Item>
            <Form.Item name="treatmentd" label="Treatment" initialValue={editedRecord["Follow up period"]}>
              <Input />
            </Form.Item>
            <Form.Item name="hospital" label="Hospital" initialValue={editedRecord.hospital}>
              <Select>
                <Option value="Hospital Rabat">Hospital Rabat</Option>
                <Option value="Hospital Casa">Hospital Casa</Option>
              </Select>
            </Form.Item>
            <Form.Item name="address" label="Address" initialValue={editedRecord.address}>
              <Input />
            </Form.Item>
            <Form.Item name="birthDate" label="Birth Date" initialValue={editedRecord.birthDate}>
              <Input type="date" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Space>
  );
}

export default AdminPatients;
