import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  setSiderIsCollapsed,
  setSiderSelectedKeys,
} from "@app/store/slices/misc";
import { Layout, Menu } from "antd";

const { Sider: AntdSider } = Layout;

export function Sider() {
  const dispatch = useAppDispatch();

  const { siderIsCollapsed, siderSelectedKeys } = useAppSelector(
    (state) => state.misc
  );

  return (
    <AntdSider
      collapsible
      collapsed={siderIsCollapsed}
      onCollapse={(value) => dispatch(setSiderIsCollapsed(value))}
      trigger={null}
    >
      <Menu
        mode="vertical"
        selectedKeys={siderSelectedKeys}
        onSelect={({ key }) => dispatch(setSiderSelectedKeys([key]))}
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>

        <Menu.Item key="2" icon={<TeamOutlined />}>
          Produtores rurais
        </Menu.Item>
      </Menu>
    </AntdSider>
  );
}
