import { render } from "react-dom";
import { Provider } from "react-redux";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import App from "./pages";
import { store } from "./store";
import "antd/dist/antd.css";
import "./styles/global.css";

render(
  <ConfigProvider locale={ptBR}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
