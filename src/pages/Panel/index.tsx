import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";

import style from "./style.module.css";
import { memo, useEffect, useState } from "react";
import http from "../../service/http";
import { IBarberShop } from "../../shared/interfaces/IBarberShop";
import { useRecoilState, useSetRecoilState } from "recoil";
import { employeeState, establishmentState } from "../../state/atom";
import { useEmployee } from "../../state/hooks/useEmployee/useEmployee";

const Panel = () => {
  const location = useLocation();
  const employee = useEmployee();
  const setEmployee = useSetRecoilState(employeeState)
  const [establishment, setEstablishment] = useRecoilState(establishmentState);

  useEffect(() => {
    http
      .get("/barbeiros/1")
      .then((response) => {
        setEmployee(response.data);
      });
  }, []);

  useEffect(() => {
    if (employee.id !== '0') {
      http.get<IBarberShop>(`/barbearias/${employee.idBarbearia}`).then((response) => {
        setEstablishment(response.data);
      });
    }
  }, [employee]);

  return (
    <main id={style["container__main"]}>
      <NavBar />
      <div className={style["container__section"]}>
        <Header
          pageName={
            location.pathname === "/panel" ? "Calendario" : "Clientes"
          }
        />
        <Outlet />
      </div>
    </main>
  );
};

export default memo(Panel) ;
