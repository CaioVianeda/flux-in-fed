import style from "./style.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/fluxin-logo.png'
import { CalendarMonth, Delete, People } from "@mui/icons-material";

const NavBar = () => {
  const location = useLocation();
  const isThisPage = (path : string):boolean =>{
    return location.pathname === path;
  }

  return (

    <nav>
      <img src={logo} width={70} alt="Logo da FluxIn"/>
      <Link
        to={""}
        className={style["button__page-navigation"]}
        style={{
          color: isThisPage("/panel") ? "#f9f8eb" : "#000",
        }}
      >
        <CalendarMonth sx={{width: 40, height: 40}}/>
        <p className={style.title}>Agenda</p> 
      </Link>
      <Link
        to={"clients"}
        className={style["button__page-navigation"]}
        style={{
          color: isThisPage("/panel/clients")  ? "#f9f8eb" : "#000",
        }}
      >
        <People sx={{width: 40, height: 40}}/>
        <p className={style.title}>Clientes</p>
      </Link>
    </nav>
  );
};

export default NavBar;
