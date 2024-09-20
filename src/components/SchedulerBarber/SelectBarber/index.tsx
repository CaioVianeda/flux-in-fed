import PerfilCard from "../../PerfilCard";
//@ts-ignore
import style from "./style.module.css";

const SelectBarber = () => {
  return (
    <div id={style["select-barber"]}>
        <p className={style.title}>Responsável</p>
        <PerfilCard barber="Caio" barberShop={"Silva's"}/>
    </div>
  );
};

export default SelectBarber;
