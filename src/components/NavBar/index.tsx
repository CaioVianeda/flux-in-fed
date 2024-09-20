//@ts-ignore
import iconSchedule from "../../assets/icon-schedule.png";
//@ts-ignore
import iconScheduleActive from "../../assets/icon-schedule-active.png";
//@ts-ignore
import iconClient from "../../assets/icon-clients.png";
//@ts-ignore
import iconClientActive from "../../assets/icon-clients-active.png";
//@ts-ignore
import style from "./style.module.css";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav>
      <Link
        to={"schedule"}
        className={style["button__page-navigation"]}
        style={{
          color: location.pathname === "/panel/schedule" ? "#fff" : "#000",
          backgroundColor:
            location.pathname === "/panel/schedule" ? "#01C0B0" : "#F3F3F3",
        }}
      >
        <img
          src={ location.pathname === "/panel/schedule" ? iconScheduleActive : iconSchedule}
          width={30}
        />
        <p className={style.title}>Agenda</p>
      </Link>
      <Link
        to={"clients"}
        className={style["button__page-navigation"]}
        style={{
          color: location.pathname === "/panel/clients" ? "#fff" : "#000",
          backgroundColor:
            location.pathname === "/panel/clients" ? "#01C0B0" : "#F3F3F3",
        }}
      >
        <img
          src={location.pathname === "/panel/clients" ? iconClientActive : iconClient}
          width={30}
        />
        <p className={style.title}>Clientes</p>
      </Link>
    </nav>
  );
};

export default NavBar;
