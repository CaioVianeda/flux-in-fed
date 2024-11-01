import { Avatar } from "@mui/material";
import style from "./style.module.css";
import { useEstablishment } from "../../../state/hooks/establishment/useEstablishment";
import { useEmployee } from "../../../state/hooks/employee/useEmployee";

const ManageAccount = () => {
  const employee = useEmployee();
  const establish = useEstablishment();
  return (
    <div id={style.container}>
      <div id={style.informations}>
        <div id={style.informations__header}>
          <Avatar
            sx={{ width: 80, height: 80 }}
            src="../../../../images/employee/employee.jpg"
          />
          <div>
            <p>
              <b>Nome:</b> {employee.nome}
            </p>
            <p>
              <b>Estabelecimento:</b> {establish.nome}
            </p>
          </div>
        </div>
        <div id={style.informations__body}>
          <p>
            <b>Email:</b>
            {`${employee.email}`}
          </p>
          <p>
            <b>Telefone:</b>
            {`${employee.telefone}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
