import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";

const { Sider } = Layout;

export function CustomSider() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
    >
      <Menu
        mode="vertical"
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>

        <Menu.Item key="2" icon={<TeamOutlined />}>
          Produtores rurais
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
