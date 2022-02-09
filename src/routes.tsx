import { BrowserRouter, Route, Routes as Wrapper } from "react-router-dom";
import { NotFound } from "./pages/404";
import { Dashboard } from "./pages/Dashboard";
import { Farms } from "./pages/Farms";

export function Routes() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtores" element={<Farms />} />
        <Route path="*" element={<NotFound />} />
      </Wrapper>
    </BrowserRouter>
  );
}
