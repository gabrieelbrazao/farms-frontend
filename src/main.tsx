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
import { setFarms } from "./store/slices/farms";

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

render(
  <ConfigProvider locale={ptBR}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtores" element={<Farms />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
