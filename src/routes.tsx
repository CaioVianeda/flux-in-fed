import styled from "styled-components";
import "./App.css";
import GlobalStyles from "./components/GlobalStyles";
import Scheduling from "./pages/Scheduling";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//@ts-ignore
import ScheduleProvider from "./context/ScheduleContext";
import Schedule from "./pages/Panel/Schedule";
import Clients from "./pages/Panel/Clients";
import Panel from "./pages/Panel";
import Configuration from "./pages/Configuration";
import ManageServices from "./pages/Configuration/ManageServices";
import ManageEmployees from "./pages/Configuration/ManageEmployees";
import { RecoilRoot } from "recoil";

const BackgroundApp = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function AppRoutes() {
  return (
    <BackgroundApp>
      <GlobalStyles />
      <RecoilRoot>
        <BrowserRouter>
          <ScheduleProvider>
            <Routes>
              <Route path="/panel" element={<Panel />}>
                <Route path="clients" element={<Clients />} />
                <Route path="schedule" element={<Schedule />} />
              </Route>
              <Route path="/agendar" element={<Scheduling />} />
              <Route path="/configure" element={<Configuration />}>
                <Route path="my-account" element={<>Minha conta</>} />
                <Route path="customize" element={<>Configurações Gerais</>} />
                <Route path="manage-services" element={<ManageServices />} />
                <Route path="manage-employees" element={<ManageEmployees />} />
              </Route>
              <Route path="*" element={<h1> Pagina não encontrada</h1>} />
            </Routes>
          </ScheduleProvider>
        </BrowserRouter>
      </RecoilRoot>
    </BackgroundApp>
  );
}

export default AppRoutes;
