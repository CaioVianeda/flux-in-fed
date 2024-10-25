import { Avatar } from "@mui/material";

import style from "./style.module.css";

interface Props{
    image?: string
    mainInformation: string;
    secondInformation: string;
}

const PerfilCard = ({image, mainInformation,secondInformation}: Props) => {
  return (
    <div className={style.info}>
      <Avatar alt="Foto do Funcionário" sx={{width: 45, height: 45, border: image ? "solid 1px #1e868d" : "none"}} src={image}/>
      <div className={style.name}>
        <div className={style["main__information"]}>{mainInformation}</div>
        <div className={style["second__information"]}>{secondInformation}</div>
      </div>
    </div>
  );
};

export default PerfilCard;
