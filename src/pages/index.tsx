import { useState } from "react";
import { Button, Col, Layout, Row, Tag, Tooltip, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { CustomSider } from "@app/components/CustomSider";
import { FarmerDrawer } from "@app/components/FarmerDrawer";
import { Header } from "@app/components/Header";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const { Content } = Layout;

const sorterString = (a: string, b: string) => a.localeCompare(b);
const sorterNumber = (a: number, b: number) => (a > b ? 1 : -1);

const dataSource = [
  {
    key: 1,
    farm: "Teste 1",
    farmer: "Teste 1",
    cpfCnpj: "Teste 1",
    city: "Teste 1",
    state: "Teste 1",
    totalArea: 1,
    agriculturalArea: 2,
    vegetationArea: 1,
    cultures: ["Trigo", "Soja"],
  },
  {
    key: 2,
    farm: "Teste 2",
    farmer: "Teste 2",
    cpfCnpj: "Teste 2",
    city: "Teste 2",
    state: "Teste 2",
    totalArea: 2,
    agriculturalArea: 1,
    vegetationArea: 2,
    cultures: ["Trigo", "Algodão"],
  },
];

const columns: ColumnsType<ArrayElement<typeof dataSource>> = [
  {
    title: "Fazenda",
    dataIndex: "farm",
    key: "farm",
    sorter: (a, b) => sorterString(a.farm, b.farm),
  },
  {
    title: "Produtor rural",
    dataIndex: "farmer",
    key: "farmer",
    sorter: (a, b) => sorterString(a.farmer, b.farmer),
  },
  {
    title: "CPF/CNPJ",
    dataIndex: "cpfCnpj",
    key: "cpfCnpj",
    sorter: (a, b) => sorterString(a.cpfCnpj, b.cpfCnpj),
  },
  {
    title: "Cidade",
    dataIndex: "city",
    key: "city",
    sorter: (a, b) => sorterString(a.city, b.city),
  },
  {
    title: "Estado",
    dataIndex: "state",
    key: "state",
    sorter: (a, b) => sorterString(a.state, b.state),
  },
  {
    title: "Área total",
    dataIndex: "totalArea",
    key: "totalArea",
    sorter: (a, b) => sorterNumber(a.totalArea, b.totalArea),
  },
  {
    title: "Área agricultável",
    dataIndex: "agriculturalArea",
    key: "agriculturalArea",
    sorter: (a, b) => sorterNumber(a.agriculturalArea, b.agriculturalArea),
  },
  {
    title: "Área de vegetação",
    dataIndex: "vegetationArea",
    key: "vegetationArea",
    sorter: (a, b) => sorterNumber(a.vegetationArea, b.vegetationArea),
  },
  {
    title: "Culturas",
    dataIndex: "cultures",
    key: "cultures",
    render: (cultures) => (
      <span>
        {(cultures as string[]).map((culture) => {
          let color = "purple";

          if (culture === "Trigo") color = "geekblue";
          else if (culture === "Soja") color = "green";
          else if (culture === "Algodão") color = "volcano";

          return (
            <Tag color={color} key={culture}>
              {culture.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: "Ações",
    dataIndex: "",
    key: "x",
    render: () => (
      <>
        <Tooltip title="Alterar registro">
          <Button type="link">
            <EditOutlined />
          </Button>
        </Tooltip>

        <Tooltip title="Excluir registro">
          <Button type="link" danger>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </>
    ),
  },
];

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <FarmerDrawer />

      <Layout style={{ minHeight: "100vh" }}>
        <CustomSider />

        <Layout>
          <Header />

          <Content style={{ padding: "32px" }}>
            <Row justify="end" style={{ marginBottom: 16 }}>
              <Col>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setVisible(true)}
                >
                  Adicionar registro
                </Button>
              </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
