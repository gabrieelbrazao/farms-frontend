import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Typography } from "antd";
import { createElement, useState } from "react";

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

export function Header() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <AntdHeader style={{ padding: 0 }}>
      <Row align="middle">
        <Col>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "collapseIcon",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Col>

        <Col>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            Produtores rurais
          </Title>
        </Col>
      </Row>
    </AntdHeader>
  );
}
