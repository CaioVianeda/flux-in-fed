import { useState } from "react";
import { ISchedule } from "../../../shared/interfaces/ISchedule";
import "./style.css";

interface Props {
  schedule: ISchedule;
  finishAppointment: (id: number) => void;
  confirmAppointment: (id: number) => void;
}

const ServiceCard = ({
  schedule,
  finishAppointment,
  confirmAppointment,
}: Props) => {
  function showDateOfSchedule(date: Date) {
    return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }/${date.getFullYear()}  ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h`;
  }

  let backgroundColor;
  if (schedule.finalizado) {
    backgroundColor = "#01c120";
  }
  if (schedule.confirmado && !schedule.finalizado) {
    backgroundColor = "#fed545";
  }
  if (!schedule.confirmado) {
    backgroundColor = "#bc0001";
  }

  return (
    <div
      key={schedule.id}
      className="service-card"
      style={{backgroundColor: backgroundColor}}
    >
      <span>{schedule.nomeCliente}</span>
      <span>{showDateOfSchedule(new Date(schedule.data))}</span>
      <div id="service-card__button-container">
        {schedule.confirmado && !schedule.finalizado && (
          <button onClick={() => confirmAppointment(schedule.id)}>
            cancelar
          </button>
        )}
        {!schedule.confirmado && (
          <button onClick={() => confirmAppointment(schedule.id)}>
            confirmar
          </button>
        )}
        {!schedule.finalizado && schedule.confirmado && (
          <button onClick={() => finishAppointment(schedule.id)}>
            finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;