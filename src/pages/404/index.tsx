import { Button, Col, Result, Row } from "antd";

export function NotFound() {
  return (
    <Row align="middle" justify="center" style={{ height: "100vh" }}>
      <Col>
        <Result
          status="404"
          title="404"
          subTitle="Desculpe, a página que você visitou não existe."
          extra={
            <Button
              type="primary"
              onClick={() => window.location.replace("/dashboard")}
            >
              Voltar para o dashboard
            </Button>
          }
        />
      </Col>
    </Row>
  );
}
