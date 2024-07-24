import { ISchedule } from "../../../shared/interfaces/ISchedule";
//@ts-ignore
import style from "./style.module.css";
import api from "../../../service/api";

interface Props {
  schedule: ISchedule;
  setSchedules: React.Dispatch<React.SetStateAction<ISchedule[]>>;
}

const ServiceCard = ({
  schedule,
  setSchedules
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
  let backgroundColor2;
  if (schedule.finalizado) {
    backgroundColor = "#01c120";
    backgroundColor2 = "#01c12165";
  }
  if (schedule.confirmado && !schedule.finalizado) {
    backgroundColor = "#fed545";
    backgroundColor2 = "#fed54565";
  }
  if (!schedule.confirmado) {
    backgroundColor = "#bc0001";
    backgroundColor2 = "#bc000065";
  }

  async function finishAppointment(id: number) {
    await api.put(`/atendimento/${id}/finalizar`).then((response) => {
      setSchedules((schedules) =>
        schedules.map((schedule) => {
          return schedule.id === id ? response.data : schedule;
        })
      );
    });

  }

  async function confirmAppointment(id: number) {
    await api.put(`/atendimento/${id}/confirmar`).then((response) => {
      setSchedules((schedules) =>
        schedules.map((schedule) => {
          return schedule.id === id ? response.data : schedule;
        })
      );
    });
  }

  return (
    <div
      key={schedule.id}
      className={style["service-card"]}
      style={{border: `5px solid ${backgroundColor}`, backgroundColor: backgroundColor2}}
    >
      <span>{schedule.nomeCliente}</span>
      <span>{schedule.procedimentos.map((item)  => {return <span key={item.id}>{item.nome}</span>})}</span>
      <span>{showDateOfSchedule(new Date(schedule.data))}</span>
      <div id={style["service-card__button-container"]}>
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
