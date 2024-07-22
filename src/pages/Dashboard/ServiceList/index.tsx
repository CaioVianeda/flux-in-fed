import { useEffect, useState } from "react";
import { ISchedule } from "../../../shared/interfaces/ISchedule";
import api from "../../../service/api";
import ServiceCard from "../ServiceCard";

interface Props {
  filter: string;
  dateFilter: Date;
}

const ServiceList = ({ filter, dateFilter = new Date() }: Props) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  function generateHalfHourInterval() {
    let timeSlot = [];
    let current = new Date();
    current.setHours(8, 0, 0, 0);

    let finalTime = new Date();
    finalTime.setHours(18, 0, 0, 0);

    while (current <= finalTime) {
      timeSlot.push(new Date(current));
      current.setMinutes(current.getMinutes() + 30);
    }

    return timeSlot;
  }

  useEffect(() => {
    generateHalfHourInterval();
    api.get("/barbeiros/1/atendimentos").then((response) => {
      setSchedules(filterSchedulesByDate(response.data));
    });
  }, []);

  useEffect(() => {
    //TODO ajustar api para não precisar carregar todos os atendimentos
    api.get("/barbeiros/1/atendimentos").then((response) => {
        setSchedules(filterSchedulesByDate(response.data));
      });
  }, [filter, dateFilter]);

  function filterSchedulesByTopics(schedules: ISchedule[]): ISchedule[] {
    switch (filter) {
      case "confirmed":
        return schedules.filter((schedule) => schedule.confirmado);
      case "waitingConfirmation":
        return schedules.filter((schedule) => !schedule.confirmado);
      case "finished":
        return schedules.filter((schedule) => schedule.finalizado);
      case "canceled":
        return schedules.filter((schedule) => schedule);
      default:
        return schedules;
    }
  }

  function filterSchedulesByDate(schedules: ISchedule[]): ISchedule[] {
      return filterSchedulesByTopics(schedules).filter((schedule) => {
        const scheduleDate = new Date(schedule.data);
        if (
          scheduleDate.getDate() === dateFilter.getDate() &&
          scheduleDate.getMonth() === dateFilter.getMonth() &&
          scheduleDate.getFullYear() === dateFilter.getFullYear()
        ) {
          return schedule;
        }
      });
  }

  return (
    <table>
      <tbody>
        {generateHalfHourInterval().map((hour) => {
          return (
            <tr key={hour.getTime()}>
              <td className="horario">
                <p className="horario-text">{`${hour.getHours()}:${
                  hour.getMinutes() < 10
                    ? "0" + hour.getMinutes()
                    : hour.getMinutes()
                }h`}</p>
              </td>

              <td className="atendimento">
                {
                    schedules.find((schedule) => new Date(schedule.data).getHours() === hour.getHours() && new Date(schedule.data).getMinutes() === hour.getMinutes()) 
                    ?
                     <ServiceCard
                    schedule={schedules.find((schedule) => new Date(schedule.data).getHours() === hour.getHours() && new Date(schedule.data).getMinutes() === hour.getMinutes())!}
                    setSchedules={setSchedules} />
                    :
                    <></>
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ServiceList;
