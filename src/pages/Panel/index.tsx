import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";

import style from "./style.module.css";
import { memo, useEffect, useState } from "react";
import http from "../../service/http";
import { IBarberShop } from "../../shared/interfaces/IBarberShop";
import { useRecoilState } from "recoil";
import { employeeState, establishmentState } from "../../state/atom";

const Panel = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useRecoilState(employeeState);
  const [establishment, setEstablishment] = useRecoilState(establishmentState);

  useEffect(() => {
    setLoading(true);
    http
      .get("/barbeiros/3")
      .then((response) => {
        setEmployee(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (employee.id!=='0') {
      http.get<IBarberShop>(`/barbearias/${employee.idBarbearia}`).then((response) => {
        setEstablishment(response.data);
      });
    }
  }, [employee]);

  if (loading) {
    //TODO Criar Tela de Carregamento
    return <div>Carregando...</div>;
  }
  return (
    <main id={style["container__main"]}>
      <NavBar />
      <div className={style["container__section"]}>
        <Header
          pageName={
            location.pathname === "/panel/schedule" ? "Calendario" : "Clientes"
          }
        />
        <Outlet />
      </div>
    </main>
  );
};

export default memo(Panel) ;
