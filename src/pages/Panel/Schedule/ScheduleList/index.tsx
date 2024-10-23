import { memo, useEffect, useState } from "react";
import http from "../../../../service/http";
import style from "./style.module.css";
import SchedulerBarber from "../SchedulerBarber";
import PerfilCard from "../../../../components/PerfilCard";
import { useRecoilValue } from "recoil";
import { employeeState, schedulesFilterState } from "../../../../state/atom";
import useSchedules from "../../../../state/hooks/useSchedules/useSchedules";
import useLoadSchedules from "../../../../state/hooks/useSchedules/useLoadSchedules";
import ServiceListCards from "./ServiceListCards";
import ServiceList from "./ServiceList";
import { dayNames, monthNames } from "../../../../utils/constants/constants";

const ScheduleList = () => {
  const employee = useRecoilValue(employeeState);
  const filter = useRecoilValue(schedulesFilterState);
  const schedules = useSchedules();
  const loadSchedules = useLoadSchedules();
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState<Boolean>(false);

  function formatDateToLocalDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  function isTodayOrFuture(date: Date): Boolean {
    const today = new Date();
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return (
      todayDate.getTime() === dateWithoutTime.getTime() || date > todayDate
    );
  }

  useEffect(() => {
    const startOfDay = new Date(filter.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(filter.date);
    endOfDay.setHours(23, 59, 59, 999);

    const body = {
      dataInicial: formatDateToLocalDateTime(startOfDay),
      dataFinal: formatDateToLocalDateTime(endOfDay),
    };
    if (employee.id !== "0") {
      http
        .post(`/atendimento/${employee.id}/filtrar`, body)
        .then((response) => {
          loadSchedules(response.data);
        })
        .catch((erro) => {
          console.log(erro);
        });
    }
  }, [filter.date]);

  function handleOpenModal(hour: Date) {
    setSelectedHour(hour);
    setOpenModal(true);
  }

  return (
    <>
      <div id={style.header}>
        {/*TODO ajustar api para trazer nome do estabelecimento */}
        <PerfilCard
          mainInformation={employee.nome}
          secondInformation={"Silva's"}
        />
        <p id={style.date}>{`${filter.date
          .getDate()
          .toString()
          .padStart(2, "0")} - ${monthNames[filter.date.getMonth()]} (${
          dayNames[filter.date.getDay()]
        })`}</p>
      </div>
      <div id={style["container--services-list"]}>
        {isTodayOrFuture(filter.date) ? (
          <ServiceList handleOpenModal={handleOpenModal} />
        ) : (
          <ServiceListCards />
        )}
      </div>

      {openModal && selectedHour && (
        <SchedulerBarber
          selectedDate={selectedHour}
          selectedEmployee={employee}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default ScheduleList;
