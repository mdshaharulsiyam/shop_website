import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Card, Row, Col, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useGlobalContext } from "@/providers/ContextProvider";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContext();
  const [form] = Form.useForm();

  // 🧩 Manage uploaded image
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      // set default profile picture if exists
      if (user.img) {
        setFileList([
          {
            uid: "-1",
            name: "profile.jpg",
            status: "done",
            url: user.img,
          },
        ]);
      }
    }
  }, [user, form]);

  // 🧩 Handle file upload change
  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  // 🧩 Handle form submit for profile update
  const handleProfileUpdate = (values: any) => {
    setLoading(true);

    const payload = {
      ...values,
      img: fileList[0]?.originFileObj || user?.img || null,
    };

    console.log("Profile Update Payload:", payload);
    // TODO: Integrate with backend API (e.g., upload image, then update profile)
    setTimeout(() => setLoading(false), 1000);
  };

  // 🧩 Handle password change
  const handlePasswordChange = (values: any) => {
    console.log("Password Change Values:", values);
    // TODO: integrate change password API
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>

      <Row gutter={[24, 24]}>
        {/* 🧾 Profile Info Section */}
        <Col xs={24} lg={12}>
          <Card
            title="Update Profile"
            className="rounded-2xl shadow-sm border border-gray-200"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleProfileUpdate}
              initialValues={{
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
              }}
            >
              <Form.Item label="Profile Picture">
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1}
                  fileList={fileList}
                  onChange={handleFileChange}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input disabled placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input type="number" placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* 🔐 Change Password Section */}
        <Col xs={24} lg={12}>
          <Card
            title="Change Password"
            className="rounded-2xl shadow-sm border border-gray-200"
          >
            <Form layout="vertical" onFinish={handlePasswordChange}>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  { required: true, message: "Please enter your current password" },
                ]}
              >
                <Input.Password placeholder="Enter current password" />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter a new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your new password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Divider />
    </div>
  );
};

export default Profile;
