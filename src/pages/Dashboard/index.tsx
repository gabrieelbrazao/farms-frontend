import { Layout } from "antd";
import { Header } from "@app/components/Header";
import { Dashboard } from "@app/components/Dashboard";
import { Container } from "./styleds";

export default function Page() {
  return (
    <Container>
      <Layout>
        <Header />
        <Dashboard />
      </Layout>
    </Container>
  );
}
