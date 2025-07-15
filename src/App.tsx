import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Row,
  Space,
  Steps,
  Table,
  Tag,
  Image,
  Typography,
  theme,
  message,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, type ChangeEvent } from "react";
import { faker } from "@faker-js/faker";
import DynamicData from "./echarts/DynamicData";
import {
  CodeSandboxOutlined,
  MoonOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Noti from "./components/Noti";
import HalfBar from "./echarts/HalfBar";
import Bar from "./echarts/Bar";
import StackedLine from "./echarts/StackedLine";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Text } = Typography;

interface Todo {
  id?: string;
  text: string;
  completed: boolean;
}

function App() {
  const [themeset, setTheme] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      message.error("Unauthorized! Please Login First");
      navigate("/");
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_GET_URL}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.result.items);
        const todosData = response.data.result.items.map((todo: any) => ({
          id: todo.id || todo._id || "N/A",
          text: todo.text,
          completed: todo.completed,
        }));

        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
        message.error("Failed to fetch todos");
      }
    };

    fetchTodos();
  }, [token]);

  return (
    <Layout>
      <Header style={{ backgroundColor: "white" }}>
        <div className="flex items-center-safe ml-30 mt-4">
          <GiHamburgerMenu
            size={24}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        </div>
        <div className="flex justify-end items-center -mt-4 -mr-6 space-x-6">
          <Button onClick={() => setTheme(!themeset)}>
            <MoonOutlined />
          </Button>
          <Noti />
          <Image
            width={80}
            src="https://www.wondercide.com/cdn/shop/articles/Upside_down_gray_cat.png?v=1685551065&width=1100"
            alt="Profile"
            className="w-20 h-20 rounded-full"
            preview={true}
          />
        </div>
      </Header>
      <Layout>
        <Sider
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
          collapsed={collapsed}
        >
          <Menu
            className="flex-1 flex flex-col gap-7"
            mode="inline"
            theme={themeset ? "dark" : "light"}
            items={[
              {
                label: "DashBoard",
                key: "dashboard",
                icon: <UnorderedListOutlined />,
                children: [
                  {
                    label: "ecommerce",
                    key: "ecommerce",
                  },
                  {
                    label: "analytics",
                    key: "analytics",
                  },
                  {
                    label: "Marketing",
                    key: "marketing",
                  },
                  {
                    label: "CRM",
                    key: "crm",
                  },
                  {
                    label: "Stocks",
                    key: "stocks",
                  },
                  {
                    label: "Saas",
                    key: "saas",
                  },
                ],
              },
              {
                label: "Calender",
                key: "calender",
              },
              {
                label: "User Profile",
                key: "user-profile",
              },
              {
                label: "Task",
                key: "task",
                children: [
                  {
                    label: "List",
                    key: "list",
                  },
                  {
                    label: "Kanban",
                    key: "kanban",
                  },
                ],
              },
              {
                label: "Tables",
                key: "tables",
                children: [
                  {
                    label: "Basic Tables",
                    key: "basic-tables",
                  },
                  {
                    label: "Data Tables",
                    key: "data-tables",
                  },
                ],
              },
              {
                label: "Chat",
                key: "chat",
              },
              {
                label: "Email",
                key: "email",
              },
              {
                label: "Invoice",
                key: "invoice",
              },
              {
                label: "Charts",
                key: "charts",
              },
              {
                label: "Ui Element",
                key: "ui-element",
              },
              {
                label: "Authentication",
                key: "authentication",
              },
            ]}
          />
        </Sider>
        <Content className="mt-1.5 ml-1.5 space-x-2 px-12">
          <div className="flex gap-[2%] flex-row flex-wrap justify-center items-center content-center">
            <Card className="w-[17%] h-[19%]">
              <CodeSandboxOutlined size={40} />
              <Typography.Title type="secondary" level={1}>
                Customer
              </Typography.Title>
              <Typography.Title type="secondary" level={4}>
                3,782
              </Typography.Title>
              <Text className="mt-3" type="success">
                (↑)11.02%
              </Text>
            </Card>
            <Card className="w-[13%] h-[19%]">
              <CodeSandboxOutlined size={40} />
              <Typography.Title type="secondary" level={1}>
                Orders
              </Typography.Title>
              <Typography.Title type="secondary" level={4}>
                5,359
              </Typography.Title>
              <Text className="mt-3" type="success">
                (↑)11.02%
              </Text>
            </Card>
            <HalfBar />
            <DynamicData />
          </div>
          <div className="flex flex-row">
            <Bar />
            <StackedLine />
          </div>
          <Divider orientation="center">data</Divider>
          <Divider orientation="center">Todo List from MongoDB</Divider>

          <List
            bordered
            dataSource={todos}
            renderItem={(item) => (
              <List.Item>
                <Descriptions title="Todo">
                  <Descriptions.Item label="ID">{item.id}</Descriptions.Item>
                  <Descriptions.Item label="Text">
                    {item.text}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    {item.completed ? "✅ Completed" : "❌ Not Completed"}
                  </Descriptions.Item>
                </Descriptions>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
