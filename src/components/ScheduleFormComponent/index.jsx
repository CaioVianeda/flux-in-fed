import { useState } from "react";
import SelectionCardContainer from "./SelectionCardContainer";
import styled from "styled-components";

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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const ScheduleFormComponent = () => {
    const [selectedService, setSelectedService] = useState();
    const [selectedBarber, setSelectedBarber] = useState();
    const [selectedDateTime, setSelectedDateTime] = useState();
  
    const handleSelectedService = (service) => {
      setSelectedService(service);
    };
    const handleSelectedBarber = (barber) => {
      setSelectedBarber(barber);
    };
    const handleSelectedTimeAndDate = (timeAndDate) => {
      setSelectedDateTime(timeAndDate);
      console.log("chamou")
    };
  
    const toSchedule = async () => {
  
      try {
        const body = {
          clienteId: "1",
          agendaId: selectedBarber.id,
          procedimentosId: [selectedService.id],
          data: selectedDateTime,
        };
        // const response = await axios.post("/atendimento", body);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    };
  
    return (
      <Form>
        <SelectionCardContainer
          typeSelection={"servico"}
          title={`Selecione um serviço`}
          selectedService={handleSelectedService}
          optionSelected={selectedService}
        />
        {selectedService != null && (
          <SelectionCardContainer
            typeSelection={"barbeiro"}
            title={`Selecione um barbeiro`}
            selectedBarber={handleSelectedBarber}
            optionSelected={selectedBarber}
          />
        )}
        {selectedBarber != null && (
          <SelectionCardContainer
            typeSelection={"horario"}
            title={`Selecione um horário`}
            selectedTimeAndDate={handleSelectedTimeAndDate}
            optionSelected={selectedDateTime}
          />
        )}
        {/* {selectedDateTime != null && <ScheduleButtonComponent toSchedule={toSchedule} timeAndDate={selectedDateTime}>EFETUAR AGENDAMENTO</ScheduleButtonComponent>} */}
        {selectedDateTime != null && <button onClick={() => toSchedule()}>EFETUAR AGENDAMENTO</button>}
      </Form>
    );
}

export default ScheduleFormComponent;