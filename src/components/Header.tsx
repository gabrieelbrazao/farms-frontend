import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setSiderIsCollapsed } from "@app/store/slices/misc";
import { Col, Layout, Row, Typography } from "antd";
import { createElement } from "react";

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

export function Header() {
  const dispatch = useAppDispatch();

  const { siderIsCollapsed, siderSelectedKeys } = useAppSelector(
    (state) => state.misc
  );

  return (
    <AntdHeader style={{ padding: 0, zIndex: 1 }}>
      <Row align="middle">
        <Col>
          {createElement(
            siderIsCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "collapseIcon",
              onClick: () => dispatch(setSiderIsCollapsed(!siderIsCollapsed)),
            }
          )}
        </Col>

        <Col>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            {siderSelectedKeys[0] === "2" ? "Produtores rurais" : "Dashboard"}
          </Title>
        </Col>
      </Row>
    </AntdHeader>
  );
}
