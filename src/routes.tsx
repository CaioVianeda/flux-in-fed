import "./App.css";
import GlobalStyles from "./components/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { lazy, Suspense } from "react";

const Panel = lazy(() => import("./pages/Panel"));
const Clients = lazy(() => import("./pages/Panel/Clients"));
const Schedule = lazy(() => import("./pages/Panel/Schedule"));
const Configuration = lazy(() => import("./pages/Configuration"));
const ManageServices = lazy(() => import("./pages/Configuration/ManageServices"));
const ManageEmployees = lazy(() => import("./pages/Configuration/ManageEmployees"));

function AppRoutes() {
  return (
    <RecoilRoot>
       <GlobalStyles />
      <BrowserRouter>
      {/* Criar Fallback */}
        <Suspense fallback={<p>Carregando...</p>}>
            <Routes>
              <Route path="/panel" element={<Panel />}>
                <Route index element={<Schedule />} />
                <Route path="clients" element={<Clients />} />
              </Route>
              <Route path="/configure" element={<Configuration />}>
                <Route index element={<>Minha conta</>} />
                <Route path="manage-services" element={<ManageServices />} />
                <Route path="manage-employees" element={<ManageEmployees />} />
              </Route>
              <Route path="*" element={<h1> Pagina não encontrada</h1>} />
            </Routes>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default AppRoutes;
