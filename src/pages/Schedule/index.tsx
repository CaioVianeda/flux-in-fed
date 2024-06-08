import { useEffect, useState } from "react";
import { IBarber } from "../../shared/interfaces/IBarber";
import api from "../../service/api";
import { ISchedule } from "../../shared/interfaces/ISchedule";

const Schedule = () => {
  const [barber, setBarber] = useState<IBarber>();
  const [schedules, setSchedules] = useState<ISchedule[]>();

  useEffect(() => {
    api.get(`/barbeiros/1`).then((response) => setBarber(response.data));

    api
      .get("/barbeiros/1/atendimentos")
      .then((response) => setSchedules(response.data));
  }, []);

  function confirmAppointment(id: number) {
      api.put(`/atendimento/${id}/confirmar`).then((response) => {
        setSchedules(schedules?.map((schedule) => {return schedule.id === id ? response.data : schedule}));
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
            <span className="numero">14</span>
            <span className="nome">Agendados</span>
            <span className="numero">14</span>
            <span className="nome">Confirmados</span>
            <span className="numero">14</span>
            <span className="nome">Aguardando Confimação</span>
            <span className="numero">14</span>
            <span className="nome">Finalizados</span>
          </span>
        </div>
        <div>
          {schedules &&
            schedules.map((schedule) => {
              return (
                <div key={schedule.id}>
                  <span>{schedule.nomeCliente}</span>
                  {schedule.confirmado ? (
                    <button onClick={() => confirmAppointment(schedule.id)}>
                      cancelar
                    </button>
                  ) : (
                    <button onClick={() => confirmAppointment(schedule.id)}>
                      confirmar
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Schedule;
