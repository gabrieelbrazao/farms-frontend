import { Button, Col, Drawer, Input, Row, Select, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;
const { Option } = Select;

export function FarmerDrawer() {
  const [visible, setVisible] = useState(false);

  return (
    <Drawer
      title="Adicionar registro"
      placement="right"
      onClose={() => setVisible(false)}
      visible={visible}
      width={450}
    >
      <Row
        style={{
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Title level={5}>Produtor rural</Title>

        <Row gutter={18}>
          <Col span={12}>
            <Input placeholder="Nome" />
          </Col>

          <Col span={12}>
            <Input placeholder="CPF/CNPJ" />
          </Col>
        </Row>

        <Title level={5} style={{ marginTop: 18 }}>
          Fazenda
        </Title>

        <Row gutter={[18, 18]}>
          <Col span={24}>
            <Input placeholder="Nome" />
          </Col>

          <Col span={12}>
            <Select style={{ width: "100%" }} placeholder="Estado">
              <Option value={1}>São Paulo</Option>
            </Select>
          </Col>

          <Col span={12}>
            <Input placeholder="Cidade" />
          </Col>

          <Col span={12}>
            <Input placeholder="Área agricultável" />
          </Col>

          <Col span={12}>
            <Input placeholder="Área de vegetação" />
          </Col>

          <Col span={24}>
            <Select
              style={{ width: "100%" }}
              placeholder="Culturas"
              mode="multiple"
              allowClear
            >
              <Option value={1}>Trigo</Option>
              <Option value={2}>Soja</Option>
              <Option value={3}>Milho</Option>
            </Select>
          </Col>
        </Row>

        <Row gutter={18} justify="end" style={{ marginTop: "auto" }}>
          <Col>
            <Button>Cancelar</Button>
          </Col>

          <Col>
            <Button type="primary">Salvar</Button>
          </Col>
        </Row>
      </Row>
    </Drawer>
  );
}
