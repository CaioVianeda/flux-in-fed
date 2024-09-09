import { Link } from "react-router-dom";
//@ts-ignore
import style from "./style.module.css";

interface Props{
    barber: string,
    barberShop: string,
    pageName: string
}

const Header = ({barber, barberShop, pageName}: Props) => {
  return (
    <header>
      <div className={style.info}>
        <div className={style.icon}/>
        <div className={style.name}>
          <div className={style.name__barber}>{barber}</div>
          <div className={style ["name__barber-shop"]}>{barberShop}</div>
        </div>
      </div>
      <div className={style.title}>{pageName}</div>
      <Link to={'/configure'}> <button>Config</button> </Link>
    </header>
  );
};

export default Header;
