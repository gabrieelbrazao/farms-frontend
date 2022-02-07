import { Layout } from "antd";
import { Drawer } from "@app/components/Drawer";
import { Header } from "@app/components/Header";
import { FarmsScreen } from "@app/components/FarmsScreen";
import { Container } from "./styleds";

export default function Page() {
  return (
    <>
      <Drawer />

      <Container>
        <Layout>
          <Header />
          <FarmsScreen />
        </Layout>
      </Container>
    </>
  );
}
