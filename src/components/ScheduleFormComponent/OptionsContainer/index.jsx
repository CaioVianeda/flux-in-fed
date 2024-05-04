import { useEffect, useState } from "react";
import ScheduleOption from "../ScheduleOption";
import OptionComponent from "../OptionComponent";
import DatePicker from "../DatePicker";
import api from "../../../service/api";
import styled from "styled-components";

const Options = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

const DateAndTimeSelect = styled.div`
  width: 100%;
  .date__time {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  select {
    font-size: 16px;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-top: 15px;
    gap: 15px;
    font-weight: 500;
  }

  option {
    font-size: 18px;
  }
`;

const weekNames = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

const OptionsContainer = (props) => {
  let currentDate = new Date();
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(currentDate.getDate()).padStart(2, "0")}`
  );
  const [barbers, setBarbers] = useState([{
    id: 0,
    nome: "Sem Preferência",
    telefone: "(41)984206429",
    email: "email_do_barbeiro3@gmail.com",
  }])
  const [services, setServices] = useState([{
    id: 3,
    nome: "Corte e Barba",
    preco: 70.0,
  }])

  useEffect(() => {

    api.get('/barbeiros')
    .then((response) => {
      setBarbers([...barbers, ...response.data]);
    })
    .catch((error) => {
      console.log("Erro ao buscar barbeiros: " + error);
    })

    api.get('/procedimentos')
    .then((response) => {
      setServices([...response.data, ...services]);
    })
    .catch((error) => {
      console.log("Erro ao buscar barbeiros: " + error);
    })
  }, [])

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const handleSelectedTime = (time) => {
    props.selectedTimeAndDate(`${selectedDate}T${time}`);
    const timeDate = new Date(`${selectedDate}T${time}`);
    props.handleSelectedTimeAndDateToShow(
      `${weekNames[timeDate.getDay()]}, ${String(timeDate.getDate()).padStart(
        2,
        "0"
      )}/${String(timeDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${timeDate.getFullYear()} às ${time}`
    );
  };  

  useEffect(() => {
    api
      .get(`/barbeiros/1/horarios?dia=${selectedDate}`)
      .then((response) => setSchedules(response.data));
  }, [selectedDate]);

  const renderOptions = (array) => {
    return (
      array.map((item) => (
        <OptionComponent
          selected={props.selectedOption}
          key={item.id}
          id={item.id}
          option={item}  
          typeSelection={props.typeSelection}
        />
      ))
    )
  }

    return (
      props.typeSelection !== "horario" 
      ?
      <Options>
        {renderOptions(props.typeSelection === "servico" ? services : barbers)}
      </Options>
      :
      <DateAndTimeSelect>
      <DatePicker selectedDate={handleSelectedDate} />
      <div className="date__time">
        {schedules.map((item) => (
          <ScheduleOption
            key={item}
            time={item}
            selectedTime={handleSelectedTime}
          />
        ))}
      </div>
    </DateAndTimeSelect>
    );
};

export default OptionsContainer;
