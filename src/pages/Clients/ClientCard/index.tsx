import { Avatar } from "@mui/material";
//@ts-ignore
import style from "./style.module.css";
import { MoreVert } from "@mui/icons-material";
import { IClient } from "../../../shared/interfaces/IClient";

interface Props{
    client: IClient
}

const ClientCard = ({client}:Props) => {

  function getInitials(name: string): string{
    const names = name.split(' ');
    const initials = names[0][0] + names[names.length-1][0];
    return initials.toUpperCase();
  }

  return (
    <div className={style.card}>
      <div className={style.name}>
        <Avatar sx={{bgcolor: "#2d8b82", fontSize: '18px', fontWeight: "700", fontFamily: "nunito", width: '48px', height: '48px'}}>{getInitials(client.nome)}</Avatar>
        <p>{`${client.nome.toUpperCase()}`}</p>
      </div>
      <div className={style.telephone}>
        <p style={{fontWeight: 600}}>(41) 98420-6429</p>
      </div>
      <div className={style.more}>
        <div className={style.button__more}>
            <MoreVert/>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
