import { ISchedule } from "../../shared/interfaces/ISchedule";
//@ts-ignore
import style from "./style.module.css";
import api from "../../service/http";
import { Avatar, Tooltip } from "@mui/material";
import { Check, Close, DoneAll } from "@mui/icons-material";

interface Props {
  schedule: ISchedule;
  setSchedules: React.Dispatch<React.SetStateAction<ISchedule[]>>;
}

const ServiceCard = ({ schedule, setSchedules }: Props) => {

  function selectBackgroundColor(schedule: ISchedule): String{
    if (schedule.finalizado) {
      return "#00c120";
    }
    if (schedule.confirmado && !schedule.finalizado) {
      return "#ffd447";
    }
    if (!schedule.confirmado) {
      return "#BB0000";
    } else return '#fff'
  }

  function showDateOfSchedule(date: Date) {
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h`;
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
      style={{ backgroundColor: `${selectBackgroundColor(schedule)}`  }}
     
    >
      <div className={style.info}>
        <Avatar />
        <div>
          <p style={{ fontWeight: 300 }} className={style["text-info"]}>
            {showDateOfSchedule(new Date(schedule.data))}
          </p>
          <p style={{ fontWeight: 700 }} className={style["text-info"]}>{schedule.nomeCliente}</p>
        </div>
      </div>
      <div id={style["service-card__button-container"]}>
        {schedule.confirmado && !schedule.finalizado && (
          <Tooltip title="Cancelar">
            <span
              className={style.buttons}
              onClick={() => confirmAppointment(schedule.id)}
            >
              <Close />
            </span>
          </Tooltip>
        )}
        {!schedule.confirmado && (
          <Tooltip title="Confirmar">
            <span
              className={style.buttons}
              onClick={() => confirmAppointment(schedule.id)}
            >
              <Check />
            </span>
          </Tooltip>
        )}
        {!schedule.finalizado && schedule.confirmado && (
          <Tooltip title="Finalizar">
            <span
              className={style.buttons}
              onClick={() => finishAppointment(schedule.id)}
            >
              <DoneAll />
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
