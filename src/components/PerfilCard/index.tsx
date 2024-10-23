import { Avatar } from "@mui/material";

import style from "./style.module.css";

interface Props{
    mainInformation: string;
    secondInformation: string
}

const PerfilCard = ({mainInformation,secondInformation}: Props) => {
  return (
    <div className={style.info}>
      <Avatar alt="Foto do Funcionário" sx={{width: 40, height: 40 }}/>
      <div className={style.name}>
        <div className={style["main__information"]}>{mainInformation}</div>
        <div className={style["second__information"]}>{secondInformation}</div>
      </div>
    </div>
  );
};

export default PerfilCard;
