import { Button, Col, Dropdown, Row } from "antd";
import {
  MenuOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCurrentBreakpoint } from "@app/hooks/useCurrentBreakpoint";
import {
  DesktopMenu,
  FixDiv,
  HeaderComponent,
  HeaderRow,
  MobileMenu,
} from "./styleds";
import logo from "../../assets/logo.png";

export function Header() {
  const navigate = useNavigate();
  const currentBreakpoint = useCurrentBreakpoint();

  return (
    <>
      <HeaderComponent>
        <HeaderRow align="middle" gutter={24}>
          <Col>
            <img src={logo} alt="" height="48px" />
          </Col>

          <Col flex={1}>
            {currentBreakpoint !== "xs" ? (
              <DesktopMenu
                selectedKeys={[window.location.pathname]}
                onSelect={({ key }) => navigate(key)}
                mode="horizontal"
              >
                <MobileMenu.Item key="/dashboard">Dashboard</MobileMenu.Item>

                <MobileMenu.Item key="/produtores">
                  Produtores rurais
                </MobileMenu.Item>
              </DesktopMenu>
            ) : (
              <Row justify="end">
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <div>
                      <MobileMenu
                        selectedKeys={[window.location.pathname]}
                        onSelect={({ key }) => {
                          navigate(key);
                          window.focus();
                        }}
                      >
                        <MobileMenu.Item
                          key="/dashboard"
                          icon={<PieChartOutlined />}
                        >
                          Dashboard
                        </MobileMenu.Item>

                        <MobileMenu.Item
                          key="/produtores"
                          icon={<TeamOutlined />}
                        >
                          Produtores rurais
                        </MobileMenu.Item>
                      </MobileMenu>
                    </div>
                  }
                >
                  <Button icon={<MenuOutlined />} size="large" type="link" />
                </Dropdown>
              </Row>
            )}
          </Col>
        </HeaderRow>
      </HeaderComponent>

      <FixDiv />
    </>
  );
}
