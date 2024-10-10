import ServiceCard from "./ServiceCard";
import style from "./style.module.css";
import { useRecoilValue } from "recoil";
import { schedulesFilterState } from "../../../../../state/atom";
import useSchedules from "../../../../../state/hooks/useSchedules/useSchedules";
import useFilteredSchedules from "../../../../../state/hooks/useSchedules/useFilteredSchedules";

interface Props{
  handleOpenModal: (date:Date) => void
}

const ServiceList = ({handleOpenModal}: Props) => {
  const filter = useRecoilValue(schedulesFilterState);
  const schedules = useSchedules();
  const filteredSchedules = useFilteredSchedules();

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

  function isFutureDate(date: Date) {
    const now = new Date();
    return date > now;
  }


  function hasSchedulingOnTime(time: Date): Boolean {
    if (
      schedules.find(
        (schedule) =>
          new Date(schedule.data).getHours() === time.getHours() &&
          new Date(schedule.data).getMinutes() === time.getMinutes()
      )
    ) {
      return true;
    }
    return false;
  }

  function hasSchedulingFilteredOnTime(time: Date): Boolean {
    if (
      filteredSchedules.find(
        (schedule) =>
          new Date(schedule.data).getHours() === time.getHours() &&
          new Date(schedule.data).getMinutes() === time.getMinutes()
      )
    ) {
      return true;
    }
    return false;
  }

    return (
      <>
        {generateHalfHourInterval(filter.date)
        .map((hour) => {
          if(hasSchedulingFilteredOnTime(hour) || !hasSchedulingOnTime(hour))
           return (
            <div className={style.row} key={hour.getTime()}>
              <div className={style.hour}>
                <p className={style["hour-text"]}>
                  {`${
                    hour.getHours() < 10
                      ? "0" + hour.getHours()
                      : hour.getHours()
                  }`}
                  {`:${
                    hour.getMinutes() < 10
                      ? "0" + hour.getMinutes()
                      : hour.getMinutes()
                  }h`}
                </p>
              </div>
              <div className={style["container__service--card"]}>
                {hasSchedulingFilteredOnTime(hour) ? (
                  //TODO ajustar carregamento
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
                  />
                ) : (
                  <div
                    className={style.card}
                    style={{
                      cursor: isFutureDate(hour) ? "pointer" : "default",
                    }}
                    onClick={() => { isFutureDate(hour) && handleOpenModal(hour)}}
                  />
                )}
              </div>
            </div>
          );
        })}
      </>
    );
};

export default ServiceList;
