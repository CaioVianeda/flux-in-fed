import { IBarber } from "../../../../../shared/interfaces/IBarber";
import PerfilCard from "../../../../../components/PerfilCard";
//@ts-ignore
import style from "./style.module.css";

interface Props {
  employee: IBarber
}

const SelectBarber = ({ employee }: Props) => {
  return (
    <div id={style["select-barber"]}>
      <p className={style.title}>Responsável</p>
      <PerfilCard barber={employee.nome} barberShop={"Silva's"} />
    </div>
  );
};

export default SelectBarber;
