import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setDrawerIsVisible } from "@app/store/slices/drawer";
import MaskedInput from "antd-mask-input";
import {
  Button,
  Col,
  Drawer as AntdDrawer,
  Input,
  message,
  Row,
  Space,
  Select,
  Typography,
  Form,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import api from "@app/services/api";
import { setTableLoading } from "@app/store/slices/farms";
import { useCurrentBreakpoint } from "@app/hooks/useCurrentBreakpoint";

const { Title } = Typography;
const { Option } = Select;

export function Drawer() {
  const currentBreakpoint = useCurrentBreakpoint();

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { drawerIsVisible } = useAppSelector((state) => state.drawer);
  const { editingId, data } = useAppSelector((state) => state.farms);

  const [farmerDocType, setFarmerDocType] = useState("cpf");
  const [states, setStates] = useState([]);
  const [cultures, setCultures] = useState([]);

  const handleSubmit = async (values: TForm) => {
    const key = "create/update";

    dispatch(setTableLoading(true));

    message.loading({
      content: editingId ? "Alterando cadastro" : "Realizando cadastro...",
      key,
    });

    const response = editingId
      ? await api.put(`/farms/${editingId}`, values)
      : await api.post("/farms", values);

    if (response.status === 204) {
      dispatch(setDrawerIsVisible(false));
    } else {
      message.error({
        content: `Erro ao ${editingId ? "alterar" : "realizar"} cadastro!`,
        key,
      });
    }

    dispatch(setTableLoading(false));
  };

  useEffect(() => {
    if (drawerIsVisible) {
      if (!editingId) {
        form.resetFields();
        setFarmerDocType("cpf");
      } else {
        data.forEach((farm) => {
          if (farm.id === editingId) {
            setFarmerDocType(farm.cpf ? "cpf" : "cnpj");

            form.setFieldsValue({
              farmerName: farm.farmerName,
              farmName: farm.farmName,
              cpf: farm.cpf,
              cnpj: farm.cnpj,
              stateId: farm.state.id,
              city: farm.city,
              agriculturalArea: farm.agriculturalArea,
              vegetationArea: farm.vegetationArea,
              cultures: farm.cultures.map((culture) => culture.id),
            });
          }
        });
      }
    }
  }, [drawerIsVisible]);

  useEffect(() => {
    api.get("/states").then((response) => {
      setStates(response.data);
    });

    api.get("/cultures").then((response) => {
      setCultures(response.data);
    });
  }, []);

  return (
    <AntdDrawer
      title={`${editingId ? "Alterar" : "Adicionar"} registro`}
      placement="right"
      onClose={() => dispatch(setDrawerIsVisible(false))}
      visible={drawerIsVisible}
      width={currentBreakpoint === "xs" ? "100%" : 480}
      extra={
        <Space>
          <Button onClick={() => dispatch(setDrawerIsVisible(false))}>
            Cancelar
          </Button>

          <Button type="primary" color="primary" onClick={() => form.submit()}>
            Salvar
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Space direction="vertical" size={16}>
          <div>
            <Title level={5}>Produtor rural</Title>

            <Row gutter={[16, 10]}>
              <Col span={24}>
                <Form.Item
                  name="farmerName"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Input placeholder="Nome" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={farmerDocType}
                  rules={[
                    {
                      required: true,
                      message: "Campo obrigatório",
                    },
                    {
                      pattern:
                        farmerDocType === "cnpj"
                          ? // eslint-disable-next-line no-useless-escape
                            /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
                          : // eslint-disable-next-line no-useless-escape
                            /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                      message: `${farmerDocType.toLocaleUpperCase()} inválido`,
                    },
                  ]}
                >
                  <MaskedInput
                    addonBefore={
                      <Select value={farmerDocType} onChange={setFarmerDocType}>
                        <Option value="cpf">CPF</Option>
                        <Option value="cnpj">CNPJ</Option>
                      </Select>
                    }
                    mask={
                      farmerDocType === "cnpj"
                        ? "11.111.111/1111-11"
                        : "111.111.111-11"
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div>
            <Title level={5}>Fazenda</Title>

            <Row gutter={[16, 10]}>
              <Col span={24}>
                <Form.Item
                  name="farmName"
                  rules={[
                    {
                      required: true,
                      message: "Campo obrigatório",
                    },
                  ]}
                >
                  <Input placeholder="Nome" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="stateId"
                  rules={[
                    {
                      required: true,
                      message: "Campo obrigatório",
                    },
                  ]}
                >
                  <Select placeholder="Estado">
                    {states.map(({ id, name }) => (
                      <Option value={id} key={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Campo obrigatório",
                    },
                  ]}
                >
                  <Input placeholder="Cidade" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="agriculturalArea"
                  rules={[
                    {
                      required: true,
                      message: "Campo obrigatório",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Área agricultável"
                    addonAfter="ha"
                    width="100%"
                    min={0.1}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="vegetationArea"
                  rules={[
                    {
                      required: true,
                      message: "Campo obrigatório",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Área de vegetação"
                    addonAfter="ha"
                    min={0.1}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="cultures"
                  rules={[
                    {
                      required: true,
                      message: "Campo obrigatório",
                    },
                  ]}
                >
                  <Select placeholder="Culturas" mode="multiple" allowClear>
                    {cultures.map(({ id, name }) => (
                      <Option value={id} key={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Space>
      </Form>
    </AntdDrawer>
  );
}
