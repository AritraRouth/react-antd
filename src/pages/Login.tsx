import React from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_LOGIN}`,
        values
      );
      alert("login successfull");
      const token = response.data.result;

      if (token) {
        dispatch(setToken(token));
        message.success("Login successful!");
        navigate("/dashboard");
      } else {
        message.error("Invalid response");
      }
    } catch (error) {
      message.error("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 p-4">
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
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Button
            type="link"
            onClick={() => navigate("/Register")}
          >
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
