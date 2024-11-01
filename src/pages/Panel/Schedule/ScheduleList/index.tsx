import { useEffect, useState } from "react";
import style from "./style.module.css";
import SchedulerBarber from "../SchedulingMode";
import PerfilCard from "../../../../components/PerfilCard";
import useLoadSchedules from "../../../../state/hooks/schedules/useLoadSchedules";
import ServiceListCards from "./ServiceListCards";
import ServiceList from "./ServiceList";
import { dayNames, monthNames } from "../../../../utils/constants/constants";
import { useEmployee } from "../../../../state/hooks/employee/useEmployee";
import { useFilter } from "../../../../state/hooks/schedules/filter/useFilter";

const ScheduleList = () => {
  const employee = useEmployee();
  const filter = useFilter();
  const loadSchedules = useLoadSchedules();
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const isTodayOrFuture = (date: Date): Boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleOpenModal = (hour: Date) => {
    setSelectedHour(hour);
    setOpenModal(true);
  };

  useEffect(() => {
    const fromDate = new Date(filter.date);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(filter.date);
    toDate.setHours(23, 59, 59, 999);
    loadSchedules(fromDate, toDate);
  }, [filter.date, loadSchedules]);

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
      <div id={style.container__servicesList}>
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
