/* eslint-disable react/no-unstable-nested-components */
import {
  Button,
  Col,
  Row,
  Tag,
  Tooltip,
  message,
  Space,
  Grid,
  Input,
  TablePaginationConfig,
  Table,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setDrawerIsVisible } from "@app/store/slices/drawer";
import api from "@app/services/api";
import {
  deleteFarm,
  setEditingId,
  setTableLoading,
} from "@app/store/slices/farms";
import { Key, ReactNode, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  FilterConfirmProps,
  FilterDropdownProps,
  FilterValue,
} from "antd/lib/table/interface";
import { theme } from "@app/theme";
import { Container } from "./styleds";

const { useBreakpoint } = Grid;

const sorterString = (a: string, b: string) => a.localeCompare(b);
const sorterNumber = (a: number, b: number) => (a > b ? 1 : -1);

const colors = ["purple", "blue", "green", "red", "magenta", "yellow"];

export function FarmsScreen() {
  const [searchText, setSearchText] = useState<Key>();
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const dispatch = useAppDispatch();
  const { data, tableLoading } = useAppSelector((state) => state.farms);

  const searchInput = useRef<Input | null>(null);

  const screens = useBreakpoint();

  const currentBrakePoint =
    Object.entries(screens).find((screen) => !!screen[1])?.[0] ?? "xs";

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

  const handleSearch = (
    selectedKeys: Key[],
    confirm: (param?: FilterConfirmProps | undefined) => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: (() => void) | undefined) => {
    if (clearFilters) clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: keyof Omit<TFarm, "cultures">) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Digite aqui"
          value={selectedKeys[0]}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
          ref={(node) => {
            if (searchInput && node) searchInput.current = node;
          }}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Pesquisar
          </Button>

          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 100 }}
          >
            Apagar
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: ReactNode | ((filtered: boolean) => ReactNode)) => (
      <SearchOutlined
        style={{ color: filtered ? theme.primaryColor : undefined }}
      />
    ),
    onFilter: (value: string | number | boolean, record: TFarm) => {
      let text = record[dataIndex];

      if (dataIndex === "state") {
        text = (
          text as {
            id: number;
            name: string;
          }
        ).name;
      } else if (
        ["agriculturalArea", "vegetationArea", "totalArea"].includes(dataIndex)
      ) {
        text = `${text?.toLocaleString()} ha`;
      }

      return text
        ? text
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false;
    },
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100);
    },
    render: (text: TFarm[keyof Omit<TFarm, "cultures">]) => {
      let render = text;

      if (dataIndex === "state") {
        render = (text as TFarm["state"]).name;
      } else if (
        ["agriculturalArea", "vegetationArea", "totalArea"].includes(dataIndex)
      ) {
        render = `${text?.toLocaleString()} ha`;
      }

      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#c6d5cf", padding: 0 }}
          searchWords={[searchText as string]}
          autoEscape
          textToHighlight={render?.toString() || ""}
        />
      ) : (
        render
      );
    },
  });

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    setFilteredInfo(filters);
  };

  const columns: ColumnsType<TFarm> = [
    {
      title: "Fazenda",
      dataIndex: "farmName",
      key: "farmName",
      filteredValue: filteredInfo.farmName,
      sorter: (a, b) => sorterString(a.farmName, b.farmName),
      ...getColumnSearchProps("farmName"),
    },
    {
      title: "Produtor rural",
      dataIndex: "farmerName",
      key: "farmerName",
      filteredValue: filteredInfo.farmerName,
      sorter: (a, b) => sorterString(a.farmerName, b.farmerName),
      ...getColumnSearchProps("farmerName"),
    },
    {
      title: "CPF/CNPJ",
      dataIndex: "cpfCnpj",
      key: "cpfCnpj",
      filteredValue: filteredInfo.cpfCnpj,
      sorter: (a, b) => sorterString(a.cpfCnpj, b.cpfCnpj),
      ...getColumnSearchProps("cpfCnpj"),
    },
    {
      title: "Cidade",
      dataIndex: "city",
      key: "city",
      filteredValue: filteredInfo.city,
      sorter: (a, b) => sorterString(a.city, b.city),
      ...getColumnSearchProps("city"),
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      filteredValue: filteredInfo.state,
      sorter: (a, b) => sorterString(a.state.name, b.state.name),
      ...getColumnSearchProps("state"),
    },
    {
      title: "Área total",
      dataIndex: "totalArea",
      key: "totalArea",
      filteredValue: filteredInfo.totalArea,
      sorter: (a, b) => sorterNumber(a.totalArea, b.totalArea),
      ...getColumnSearchProps("totalArea"),
    },
    {
      title: "Área agricultável",
      dataIndex: "agriculturalArea",
      key: "agriculturalArea",
      filteredValue: filteredInfo.agriculturalArea,
      sorter: (a, b) => sorterNumber(a.agriculturalArea, b.agriculturalArea),
      ...getColumnSearchProps("agriculturalArea"),
    },
    {
      title: "Área de vegetação",
      dataIndex: "vegetationArea",
      key: "vegetationArea",
      filteredValue: filteredInfo.vegetationArea,
      sorter: (a, b) => sorterNumber(a.vegetationArea, b.vegetationArea),
      ...getColumnSearchProps("vegetationArea"),
    },
    {
      title: "Culturas",
      dataIndex: "cultures",
      key: "cultures",
      filters: [
        { text: "Soja", value: "Soja" },
        { text: "Milho", value: "Milho" },
        { text: "Algodão", value: "Algodão" },
        { text: "Café", value: "Café" },
        { text: "Cana de Açucar", value: "Cana de Açucar" },
      ],
      filteredValue: filteredInfo.cultures,
      onFilter: (value, record) =>
        record.cultures.map(({ name }) => name).includes(value as string),
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
      key: "actions",
      filteredValue: filteredInfo.actions,
      render: (id) => (
        <>
          <Tooltip title="Alterar registro">
            <Button type="link" onClick={() => handleEditFarm(id as number)}>
              <EditOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Excluir registro">
            <Button
              type="link"
              danger
              onClick={() => handleDeleteFarm(id as number)}
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container
      direction="vertical"
      size={16}
      style={{
        padding: currentBrakePoint === "xs" ? "32px 12px" : 32,
      }}
    >
      <Row justify="end">
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
        onChange={handleChange}
      />
    </Container>
  );
}
