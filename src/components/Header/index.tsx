import { Link } from "react-router-dom";
//@ts-ignore
import style from "./style.module.css";
import PerfilCard from "../PerfilCard";
import SettingsIcon from "@mui/icons-material/Settings";

interface Props {
  barber: string;
  barberShop: string;
  pageName: string;
}

const Header = ({ barber, barberShop, pageName }: Props) => {
  return (
    <header>
      <PerfilCard barber={barber} barberShop={barberShop} />
      <div className={style.title}>{pageName}</div>
      <div className={style.options}>
        <Link to={"/configure"}>
          <span className={style["button-inner"]}>
            <SettingsIcon/>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
