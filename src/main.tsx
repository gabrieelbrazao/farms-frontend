import { render } from "react-dom";
import { Provider } from "react-redux";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import App from "./pages/Index";
import { store } from "./store";
import "antd/dist/antd.variable.min.css";

export const theme = {
  primaryColor: "#41725E",
};

ConfigProvider.config({
  theme,
});

render(
  <ConfigProvider locale={ptBR}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
