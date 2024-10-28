import { ISchedule } from "../../../../../../shared/interfaces/ISchedule";
import style from "./style.module.css";
import http from "../../../../../../service/http";
import { Avatar, Tooltip } from "@mui/material";
import { Delete, DoneAll } from "@mui/icons-material";
import useUpdateSchedules from "../../../../../../state/hooks/useSchedules/useUpdateSchedules";
import useRemoveSchedule from "../../../../../../state/hooks/useSchedules/useRemoveSchedule";

interface Props {
  schedule: ISchedule;
}

const ServiceCard = ({ schedule }: Props) => {
  const updateSchedule = useUpdateSchedules();
  const removeSchedule = useRemoveSchedule();

  function selectBackgroundColor(schedule: ISchedule): String {
    if (schedule.finalizado) {
      return "finished";
    }
    if (schedule.confirmado && !schedule.finalizado) {
      return "confirmed";
    } else return '';
  }

  function showDateOfSchedule(date: Date) {
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h`;
  }

  async function finishSchedule(id: number) {
    await http
      .put<ISchedule>(`/atendimento/${id}/finalizar`)
      .then((response) => {
        updateSchedule(response.data);
      })
      .catch((erro) => console.log(erro));
  }

  async function deleteSchedule(id: number){
    await http.delete(`/atendimento/${id}`).then((response) => {
      removeSchedule(id);
      alert("Atendimento removido com sucesso!");
    }).catch((erro) => console.log(erro));
  }

  return (
    <div
      key={schedule.id}
      className={`${style["service-card"]} ${style[`${selectBackgroundColor(schedule)}`]}` }
    >
      <div className={style.info}>
        <Avatar />
        <div>
          <p style={{ fontWeight: 300 }} className={style["text-info"]}>
            {showDateOfSchedule(new Date(schedule.data))}
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
              <Delete/>
            </span>
          </Tooltip>
        )}
        {!schedule.finalizado  && (
          <Tooltip title="Finalizar">
            <span
              className={style.buttons}
              onClick={() => finishSchedule(schedule.id)}
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
              <Delete/>
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;