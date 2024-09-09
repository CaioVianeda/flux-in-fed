import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
//@ts-ignore
import style from "./style.module.css";
import { useEffect, useState } from "react";
import api from "../../service/api";
import { IBarberShop } from "../../shared/interfaces/IBarberShop";
import { IBarber } from "../../shared/interfaces/IBarber";

const Panel = () => {
  const [barber, setBarber] = useState<IBarber>();
  const [barberShop, setBarberShop] = useState<IBarberShop>();

  useEffect(() => {
    api.get("/barbeiros/4").then((response) => {
      setBarber(response.data);
    });
  }, []);

  useEffect(() => {
    if (barber) {
      api.get(`/barbearias/${barber?.idBarbearia}`).then((response) => {
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
          pageName="Calendário"
        />
        <Outlet />
      </div>
    </main>
  );
};

export default Panel;
