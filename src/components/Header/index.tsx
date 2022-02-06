import { Button, Col, Dropdown, Grid, Row } from "antd";
import {
  MenuOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setCurrentPage } from "@app/store/slices/misc";
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
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.misc);

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
                selectedKeys={[currentPage]}
                onSelect={({ key }) => dispatch(setCurrentPage(key))}
                mode="horizontal"
              >
                <MobileMenu.Item key="Dashboard">Dashboard</MobileMenu.Item>
                <MobileMenu.Item key="Produtores rurais">
                  Produtores rurais
                </MobileMenu.Item>
              </DesktopMenu>
            ) : (
              <Row justify="end">
                <Dropdown
                  overlay={
                    <div>
                      <MobileMenu
                        selectedKeys={[currentPage]}
                        onSelect={({ key }) => dispatch(setCurrentPage(key))}
                      >
                        <MobileMenu.Item
                          key="Dashboard"
                          icon={<PieChartOutlined />}
                        >
                          Dashboard
                        </MobileMenu.Item>

                        <MobileMenu.Item
                          key="Produtores rurais"
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
