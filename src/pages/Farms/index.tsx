import { Layout } from "antd";
import { Drawer } from "@app/components/Drawer";
import { Header } from "@app/components/Header";
import { FarmsBody } from "@app/components/FarmsBody";
import { Container } from "./styleds";

export function Farms() {
  return (
    <>
      <Drawer />

      <Container>
        <Layout>
          <Header />
          <FarmsBody />
        </Layout>
      </Container>
    </>
  );
}
