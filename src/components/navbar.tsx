import React, { useState } from "react";
import {
  MailOutlined,
  ProfileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HighlightOutlined,
  AppstoreOutlined,
  BlockOutlined,
  PieChartOutlined,
  LockOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, theme, Layout, Button } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
const { Header, Sider, Content } = Layout;

const items: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <AppstoreOutlined/>,
    children: [
      { key: "ecommerce", label: "eCommerce" },
      { key: "analytics", label: "Analytics" },
      { key: "marketing", label: "Marketing" },
      { key: "crm", label: "CRM" },
      { key: "stocks", label: "Stocks" },
      { key: "saas", label: "Saas" },
    ],
  },
  { key: "calendar", label: "Calendar", icon: <MailOutlined /> },
  { key: "user-profile", label: "User Profile", icon: <ProfileOutlined /> },
  {
    key: "task",
    label: "Task",
    icon: <HighlightOutlined />,
    children: [
      { key: "list", label: "List" },
      { key: "kanban", label: "Kanban" },
    ],
  },
  {
    key: "forms",
    label: "Forms",
    icon: <MailOutlined />,
    children: [
      { key: "form-elements", label: "Form Elements" },
      { key: "form-layout", label: "Form Layout" },
    ],
  },
  {
    key: "tables",
    label: "Tables",
    icon: <MailOutlined />,
    children: [
      { key: "basic-tables", label: "Basic Tables" },
      { key: "data-tables", label: "Data Tables" },
    ],
  },
  {
    key: "pages",
    label: "Pages",
    icon: <BlockOutlined />,
    children: [
      { key: "file-manager", label: "File Manager" },
      { key: "pricing", label: "Pricing Tables" },
      { key: "faq", label: "FAQ" },
      { key: "blank", label: "Blank Page" },
      { key: "404", label: "404 Error" },
      { key: "500", label: "500 Error" },
      { key: "503", label: "503 Error" },
      { key: "coming-soon", label: "Coming Soon" },
      { key: "maintenance", label: "Maintenance" },
      { key: "success", label: "Success" },
    ],
  },
  { key: "chat", label: "Chat", icon: <MailOutlined /> },
  {
    key: "inbox",
    label: "Inbox",
    icon: <MailOutlined />,
    children: [
      { key: "inbox-list", label: "Inbox List" },
      { key: "inbox-details", label: "Details" },
    ],
  },
  { key: "invoice", label: "Invoice", icon: <CopyOutlined /> },
  {
    key: "charts",
    label: "Charts",
    icon: <PieChartOutlined />,
    children: [
      { key: "line", label: "Line Charts" },
      { key: "bar", label: "Bar Charts" },
      { key: "pie", label: "Pie Charts" },
    ],
  },
  {
    key: "auth",
    label: "Authentication",
    icon: <LockOutlined />,
    children: [
      { key: "signin", label: "Sign In" },
      { key: "signup", label: "Sign Up" },
      { key: "reset", label: "Reset Password" },
      { key: "two-step", label: "Two Step Verification" },
    ],
  },
];

const navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div style={{ padding: 16, textAlign: "center", fontWeight: "bold" }}>
          {collapsed ? "" : "Menu"}
        </div>
        <Menu
          defaultSelectedKeys={["dashboard"]}
          defaultOpenKeys={["dashboard"]}
          mode="inline"
          theme="light"
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "18px" }}
          />
          <h2 style={{ marginLeft: "16px" }}>Dashboard</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Aritra
        </Content>
      </Layout>
    </Layout>
  );
};

export default navbar;
