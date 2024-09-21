import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
//@ts-ignore
import style from "./style.module.css";
import { useEffect, useState } from "react";
import http from "../../service/http";
import { IBarberShop } from "../../shared/interfaces/IBarberShop";
import { IBarber } from "../../shared/interfaces/IBarber";

const Panel = () => {
  const location = useLocation();
  const [barber, setBarber] = useState<IBarber>();
  const [barberShop, setBarberShop] = useState<IBarberShop>();

  useEffect(() => {
    http.get("/barbeiros/3").then((response) => {
      setBarber(response.data);
    });
  }, []);

  useEffect(() => {
    if (barber) {
      http.get(`/barbearias/${barber?.idBarbearia}`).then((response) => {
        setBarberShop(response.data);
      });
    }
  }, [barber]);

  return (
    <main id={style["container__main"]}>
      <NavBar />
      <div className={style["container__section"]}>
        <Header
          barber={`${barber?.nome}`}
          barberShop={`${barberShop?.nome}`}
          pageName= {location.pathname === '/panel/schedule' ? 'Calendario' : 'Clientes'}
        />
        <Outlet/>
      </div>
    </main>
  );
};

export default Panel;
