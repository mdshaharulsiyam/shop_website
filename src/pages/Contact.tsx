import { Button, Card, Form, Input, Typography, message as antdMessage } from "antd";
import { useCreateContactMutation } from "@/Redux/apis/contactApis";
import { useEffect } from "react";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";
import SEO from "@/components/SEO";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [createContact, { isLoading }] = useCreateContactMutation();

  // Check if user is logged in and pre-fill form
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        form.setFieldsValue({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
        });
      } catch (error) {
        console.log('No user data available');
      }
    }
  }, [form]);

  const onFinish = async (values: any) => {
    try {
      const result = await createContact(values).unwrap();
      antdMessage.success(result?.message || "Your message has been sent successfully!");
      form.resetFields();
      
      // Restore user data if logged in
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        form.setFieldsValue({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
        });
      }
    } catch (error: any) {
      antdMessage.error(error?.data?.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us | Get in Touch with Our Team"
        description="Have questions or feedback? Contact our friendly team. We're here to help and would love to hear from you. Reach out via phone, email, or our contact form."
        keywords="contact us, customer support, get in touch, help center, contact form, support, customer service, email us, call us"
      />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <MessageSquare className="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </div>
          <Title level={1} className="text-4xl font-bold mb-4">Contact Us</Title>
          <Paragraph className="text-lg text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Paragraph>
        </div>

        {/* Contact Form Card */}
        <Card className="shadow-lg rounded-xl border-0">
          <Form form={form} layout="vertical" onFinish={onFinish} size="large">
            <Form.Item 
              label="Name" 
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input 
                prefix={<User className="w-4 h-4 text-gray-400" />}
                placeholder="Enter your name" 
              />
            </Form.Item>

            <Form.Item 
              label="Email" 
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input 
                prefix={<Mail className="w-4 h-4 text-gray-400" />}
                type="email" 
                placeholder="Enter your email" 
              />
            </Form.Item>

            <Form.Item 
              label="Phone (Optional)" 
              name="phone"
            >
              <Input 
                prefix={<Phone className="w-4 h-4 text-gray-400" />}
                placeholder="Enter your phone number" 
              />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <TextArea 
                rows={6} 
                placeholder="Type your message here..." 
                showCount
                maxLength={1000}
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={isLoading}
                icon={<Send className="w-4 h-4" />}
                className="h-12 text-lg font-semibold"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center mb-3">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">support@example.com</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center mb-3">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center mb-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600">24/7 Support</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
