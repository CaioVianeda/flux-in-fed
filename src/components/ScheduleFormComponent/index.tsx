import { useContext} from "react";
import SelectionCard from "./SelectionCard";
import styled from "styled-components";
import axios from "axios";
//@ts-ignore
import { ScheduleContext } from "../../context/ScheduleContext";
import { IClient } from "../../shared/interfaces/IClient";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;

  button{
    background-color: #000;
    color: #fff;
    width: 700px;
    height: 70px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
  }
`

interface ScheduleFormComponentProps{
  client: IClient 
}

const ScheduleFormComponent = ({client}: ScheduleFormComponentProps) => {


    //@ts-ignore
    const {selectedService, selectedBarber, selectedDateTime, setSelectedService, setSelectedBarber,setSelectedDateTime} = useContext(ScheduleContext);
  
    const toSchedule = () => {
        const body = {
          clienteId: client.id,
          agendaId: selectedBarber.id,
          procedimentosId: [selectedService.id],
          data: selectedDateTime,
        };

       axios.post('http://localhost:8080/atendimento', body)
       .then((response) => alert(`Seu agendamento foi solicitado! Aguarde confirmação `))
       .catch((error) => console.log(`Erro ao solicitar atendimento: ${error}`));

        setSelectedService();
        setSelectedBarber();
        setSelectedDateTime();
     
    };
  
    return (
      <Form>
        <SelectionCard
          typeSelection={"servico"}
          title={`Selecione um serviço`}
          optionSelected={selectedService}
        />
        {selectedService != null && (
          <SelectionCard
            typeSelection={"barbeiro"}
            title={`Selecione um barbeiro`}
            optionSelected={selectedBarber}
          />
        )}
        {selectedBarber != null && (
          <SelectionCard
            typeSelection={"horario"}
            title={`Selecione um horário`}
            optionSelected={selectedDateTime}
          />
        )}
        {selectedDateTime != null && <button onClick={() => toSchedule()}>EFETUAR AGENDAMENTO</button>}
      </Form>
    );
}

export default ScheduleFormComponent;