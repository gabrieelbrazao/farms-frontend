import { Layout, message } from "antd";
import { Sider } from "@app/components/Sider";
import { Drawer } from "@app/components/Drawer";
import { Header } from "@app/components/Header";
import { FarmsScreen } from "@app/components/FarmsScreen";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { Dashboard } from "@app/components/Dashboard";
import api from "@app/services/api";
import { setFarms } from "@app/store/slices/farms";
import { useEffect } from "react";

export default function App() {
  const { siderSelectedKeys } = useAppSelector((state) => state.misc);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const key = "dashboard";

    message.loading({
      content: "Carregando dados...",
      key,
    });

    api.get("/farms").then(({ data: farms }) => {
      dispatch(setFarms(farms));

      message.success({
        content: "Dados carregados com sucesso!",
        key,
      });
    });
  }, []);

  return (
    <>
      <Drawer />

      <Layout style={{ minHeight: "100vh" }}>
        <Sider />

        <Layout>
          <Header />
          {siderSelectedKeys[0] === "2" ? <FarmsScreen /> : <Dashboard />}
        </Layout>
      </Layout>
    </>
  );
}
