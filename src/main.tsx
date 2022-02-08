import { render } from "react-dom";
import { Provider } from "react-redux";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider, message } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
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

ConfigProvider.config({
  theme,
});

(async () => {
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
})();

(async () => {
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
})();

render(
  <ConfigProvider locale={ptBR}>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/produtores" element={<Farms />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
