//@ts-ignore
import style from "./style.module.css";

interface Props{
    barber: string;
    barberShop: String
}

const PerfilCard = ({barber,barberShop}: Props) => {
  return (
    <div className={style.info}>
      <div className={style.icon} />
      <div className={style.name}>
        <div className={style["name__barber"]}>{barber}</div>
        <div className={style["name__barber-shop"]}>{barberShop}</div>
      </div>
    </div>
  );
};

export default PerfilCard;
