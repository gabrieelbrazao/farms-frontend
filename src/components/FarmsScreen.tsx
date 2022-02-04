import {
  Button,
  Col,
  Layout,
  Row,
  Tag,
  Tooltip,
  Table,
  message,
  Space,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setDrawerIsVisible } from "@app/store/slices/misc";
import api from "@app/services/api";
import {
  deleteFarm,
  setEditingId,
  setTableLoading,
} from "@app/store/slices/farms";

const { Content } = Layout;

const sorterString = (a: string, b: string) => a.localeCompare(b);
const sorterNumber = (a: number, b: number) => (a > b ? 1 : -1);

const colors = ["purple", "blue", "green", "red", "magenta", "yellow"];

export function FarmsScreen() {
  const dispatch = useAppDispatch();
  const { data, tableLoading } = useAppSelector((state) => state.farms);

  const handleDeleteFarm = async (id: number) => {
    const key = "delete";

    dispatch(setTableLoading(true));
    message.loading({ content: "Removendo registro...", key });

    const { status } = await api.delete(`/farms/${id}`);

    if (status === 204) {
      dispatch(deleteFarm(id));
      message.success({ content: "Registro removido com sucesso!", key });
    } else {
      message.error({ content: "Erro ao remover registro!", key });
    }

    dispatch(setTableLoading(false));
  };

  const handleEditFarm = async (id: number) => {
    dispatch(setEditingId(id));
    dispatch(setDrawerIsVisible(true));
  };

  const handleCreateFarm = () => {
    dispatch(setEditingId(0));
    dispatch(setDrawerIsVisible(true));
  };

  const columns: ColumnsType<TFarm> = [
    {
      title: "Fazenda",
      dataIndex: "farmName",
      key: "farmName",
      sorter: (a, b) => sorterString(a.farmName, b.farmName),
    },
    {
      title: "Produtor rural",
      dataIndex: "farmerName",
      key: "farmerName",
      sorter: (a, b) => sorterString(a.farmerName, b.farmerName),
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
      sorter: (a, b) => sorterString(a.state.name, b.state.name),
      render: (state) => state.name,
    },
    {
      title: "Área total",
      dataIndex: "totalArea",
      key: "totalArea",
      sorter: (a, b) => sorterNumber(a.totalArea, b.totalArea),
      render: (totalArea) => `${totalArea.toLocaleString()} ha`,
    },
    {
      title: "Área agricultável",
      dataIndex: "agriculturalArea",
      key: "agriculturalArea",
      sorter: (a, b) => sorterNumber(a.agriculturalArea, b.agriculturalArea),
      render: (agriculturalArea) => `${agriculturalArea.toLocaleString()} ha`,
    },
    {
      title: "Área de vegetação",
      dataIndex: "vegetationArea",
      key: "vegetationArea",
      sorter: (a, b) => sorterNumber(a.vegetationArea, b.vegetationArea),
      render: (vegetationArea) => `${vegetationArea.toLocaleString()} ha`,
    },
    {
      title: "Culturas",
      dataIndex: "cultures",
      key: "cultures",
      render: (cultures) => (
        <Space size="small">
          {(cultures as TFarm["cultures"]).map((culture) => (
            <Tag color={colors[culture.id]} key={culture.id}>
              {culture.name.toUpperCase()}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Ações",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <Row>
          <Col span={12}>
            <Tooltip title="Alterar registro">
              <Button type="link" onClick={() => handleEditFarm(id as number)}>
                <EditOutlined />
              </Button>
            </Tooltip>
          </Col>

          <Col span={12}>
            <Tooltip title="Excluir registro">
              <Button
                type="link"
                danger
                onClick={() => handleDeleteFarm(id as number)}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Content style={{ padding: "32px" }}>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateFarm}
          >
            Adicionar registro
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        scroll={{ x: "auto" }}
        loading={tableLoading}
      />
    </Content>
  );
}
