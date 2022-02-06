import { Layout, Typography, Row, Menu } from "antd";
import styled from "styled-components";

const { Header } = Layout;
const { Title: AntdTitle } = Typography;

export const HeaderComponent = styled(Header)`
  padding: 0 32px;
  z-index: 1;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: #c0c2c4;
  position: fixed;
  width: 100%;
  margin-bottom: 64px;
`;

export const HeaderRow = styled(Row)`
  height: 100%;
`;

export const Title = styled(AntdTitle)`
  color: #fff !important;
  margin: 0 !important;
`;

export const DesktopMenu = styled(Menu)`
  background: transparent;
  border-bottom: transparent;
`;

export const MobileMenu = styled(Menu)`
  background: white;
  border: 1px solid #efefef;
  border-radius: 8px;
  width: 100vw;
`;

export const FixDiv = styled.div`
  margin-top: 64px;
`;
