import { Button, Card, Form, Input, Typography, message as antdMessage } from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Anonymous/Optional Contact Message:", values);
    antdMessage.success("Your message has been sent!");
    form.resetFields();
  };

  return (
    <div className="flex justify-center items-center  p-6 container mx-auto">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <div className="text-center mb-6">
          <Title level={2}>Contact Us</Title>
          <Paragraph type="secondary">
            You can send us a message anonymously, or include your contact details if you wish.
            Only the message field is required.
          </Paragraph>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name (optional)" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email (optional)" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter your phone (optional)" />
          </Form.Item>

          <Form.Item
            label="Your Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <TextArea rows={5} placeholder="Type your message here..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact;
