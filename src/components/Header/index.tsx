import { Link } from "react-router-dom";
import style from "./style.module.css";
import PerfilCard from "../PerfilCard";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilValue } from "recoil";
import { employeeState, establishmentState } from "../../state/atom";

interface Props {
  pageName: string;
}

const Header = ({ pageName }: Props) => {
  
  const employee = useRecoilValue(employeeState);
  const establishment = useRecoilValue(establishmentState);

  return (
    <header>
      <PerfilCard mainInformation={employee.nome.split(' ')[0]} secondInformation={establishment.nome} />
      <div className={style.title}>{pageName}</div>
      <div className={style.options}>
        <Link to={"/configure"}>
          <span id={style["button-inner"]}>
            <SettingsIcon/>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default  Header;
