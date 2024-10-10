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
import useAddSchedule from "../../../../state/hooks/useSchedules/useAddSchedule";
import { ISchedule } from "../../../../shared/interfaces/ISchedule";
import { format } from "date-fns";
import { useAddClient } from "../../../../state/hooks/useClients/useAddClient";

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
  const [selectedClient, setSelectedClient] = useState<IClient>({
    id: "",
    nome: "",
    telefone: "",
  });
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const addSchedule = useAddSchedule();
  const addClient = useAddClient();

  const checkFields = (): boolean => {
    if (selectedClient.telefone === '' || selectedClient.telefone === undefined) {
      alert("Digite o telefone do Cliente!");
      return false;
    }
    else if(selectedClient.telefone.length !== 16){
      alert("Digite um telefone válido!");
      return false;
    }
    else if (selectedClient.nome === '' || selectedClient.nome === undefined) {
      alert("Digite o nome ou selecione um cliente!");
      return false;
    }else if (selectedServices.length === 0) {
      alert("Selecione pelo menos um serviço!");
      return false;
    }
    return true;
  };

  const convertDateToString = (date: Date) => {
    const selectedDate = new Date(date);
    return format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss");
  };
  //   const cleaned = input.replace(/\D/g, "");

  //   if (cleaned.length !== 11) {
  //     throw new Error("Número de telefone inválido");
  //   }

  //   const ddd = cleaned.slice(0, 2);
  //   const firstPart = cleaned.slice(2, 7);
  //   const secondPart = cleaned.slice(7);

  //   return `(${ddd}) ${firstPart}-${secondPart}`;
  // };

  // const createClient = async (client: IClient) => {

  //   if(client.nome === ''){
  //     throw new Error("Nome do cliente não foi preenchido!")
  //   }
  //   const body = {
  //     nome: client.nome,
  //     telefone: formatPhoneNumber(client.telefone),
  //   };

  //   const response = await http.post<IClient>("clientes", body);
  //   setSelectedClient(response.data);
  //   if (!response.data || !response.data.id) {
  //     throw new Error("Erro ao criar o cliente!");
  //   }
  //   return response.data;
  // };

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

   

    if (checkFields() && selectedClient) {
      const newSchedule: IToSchedule = {
        clienteId: await handleClient(),
        agendaId: Number(selectedEmployee.id),
        procedimentosId: selectedServices.map((service) => service.id),
        data: convertDateToString(selectedDate),
      };

      addSchedule(newSchedule);
      alert(`Agendamento feito!`);
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

export default SchedulerBarber;