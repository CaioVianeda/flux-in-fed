import { Avatar } from "@mui/material";
//@ts-ignore
import style from "./style.module.css";

interface Props{
    barber: string;
    barberShop: String
}

const PerfilCard = ({barber,barberShop}: Props) => {
  return (
    <div className={style.info}>
      <Avatar alt="Nome" sx={{width: 40, height: 40 }}/>
      <div className={style.name}>
        <div className={style["name__barber"]}>{barber}</div>
        <div className={style["name__barber-shop"]}>{barberShop}</div>
      </div>
    </div>
  );
};

export default PerfilCard;
