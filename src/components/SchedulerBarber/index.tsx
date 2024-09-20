//@ts-ignore
import style from "./style.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Close } from "@mui/icons-material";
import ServiceForm from "./ServiceForm";
import SelectBarber from "./SelectBarber";
import ClientForm from "./ClientForm";

interface Props {
  isOpen: Boolean;
  onClose: Dispatch<SetStateAction<Boolean>>;
}

const SchedulerBarber = () => {

  const [selectedServices, setSelectedServices] = useState<String[]>([])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Opções Selecionadas:', selectedServices);
  };

  return (
    <div className={style.container}>
      <div className={style.container__form}>
        <div className={style.header}>
          <div className={style.header__info}>
            <div className={style.button}>
              <Close color="action" sx={{ width: "18px" }} />
            </div>
          </div>
          <div className={style.header__status}>Agendado</div>
        </div>
        <div className={style.body}>
          <SelectBarber/>
          <ClientForm/>
          <ServiceForm setSelectedServices={setSelectedServices}/>  
        </div>
      </div>
    </div>
  );
};

export default SchedulerBarber;
