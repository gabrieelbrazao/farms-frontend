import { Button, Col, Dropdown, Grid, Row } from "antd";
import {
  MenuOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  DesktopMenu,
  FixDiv,
  HeaderComponent,
  HeaderRow,
  MobileMenu,
} from "./styleds";
import logo from "../../assets/logo.png";

const { useBreakpoint } = Grid;

export function Header() {
  const navigate = useNavigate();

  const screens = useBreakpoint();

  const currentBrakePoint =
    Object.entries(screens).find((screen) => !!screen[1])?.[0] ?? "xs";

  return (
    <>
      <HeaderComponent>
        <HeaderRow align="middle" gutter={24}>
          <Col>
            <img src={logo} alt="" height="48px" />
          </Col>

          <Col flex={1}>
            {currentBrakePoint !== "xs" ? (
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
