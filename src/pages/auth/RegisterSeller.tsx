import { useCreateBusinessMutation } from "@/Redux/apis/businessApis";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const RegisterSeller = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [logoFile, setLogoFile] = useState<any[]>([]);
  const [bannerFile, setBannerFile] = useState<any[]>([]);
  const [documentFiles, setDocumentFiles] = useState<any[]>([]);
  const [registerBusiness, { isLoading: isLoadingRegister }] = useCreateBusinessMutation();


  const handleFileChange =
    (setFile: React.Dispatch<React.SetStateAction<any[]>>) =>
      ({ fileList }: { fileList: any[] }) => {
        setFile(fileList);
      };

  const handleSubmit = async (values: any) => {
    setLoading(true);
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

      await registerBusiness(formData).unwrap();

      message.success("Business registration submitted successfully!");
      form.resetFields();
      setLogoFile([]);
      setBannerFile([]);
      setDocumentFiles([]);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      message.error("Failed to register business. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6 relative">
      {(loading || isLoadingRegister) && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <Spin size="large" tip="Submitting..." />
        </div>
      )}
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

            {/* Logo and Banner in one row */}
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Form.Item label="Business Logo" name="logo">
                  <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    fileList={logoFile}
                    maxCount={1}
                    onChange={handleFileChange(setLogoFile)}
                    className="w-full"
                  >
                    {logoFile.length === 0 && (
                      <div className="flex flex-col items-center w-full">
                        <UploadOutlined className="text-2xl" />
                        <span className="text-sm mt-2 text-gray-500">
                          Upload Logo
                        </span>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
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
                    className="w-full"
                  >
                    {bannerFile.length === 0 && (
                      <div className="flex flex-col items-center w-full">
                        <UploadOutlined className="text-2xl" />
                        <span className="text-sm mt-2 text-gray-500">
                          Upload Banner
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
                <Form.Item
                  label="Business Documents"
                  name="documents"
                  rules={[
                    { required: true, message: "Please upload at least one document" },
                  ]}
                >
                  <Upload
                    beforeUpload={() => false}
                    listType="text"
                    fileList={documentFiles}
                    onChange={handleFileChange(setDocumentFiles)}
                    multiple
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
                          Upload Documents
                        </span>
                      </div>
                    ) : (
                      <div className="p-4">
                        <Button icon={<UploadOutlined />}>Add More Documents</Button>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            {/* Submit Button */}
            <div className="text-center mt-8">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading || isLoadingRegister}
                className="bg-blue-600 hover:bg-blue-700 h-12 px-10 text-lg"
                size="large"
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
