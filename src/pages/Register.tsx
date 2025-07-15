import React from 'react';
import { Form, Input, Button, message, Typography, Card } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL_REGISTER}`, values);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      message.error('Registration failed!');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-600 p-4'>
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <Typography.Title className="text-center mb-4" level={3}>Login</Typography.Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Button
            type="link"
            onClick={() => navigate("/Register")}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
