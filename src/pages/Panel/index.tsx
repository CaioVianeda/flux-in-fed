import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";

import style from "./style.module.css";
import { memo, useEffect } from "react";
import http from "../../service/http";
import { IBarberShop } from "../../shared/interfaces/IBarberShop";
import {  useSetRecoilState } from "recoil";
import { employeeState, establishmentState } from "../../state/atom";
import { useEmployee } from "../../state/hooks/useEmployee/useEmployee";
import { pagesTitle } from "../../utils/constants/constants";

const Panel = () => {
  const location = useLocation();
  const employee = useEmployee();
  const setEmployee = useSetRecoilState(employeeState)
  const setEstablishment = useSetRecoilState(establishmentState);

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
    <div id={style["container__main"]}>
      <NavBar />
      <div id={style["container__section"]}>
        <Header
          pageName={
            pagesTitle[`${location.pathname}`]
          }
        />
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Panel) ;
