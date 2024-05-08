import styled from "styled-components";
import "./App.css";
import GlobalStyles from "./components/GlobalStyles";
import Scheduling from "./pages/Scheduling";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const BackgroundApp = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function AppRoutes() {
  return (
    <BackgroundApp>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/agendar" element={<Scheduling />} />
          <Route path="*" element={<h1> Pagina não encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </BackgroundApp>
  );
}

export default AppRoutes;
