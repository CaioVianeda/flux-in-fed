//@ts-ignore
import style from "./style.module.css";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import ServiceForm from "./ServiceForm";
import SelectBarber from "./SelectBarber";
import ClientForm from "./ClientForm";
import TimeForm from "./TimeForm";
import { IBarber } from "../../../../shared/interfaces/IBarber";
import { IService } from "../../../../shared/interfaces/IService";
import { IClient } from "../../../../shared/interfaces/IClient";
import { IToSchedule } from "../../../../shared/interfaces/IToSchedule";
import http from "../../../../service/http";

interface Props {
  selectedEmployee: IBarber;
  selectedDate: Date;
  setOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SchedulerBarber = ({
  selectedEmployee,
  selectedDate,
  setOpenModal,
}: Props) => {
  const [selectedClient, setSelectedClient] = useState<IClient>();
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);

  const checkFields = (): boolean => {
    if (!selectedClient) {
      alert("Selecione um Cliente!");
      return false;
    } else if (selectedServices.length === 0) {
      alert("Selecione pelo menos um serviço!");
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (checkFields() && selectedClient) {
      const body: IToSchedule = {
        clienteId: Number(selectedClient.id),
        agendaId: Number(selectedEmployee.id),
        procedimentosId: selectedServices.map((service) => service.id),
        data: selectedDate,
      };

      http
        .post("atendimento", body)
        .then(() => alert(`Agendamento feito!`))
        .catch((error) =>
          console.log(`Erro ao solicitar atendimento: ${error}`)
        );

      setOpenModal(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container__form}>
        <div className={style.header}>
          <div className={style.header__info}>
            <div className={style.button} onClick={() => setOpenModal(false)}>
              <Close color="action" sx={{ width: "18px" }} />
            </div>
          </div>
          <div className={style.header__status}>Agendado</div>
        </div>
        <div className={style.body}>
          <SelectBarber employee={selectedEmployee} />
          <ClientForm setSelectedClient={setSelectedClient} />
          <ServiceForm
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
          {selectedServices.length !== 0 && (
            <TimeForm dateSelected={selectedDate} services={selectedServices} />
          )}
          <button onClick={handleSubmit}>Agendar</button>
        </div>
      </div>
    </div>
  );
};

export default SchedulerBarber;
