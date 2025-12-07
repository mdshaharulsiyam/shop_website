import { useGlobalContext } from "@/providers/ContextProvider";
import { usePatchNewPasswordMutation, usePatchProfileMutation } from "@/Redux/apis/authSlice";
import { useUpdateBusinessMutation } from "@/Redux/apis/businessApis";
import { imageUrl } from "@/Redux/baseApi";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContext();
  const [update,] = usePatchProfileMutation()
  const [updatePassword,] = usePatchNewPasswordMutation()
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [businessForm] = Form.useForm();
  const [logoFile, setLogoFile] = useState<any[]>([]);
  const [bannerFile, setBannerFile] = useState<any[]>([]);
  const [documentFiles, setDocumentFiles] = useState<any[]>([]);
  const [updateBusiness] = useUpdateBusinessMutation();

  useEffect(() => {
    const business = user?.business as any;
    if (business) {
      businessForm.setFieldsValue({
        name: business.name || "",
        address: business.address || "",
      });

      if (business.logo) {
        setLogoFile([{ uid: '-1', name: 'logo.jpg', status: 'done', url: imageUrl(business.logo) }]);
      } else {
        setLogoFile([]);
      }

      if (business.banner) {
        setBannerFile([{ uid: '-2', name: 'banner.jpg', status: 'done', url: imageUrl(business.banner) }]);
      } else {
        setBannerFile([]);
      }

      if (business.business_documents?.length) {
        setDocumentFiles(
          business.business_documents.map((doc: string, index: number) => ({
            uid: `doc-${index}`,
            name: `document-${index + 1}.jpg`,
            status: 'done',
            url: imageUrl(doc),
          }))
        );
      } else {
        setDocumentFiles([]);
      }
    }
  }, [user?.business, businessForm]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      if (user.img) {
        setFileList([
          {
            uid: "-1",
            name: "profile.jpg",
            status: "done",
            url: imageUrl(user?.img),
          },
        ]);
      }
    }
  }, [user, form]);
  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleBusinessFileChange =
    (setFile: React.Dispatch<React.SetStateAction<any[]>>) =>
      ({ fileList }: { fileList: any[] }) => {
        setFile(fileList);
      };

  const handleBusinessUpdate = async (values: any) => {
    try {
      const formData = new FormData();
      if (values?.name) formData.append("name", values.name);
      if (values?.address) formData.append("address", values.address);
      if (logoFile?.[0]?.originFileObj) {
        formData.append("logo", logoFile[0].originFileObj);
      }
      if (bannerFile?.[0]?.originFileObj) {
        formData.append("banner", bannerFile[0].originFileObj);
      }
      if (documentFiles?.length) {
        documentFiles.forEach((f: any) => {
          if (f?.originFileObj) {
            formData.append("business_documents", f.originFileObj);
          }
        });
      }

      if (!user?.business?._id) {
        toast.error('Business not found for current user');
        return;
      }
      const promise = updateBusiness({ id: user?.business?._id as string, data: formData }).unwrap();
      const res: any = await toast.promise(promise, {
        loading: 'Updating business information...',
        success: (res) => res?.message || 'Business information updated successfully',
        error: (err) => err?.data?.message || 'Failed to update business information',
      });

      // Keep images visible immediately after update using server response
      const updated = res?.data || {};
      if (updated.logo) {
        setLogoFile([{ uid: '-1', name: 'logo.jpg', status: 'done', url: imageUrl(updated.logo) }]);
      } else if (logoFile.length) {
        setLogoFile(logoFile);
      }
      if (updated.banner) {
        setBannerFile([{ uid: '-2', name: 'banner.jpg', status: 'done', url: imageUrl(updated.banner) }]);
      } else if (bannerFile.length) {
        setBannerFile(bannerFile);
      }
      if (Array.isArray(updated.business_documents)) {
        setDocumentFiles(
          updated.business_documents.map((doc: string, index: number) => ({
            uid: `doc-${index}`,
            name: `document-${index + 1}.jpg`,
            status: 'done',
            url: imageUrl(doc),
          }))
        );
      } else if (documentFiles.length) {
        setDocumentFiles(documentFiles);
      }
    } catch (err) {
      console.error('Business update error:', err);
    }
  };
  const handleProfileUpdate = (values: any) => {
    setLoading(true);

    const payload = {
      ...values,
      ...((fileList[0]?.originFileObj || user?.img) ? {
        img: fileList[0]?.originFileObj || user?.img,
      } : {})
    };
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    const promise = update(formData).unwrap();
    toast.promise(
      promise,
      {
        loading: 'Updating profile...',
        success: (res) => res?.message || 'Profile updated successfully',
        error: (err) => err?.data?.message || 'Profile update failed',
      }
    );
    setLoading(false);
  };

  const handlePasswordChange = (values: any) => {
    setLoading(true)
    const promise = updatePassword(values).unwrap();
    toast.promise(
      promise,
      {
        loading: 'Updating password...',
        success: (res) => res?.message || 'Password updated successfully',
        error: (err) => err?.data?.message || 'Password update failed',
      }
    );
    setLoading(false);
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
                name="old_password"
                rules={[
                  { required: true, message: "Please enter your current password" },
                ]}
              >
                <Input.Password placeholder="Enter current password" />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="password"
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
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your new password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
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

      {/* 🏢 Business Information Section */}
      {
        user?.business?._id && <Row gutter={[24, 24]} className="mt-6">
          <Col span={24}>
            <Card
              title="Business Information"
              className="rounded-2xl shadow-sm border border-gray-200"
            >
              <Form
                form={businessForm}
                layout="vertical"
                onFinish={handleBusinessUpdate}
                className="space-y-6"
              >
                <Row gutter={[0, 16]}>
                  <Col span={24} md={12} className="pr-4">
                    <Form.Item
                      label="Business Name"
                      name="name"
                      rules={[{ required: true, message: "Please enter business name" }]}
                    >
                      <Input placeholder="e.g. MultiMart, FlexMart" />
                    </Form.Item>
                  </Col>

                  <Col span={24} md={12}>
                    <Form.Item
                      label="Business Address"
                      name="address"
                      rules={[{ required: true, message: "Please enter business address" }]}
                    >
                      <Input placeholder="Enter business address" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Logo and Banner in one row */}
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Business Logo" name="logo">
                      <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={logoFile}
                        maxCount={1}
                        onChange={handleBusinessFileChange(setLogoFile)}
                        className="w-full"
                      >
                        {logoFile.length === 0 && (
                          <div className="flex flex-col items-center w-full">
                            <UploadOutlined className="text-2xl" />
                            <span className="text-sm mt-2 text-gray-500">
                              {user?.business?.logo ? 'Change Logo' : 'Upload Logo'}
                            </span>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Business Banner" name="banner">
                      <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={bannerFile}
                        maxCount={1}
                        onChange={handleBusinessFileChange(setBannerFile)}
                        className="w-full"
                      >
                        {bannerFile.length === 0 && (
                          <div className="flex flex-col items-center w-full">
                            <UploadOutlined className="text-2xl" />
                            <span className="text-sm mt-2 text-gray-500">
                              {user?.business?.banner ? 'Change Banner' : 'Upload Banner'}
                            </span>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                {/* Business Documents in full width row */}
                <Row>
                  <Col span={24}>
                    <Form.Item label="Business Documents" name="business_documents">
                      <Upload
                        beforeUpload={() => false}
                        listType="text"
                        multiple
                        fileList={documentFiles}
                        onChange={handleBusinessFileChange(setDocumentFiles)}
                        onRemove={(file) => {
                          // prevent deletion of existing server files
                          if ((file as any)?.url && !(file as any)?.originFileObj) {
                            return false;
                          }
                          // allow removal of newly added, not yet uploaded files
                          setDocumentFiles((prev) => prev.filter((f) => f.uid !== file.uid));
                          return true;
                        }}
                        className="w-full"
                        showUploadList={{
                          showRemoveIcon: true,
                          showPreviewIcon: true,
                        }}
                      >
                        {documentFiles.length === 0 ? (
                          <div className="flex flex-col items-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg">
                            <UploadOutlined className="text-2xl" />
                            <span className="text-sm mt-2 text-gray-500">
                              {user?.business?.business_documents?.length ? 'Add More Documents' : 'Upload Documents'}
                            </span>
                          </div>
                        ) : (
                          <div className="p-2">
                            <Button icon={<UploadOutlined />}>Add More Documents</Button>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <div className="text-center mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-10 py-2 rounded-lg"
                    loading={false}
                  >
                    Update Business Information
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      }

    </div>
  );
};

export default Profile;
