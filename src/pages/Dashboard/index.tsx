import { useEffect, useState } from "react";
import { IBarber } from "../../shared/interfaces/IBarber";
import api from "../../service/api";
import { ISchedule } from "../../shared/interfaces/ISchedule";
import "./style.css";
import Header from "./Header";
import NavBar from "./NavBar";
import FilterMenu from "./FilterMenu";
import ServiceCard from "./ServiceCard";

const Dashboard = () => {
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
    if (dateFilter) {
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
    } else return filterSchedulesByTopics(schedules);
  }

  function showSchedulingTime(date: Date) {
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h`;
  }

  return (
    <main className="container-main">
      <NavBar />
      <div className="main">
        <Header barber="Igor" barberShop="Silva's" pageName="Agenda" />
        <div id="container">
          <div id="container__services">
            <div id="container__services__header">
              <p> 04 - Junho (Sexta-Feira) </p>
              <input type="text" />
            </div>
            <div id="container__services__card">
              <table>
                {filterSchedulesByDate(schedules) &&
                  filterSchedulesByDate(schedules)
                    .sort((a, b) => {
                      let dateA = new Date(a.data);
                      let dateB = new Date(b.data);
                      return dateA.getTime() - dateB.getTime();
                    })
                    .map((schedule) => {
                      return (
                        <tbody key={schedule.id}>
                          <tr >
                            <td className="horario">
                              <p className="horario-text">
                                {showSchedulingTime(new Date(schedule.data))}
                              </p>
                            </td>
                            <td className="atendimento">
                              <ServiceCard
                                key={schedule.id}
                                schedule={schedule}
                                setSchedules={setSchedules}
                              />
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
              </table>
            </div>
          </div>
          <FilterMenu
            filter={filter}
            setFilter={setFilter}
            setDateFilter={setDateFilter}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
