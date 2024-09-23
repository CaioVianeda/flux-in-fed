import { useEffect, useState } from "react";
import { ISchedule } from "../../shared/interfaces/ISchedule";
import http from "../../service/http";
import ServiceCard from "../ServiceCard";
//@ts-ignore
import style from "./style.module.css";
import SchedulerBarber from "../SchedulerBarber";
import { IBarber } from "../../shared/interfaces/IBarber";

interface Props {
  filter: string;
  dateFilter: Date;
  employee: IBarber;
}

const ServiceList = ({ filter, dateFilter = new Date(), employee }: Props) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState<Boolean>(false);

  function generateHalfHourInterval(date: Date) {
    const timeSlot = [];
    let current = new Date(date);
    current.setHours(8, 0, 0, 0);

    let finalTime = new Date(date);
    finalTime.setHours(18, 0, 0, 0);

    while (current <= finalTime) {
      timeSlot.push(new Date(current));
      current.setMinutes(current.getMinutes() + 30);
    }
    return timeSlot;
  }

  function formatDateToLocalDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

  useEffect(() => {

    const endOfDay = new Date(dateFilter);
    endOfDay.setHours(23, 59, 59, 999);
    const body = {dataInicial:formatDateToLocalDateTime(new Date(dateFilter)), dataFinal: formatDateToLocalDateTime(endOfDay)}
    http.post(`/atendimento/${employee.id}/filtrar`, body).then((response) => {
      setSchedules(filterSchedulesByDate(response.data));
    })
    .catch((erro) => {
      console.log(erro);
    }) ;
  }, [filter, dateFilter]);

  function handleOpenModal(hour: Date) {
    setSelectedHour(hour);
    setOpenModal(true);
  }

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
  console.log(generateHalfHourInterval(dateFilter));
  return (
    <div id={style["container--services-list"]}>
      {generateHalfHourInterval(dateFilter).map((hour) => {
        return (
          <div className={style.row} key={hour.getTime()}>
            <div className={style.hour}>
              <p className={style["hour-text"]}>
                {`${
                  hour.getHours() < 10 ? "0" + hour.getHours() : hour.getHours()
                }`}
                {`:${
                  hour.getMinutes() < 10
                    ? "0" + hour.getMinutes()
                    : hour.getMinutes()
                }h`}
              </p>
            </div>
            <div
              className={style["container__service--card"]}
              onClick={() => handleOpenModal(hour)}
            >
              {schedules.find(
                (schedule) =>
                  new Date(schedule.data).getHours() === hour.getHours() &&
                  new Date(schedule.data).getMinutes() === hour.getMinutes()
              ) ? (
                
                <ServiceCard
                  schedule={
                    schedules.find(
                      (schedule) =>
                        new Date(schedule.data).getHours() ===
                          hour.getHours() &&
                        new Date(schedule.data).getMinutes() ===
                          hour.getMinutes()
                    )!
                  }
                  setSchedules={setSchedules}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}

      {openModal && selectedHour && (
        <SchedulerBarber selectedDate={selectedHour} selectedEmployee={employee} setOpenModal={setOpenModal}/>
      )}
    </div>
  );
};

export default ServiceList;
