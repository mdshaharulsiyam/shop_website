import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";

const { Title, Paragraph } = Typography;

const RegisterSeller = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 🖼️ File states
  const [logoFile, setLogoFile] = useState<any[]>([]);
  const [bannerFile, setBannerFile] = useState<any[]>([]);
  const [documentFiles, setDocumentFiles] = useState<any[]>([]);

  // 🧠 File change handler
  const handleFileChange =
    (setFile: React.Dispatch<React.SetStateAction<any[]>>) =>
      ({ fileList }: { fileList: any[] }) => {
        setFile(fileList);
      };

  // 🧾 Form submit handler
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        logo: logoFile[0]?.originFileObj || null,
        banner: bannerFile[0]?.originFileObj || null,
        business_documents: documentFiles.map((f) => f.originFileObj),
      };

      console.log("Submitting Seller Registration:", payload);

      message.success("Business registration submitted successfully!");
      form.resetFields();
      setLogoFile([]);
      setBannerFile([]);
      setDocumentFiles([]);
    } catch (err) {
      console.error(err);
      message.error("Failed to register business. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <div className="w-full max-w-2xl">
        <Card
          className="rounded-2xl shadow-md border border-gray-200 bg-white p-6"
          bodyStyle={{ padding: "1.5rem" }}
        >
          <div className="text-center mb-10">
            <Title level={2} className="!mb-1 text-blue-600">
              Register Your Business
            </Title>
            <Paragraph className="text-gray-500 text-sm">
              Provide your business details and upload required documents to
              become a verified seller.
            </Paragraph>
          </div>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            className="space-y-6"
          >
            {/* Inputs in one column */}
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Form.Item
                  label="Business Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter business name" }]}
                >
                  <Input placeholder="e.g. MultiMart, FlexMart" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Business Address"
                  name="address"
                  rules={[{ required: true, message: "Please enter business address" }]}
                >
                  <Input placeholder="Enter business address" />
                </Form.Item>
              </Col>
            </Row>

            {/* Uploads in 3 columns */}
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Form.Item label="Business Logo" name="logo">
                  <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    fileList={logoFile}
                    maxCount={1}
                    onChange={handleFileChange(setLogoFile)}
                  >
                    {logoFile.length === 0 && (
                      <div className="flex flex-col items-center">
                        <UploadOutlined />
                        <span className="text-xs mt-1 text-gray-500">
                          Upload Logo
                        </span>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Business Banner"
                  name="banner"
                  rules={[{ required: true, message: "Please upload banner" }]}
                >
                  <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    fileList={bannerFile}
                    maxCount={1}
                    onChange={handleFileChange(setBannerFile)}
                  >
                    {bannerFile.length === 0 && (
                      <div className="flex flex-col items-center">
                        <UploadOutlined />
                        <span className="text-xs mt-1 text-gray-500">
                          Upload Banner
                        </span>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Business Documents" name="business_documents">
                  <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    multiple
                    fileList={documentFiles}
                    onChange={handleFileChange(setDocumentFiles)}
                  >
                    <div className="flex flex-col items-center">
                      <UploadOutlined />
                      <span className="text-xs mt-1 text-gray-500">
                        Upload Docs
                      </span>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <div className="text-center mt-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-lg"
              >
                Submit Registration
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterSeller;
