import { IBarber } from "../../../../../shared/interfaces/IBarber";
import PerfilCard from "../../../../../components/PerfilCard";

import style from "./style.module.css";
import { useRecoilValue } from "recoil";
import { employeeState } from "../../../../../state/atom";


const SelectBarber = () => {
  const employee = useRecoilValue(employeeState);
  return (
    <div id={style["select-barber"]}>
      <p className={style.title}>Responsável</p>
      <PerfilCard mainInformation={employee.nome} secondInformation={"Silva's"} />
    </div>
  );
};

export default SelectBarber;
