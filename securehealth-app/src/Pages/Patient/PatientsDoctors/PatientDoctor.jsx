import { Avatar, Button, Rate, Space, Table, Typography, Modal, Form, Input ,Select} from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../../API";

function AdminDoctors() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [editForm] = Form.useForm(); // Add this line

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
    editForm.setFieldsValue(record); // Set the form values when editing
  };

  const handleDelete = (record) => {
    // Handle delete action for the doctor record
    console.log("Delete:", record);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };

  const handleEditModalSubmit = (values) => {
    // Update the specific doctor in the dataSource state
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

    // Close the edit modal
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
      title: "Speciality",
      dataIndex: "speciality",
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
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
      <Typography.Title level={4}>Doctors</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />

      {/* Edit Modal */}
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
          <Form
  form={editForm} // Use the form instance
  onFinish={handleEditModalSubmit}
>
  {/* Render your form fields here */}
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
  <Form.Item name="gender" label="Gender">
  <Select>
    <Select.Option value="Male">Male</Select.Option>
    <Select.Option value="Female">Female</Select.Option>
  </Select>
</Form.Item>

<Form.Item name="hospital" label="Hospital">
  <Select>
    <Select.Option value="Hospital Rabat">Hospital Rabat</Select.Option>
    <Select.Option value="Hospital Casa">Hospital Casa</Select.Option>
  </Select>
</Form.Item>
  <Form.Item name="address" label="Address">
    <Input.TextArea />
  </Form.Item>
  {/* Add more fields as needed */}
</Form>

        </Modal>
      )}
    </Space>
  );
}

export default AdminDoctors;
