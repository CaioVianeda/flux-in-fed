import { useState } from "react";
import { ISchedule } from "../../../shared/interfaces/ISchedule";

interface Props {
  schedule: ISchedule;
  confirmAppointment: (id: number) => void;
}

const CardAtendimento = ({ schedule, confirmAppointment }: Props) => {
  function showDateOfSchedule(date: Date) {
    return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
      date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
    }/${date.getFullYear()}  ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h`;
  }
  return (
    <div key={schedule.id} className="card-atendimento">
      <span>{schedule.nomeCliente}</span>
      <span>{showDateOfSchedule(new Date(schedule.data))}</span>
      {schedule.confirmado ? (
        <button onClick={() => confirmAppointment(schedule.id)}>
          cancelar
        </button>
      ) : (
        <button onClick={() => confirmAppointment(schedule.id)}>
          confirmar
        </button>
      )}
      {!schedule.finalizado && (
        <button onClick={() => alert("criar o 'finalizar atendimento na api'")}>
          finalizar
        </button>
      )}
    </div>
  );
};

export default CardAtendimento;
