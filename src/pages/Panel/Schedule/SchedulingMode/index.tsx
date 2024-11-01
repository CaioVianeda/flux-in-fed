import style from "./style.module.css";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import ServiceForm from "./ServiceForm";
import SelectBarber from "./SelectBarber";
import ClientForm from "./ClientForm";
import TimeForm from "./TimeForm";
import { IBarber as IEmployee} from "../../../../shared/interfaces/IBarber";
import { IService } from "../../../../shared/interfaces/IService";
import { IClient } from "../../../../shared/interfaces/IClient";
import { IToSchedule } from "../../../../shared/interfaces/IToSchedule";
import useAddSchedule from "../../../../state/hooks/schedules/useAddSchedule";
import { format } from "date-fns";
import { useAddClient } from "../../../../state/hooks/clients/useAddClient";

interface Props {
  selectedEmployee: IEmployee;
  selectedDate: Date;
  setOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SchedulingMode = ({
  selectedEmployee,
  selectedDate,
  setOpenModal,
}: Props) => {
  const [selectedClient, setSelectedClient] = useState<IClient>({
    id: "",
    nome: "",
    telefone: "",
  });
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const addSchedule = useAddSchedule();
  const addClient = useAddClient();

  const checkFields = (): boolean => {
    if (
      selectedClient.telefone === "" ||
      selectedClient.telefone === undefined
    ) {
      alert("Digite o telefone do Cliente!");
      return false;
    } else if (selectedClient.telefone.replace(/\D/g, "").length !== 11) {
      alert("Digite um telefone válido!");
      return false;
    } else if (
      selectedClient.nome === "" ||
      selectedClient.nome === undefined
    ) {
      alert("Digite o nome ou selecione um cliente!");
      return false;
    } else if (selectedServices.length === 0) {
      alert("Selecione pelo menos um serviço!");
      return false;
    }
    return true;
  };

  const handleClient = async (): Promise<number> => {
    let clientId = Number(selectedClient.id);
    if (!selectedClient) {
      throw new Error("Cliente indefinido!");
    }

    if (selectedClient.id === "") {
      const createdClient = await addClient(selectedClient);
      if (createdClient) {
        clientId = Number(createdClient.id);
      }
    }

    return clientId;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
      if (checkFields() && selectedClient) {
        const newSchedule: IToSchedule = {
          clienteId: await handleClient(),
          agendaId: Number(selectedEmployee.id),
          procedimentosId: selectedServices.map((service) => service.id),
          data: selectedDate,
        };
        await addSchedule(newSchedule);
        setOpenModal(false);
      }
      else {
        throw new Error("Algo inesperado aconteceu!")
      }
    }
    catch (erro) {
      alert("Algo deu errado, tente novamente!");
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
          <div className={style.header__status}>Agendar</div>
        </div>
        <div className={style.body}>
          <SelectBarber />
          <ClientForm
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
          />
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

export default SchedulingMode;
