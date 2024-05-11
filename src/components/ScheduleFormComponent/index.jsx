import { useContext, useState } from "react";
import SelectionCardContainer from "./SelectionCardContainer";
import styled from "styled-components";
import axios from "axios";
import { ScheduleContext } from "../../context/ScheduleContext";

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

const ScheduleFormComponent = ({client}) => {

    const {selectedService, selectedBarber, selectedDateTime, setSelectedService, setSelectedBarber,setSelectedDateTime} = useContext(ScheduleContext);
  
    const toSchedule = () => {
        const body = {
          clienteId: client.id,
          agendaId: selectedBarber.id,
          procedimentosId: [selectedService.id],
          data: selectedDateTime,
        };
        console.log(body);

       axios.post('http://localhost:8080/atendimento', body)
       .then((response) => alert(`Seu agendamento foi solicitado! Aguarde confirmação `))
       .catch((error) => console.log(`Erro ao solicitar atendimento: ${error}`));

        setSelectedService();
        setSelectedBarber();
        setSelectedDateTime();
     
    };
  
    return (
      <Form>
        <SelectionCardContainer
          typeSelection={"servico"}
          title={`Selecione um serviço`}
          optionSelected={selectedService}
        />
        {selectedService != null && (
          <SelectionCardContainer
            typeSelection={"barbeiro"}
            title={`Selecione um barbeiro`}
            optionSelected={selectedBarber}
          />
        )}
        {selectedBarber != null && (
          <SelectionCardContainer
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