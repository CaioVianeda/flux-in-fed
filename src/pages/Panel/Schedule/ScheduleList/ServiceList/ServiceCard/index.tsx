import { ISchedule } from "../../../../../../shared/interfaces/ISchedule";
import style from "./style.module.css";
import { Avatar, Tooltip } from "@mui/material";
import { Delete, DoneAll } from "@mui/icons-material";
import useUpdateSchedules from "../../../../../../state/hooks/schedules/useUpdateSchedules";
import useRemoveSchedule from "../../../../../../state/hooks/schedules/useRemoveSchedule";

interface Props {
  schedule: ISchedule;
}

const ServiceCard = ({ schedule }: Props) => {
  const updateSchedule = useUpdateSchedules();
  const deleteSchedule = useRemoveSchedule();

  const selectBackgroundColor = (schedule: ISchedule): String => {
    if (schedule.finalizado) {
      return "finished";
    }
    if (schedule.confirmado && !schedule.finalizado) {
      return "confirmed";
    } else return "";
  };

  const addTimeToDate = (date: Date, duration: string) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    newDate.setSeconds(newDate.getSeconds() + seconds);
    return newDate;
  };

  const showTimeOfSchedule = (date: Date, duration: string) => {
    const scheduleTimeEnd = addTimeToDate(date, duration);
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h - ${scheduleTimeEnd.getHours()}:${
      scheduleTimeEnd.getMinutes() < 10
        ? "0" + scheduleTimeEnd.getMinutes()
        : scheduleTimeEnd.getMinutes()
    }h`;
  };

  return (
    <div
      key={schedule.id}
      className={`${style["service-card"]} ${
        style[`${selectBackgroundColor(schedule)}`]
      }`}
    >
      <div className={style.info}>
        <Avatar />
        <div>
          <p style={{ fontWeight: 300 }} className={style["text-info"]}>
            {`${showTimeOfSchedule(
              new Date(schedule.data),
              schedule.duracao
            )} `}
          </p>
          <p style={{ fontWeight: 700 }} className={style["text-info"]}>
            {schedule.nomeCliente}
          </p>
        </div>
      </div>
      <div id={style["service-card__button-container"]}>
        {schedule.confirmado && !schedule.finalizado && (
          <Tooltip title="Excluir">
            <span
              className={`${style.buttons}`}
              onClick={() => deleteSchedule(schedule.id)}
            >
              <Delete />
            </span>
          </Tooltip>
        )}
        {!schedule.finalizado && (
          <Tooltip title="Finalizar">
            <span
              className={style.buttons}
              onClick={() => updateSchedule(schedule)}
            >
              <DoneAll />
            </span>
          </Tooltip>
        )}
        {schedule.finalizado && (
          <Tooltip title="Excluir">
            <span
              className={style.buttons}
              onClick={() => deleteSchedule(schedule.id)}
            >
              <Delete />
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
