import { Layout } from "antd";
import { Header } from "@app/components/Header";
import { DashboardBody } from "@app/components/DashboardBody";
import { Container } from "./styleds";

export function Dashboard() {
  return (
    <Container>
      <Layout>
        <Header />
        <DashboardBody />
      </Layout>
    </Container>
  );
}
