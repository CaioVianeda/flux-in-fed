import { useEffect, useState } from "react";
import { IBarber } from "../../shared/interfaces/IBarber";
import api from "../../service/api";
import { ISchedule } from "../../shared/interfaces/ISchedule";
import "./style.css";
import CardAtendimento from "./CardAtendimento";

const Schedule = () => {
  const [barber, setBarber] = useState<IBarber>();
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Date>();

  useEffect(() => {
    api.get(`/barbeiros/1`).then((response) => setBarber(response.data));
    api.get("/barbeiros/1/atendimentos").then((response) => {
      setSchedules(response.data);
    });
  }, []);

  useEffect(() => {}, [dateFilter]);

  function filterSchedules(typeFilter: string): ISchedule[] {
    switch (typeFilter) {
      case "confirmado":
        return schedules.filter((schedule) => schedule.confirmado);
      case "aguardandoConfirmacao":
        return schedules.filter((schedule) => !schedule.confirmado);
      case "finalizado":
        return schedules.filter((schedule) => schedule.finalizado);
      default:
        return schedules;
    }
  }

  function filterSchedulesByDate(schedules: ISchedule[]): ISchedule[] {
    console.log("aqui");
    if (dateFilter) {
      return schedules.filter((schedule) => {
        const scheduleDate = new Date(schedule.data);
        if (
          scheduleDate.getDate() === dateFilter.getDate() &&
          scheduleDate.getMonth() === dateFilter.getMonth() &&
          scheduleDate.getFullYear() === dateFilter.getFullYear()
        ) {
          return schedule;
        }
      });
    } else return schedules;
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
    <>
      <h1>Opa mosh mosh</h1>
      <div>
        <span>foto</span>
        <h3>{barber?.nome}</h3>
        <div className="topics">
          <span className="topic">
            <h4>Lista de Espera</h4>
            <span className="numero">{schedules.length}</span>
            <span
              className="nome"
              onClick={() => setFilter("")}
              style={{ fontWeight: filter === "" ? "bold" : "" }}
            >
              Agendados
            </span>
            <span className="numero">
              {schedules.filter((schedule) => schedule.confirmado).length}
            </span>
            <span
              className="nome"
              onClick={() => setFilter("confirmado")}
              style={{ fontWeight: filter === "confirmado" ? "bold" : "" }}
            >
              Confirmados
            </span>
            <span className="numero">
              {schedules.filter((schedule) => !schedule.confirmado).length}
            </span>
            <span
              className="nome"
              onClick={() => setFilter("aguardandoConfirmacao")}
              style={{
                fontWeight: filter === "aguardandoConfirmacao" ? "bold" : "",
              }}
            >
              Aguardando Confirmação
            </span>
            <span className="numero">
              {schedules.filter((schedule) => schedule.finalizado).length}
            </span>
            <span
              className="nome"
              onClick={() => setFilter("finalizado")}
              style={{ fontWeight: filter === "finalizado" ? "bold" : "" }}
            >
              Finalizados
            </span>
          </span>
        </div>
        <button onClick={() => setDateFilter(new Date())}>Hoje</button>
        <div className="container__card-atendimento">
          {filterSchedules(filter) &&
            filterSchedulesByDate(filterSchedules(filter)).map((schedule) => {
              return (
                <CardAtendimento
                  key={schedule.id}
                  schedule={schedule}
                  confirmAppointment={confirmAppointment}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Schedule;
