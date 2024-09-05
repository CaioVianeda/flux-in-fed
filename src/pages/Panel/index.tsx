import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import {Outlet} from 'react-router-dom'
//@ts-ignore
import style from './style.module.css'

const Panel = () => {
  return (
    <main id={style["container__main"]} >
      <NavBar />
      <div className={style["container__section"]}>
        <Header barber="Igor" barberShop="Silva's" pageName="Calendário"/>
        <Outlet/>
      </div>
    </main>
  );
};

export default Panel;
