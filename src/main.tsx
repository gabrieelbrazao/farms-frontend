import { render } from "react-dom";
import { Provider } from "react-redux";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider, message } from "antd";
import { store } from "./store";
import { theme } from "./theme";
import "antd/dist/antd.variable.min.css";
import api from "./services/api";
import {
  createFarm,
  deleteFarm,
  setFarms,
  updateFarm,
} from "./store/slices/farms";
import { socket, SocketContext } from "./context/socket";
import { Routes } from "./routes";

ConfigProvider.config({
  theme,
});

const loadInitialData = async () => {
  const key = "dashboard";

  message.loading({
    content: "Carregando dados...",
    key,
  });

  const { data } = await api.get("/farms");

  store.dispatch(setFarms(data));

  message.success({
    content: "Dados carregados com sucesso!",
    key,
  });
};

const setSocketEvents = async () => {
  socket.on("delete:farm", ({ id }) => {
    store.dispatch(deleteFarm(id));

    message.info({
      content: `Registro ${id} foi removido.`,
      key: "delete",
    });
  });

  socket.on("create:farm", ({ data }: { data: TFarm }) => {
    store.dispatch(createFarm(data));

    message.info({
      content: `Registro ${data.id} foi adicionado.`,
      key: "create/update",
    });
  });

  socket.on("update:farm", ({ data }: { data: TFarm }) => {
    store.dispatch(updateFarm(data));

    message.info({
      content: `Registro ${data.id} foi alterado.`,
      key: "create/update",
    });
  });
};

if (["/dashboard", "/produtores"].includes(window.location.pathname)) {
  loadInitialData();
  setSocketEvents();
}

render(
  <ConfigProvider locale={ptBR}>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <Routes />
      </SocketContext.Provider>
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
