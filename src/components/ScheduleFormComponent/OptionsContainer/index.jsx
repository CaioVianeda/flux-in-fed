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

const OptionsContainer = (props) => {
  let currentDate = new Date();
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(currentDate.getDate()).padStart(2, "0")}`
  );
  const servicos = [
    {
      id: 1,
      name: "Corte",
      price: 35.0,
    },
    {
      id: 2,
      name: "Barba",
      price: 35.0,
    },
    {
      id: 3,
      name: "Corte e Barba",
      price: 70.0,
    },
  ];

  const barbeiros = [
    {
      id: null,
      name: "Sem Preferência",
      phone: "(41)984206429",
      email: "email_do_barbeiro3@gmail.com",
    },
    {
      id: 1,
      name: "Barbeiro1",
      phone: "41984206429",
      email: "email_do_barbeiro1@gmail.com",
    },
    {
      id: 2,
      name: "Barbeiro2",
      phone: "41984206429",
      email: "email_do_barbeiro1@gmail.com",
    },
  ];

  const weekNames = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

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

  if (props.typeSelection === "servico") {
    return (
      <Options>
        {servicos.map((item) => (
          <OptionComponent
            selectedService={props.selectedService}
            key={item.id}
            id={item.id}
            options={item}
            typeSelection={props.typeSelection}
          />
        ))}
      </Options>
    );
  }

  if (props.typeSelection === "barbeiro") {
    return (
      <Options>
        {barbeiros.map((item) => (
          <OptionComponent
            selectedBarber={props.selectedBarber}
            key={item.id}
            options={item}
            typeSelection={props.typeSelection}
          />
        ))}
      </Options>
    );
  }

  if (props.typeSelection === "horario") {
    return (
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
  }
};

export default OptionsContainer;
