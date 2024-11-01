import ServiceCard from "./ServiceCard";
import style from "./style.module.css";
import { useRecoilValue } from "recoil";
import { schedulesFilterState } from "../../../../../state/atom";
import useSchedules from "../../../../../state/hooks/schedules/useSchedules";
import useFilteredSchedules from "../../../../../state/hooks/schedules/filter/useFilteredSchedules";
import { useEffect, useState } from "react";
import { useFilter } from "../../../../../state/hooks/schedules/filter/useFilter";

interface Props {
  handleOpenModal: (date: Date) => void;
}

const ServiceList = ({ handleOpenModal }: Props) => {
  const filter = useFilter();
  const schedules = useSchedules();
  const filteredSchedules = useFilteredSchedules();
  const [timesSlots, setTimesSlots] = useState<Date[]>([]);

  const generateTimeSlots = (date: Date, interval: number): Date[] => {
    const timeSlot = [];
    let current = new Date(date);
    current.setHours(8, 0, 0, 0);

    let finalTime = new Date(date);
    finalTime.setHours(18, 0, 0, 0);

    while (current <= finalTime) {
      timeSlot.push(new Date(current));
      current.setMinutes(current.getMinutes() + interval);
    }
    return handleTimeSlots(timeSlot);
  };

  const handleTimeSlots = (timesSlots: Date[]): Date[] => {
    let newTimesSlots = timesSlots;
    schedules.forEach((schedule) => {
      const fromDate = new Date(schedule.data);
      const toDate = new Date(fromDate.getTime());
      toDate.setMinutes(
        toDate.getMinutes() + convertDurationToMinutes(schedule.duracao)
      );
      newTimesSlots = newTimesSlots.filter((date) => {
        return date <= fromDate || date >= toDate;
      });
    });
    return newTimesSlots;
  };

  const convertDurationToMinutes = (duration: string) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return hours * 60 + minutes + Math.floor(seconds / 60);
  };

  const isFutureDate = (date: Date) => date > new Date();

  const hasSchedulingOnTime = (time: Date) => {
    return schedules.some((schedule) => {
      const scheduleDate = new Date(schedule.data);
      return (
        scheduleDate.getHours() === time.getHours() &&
        scheduleDate.getMinutes() === time.getMinutes()
      );
    });
  };

  const hasSchedulingFilteredOnTime = (time: Date) => {
    return filteredSchedules.some((schedule) => {
      const scheduleDate = new Date(schedule.data);
      return (
        scheduleDate.getHours() === time.getHours() &&
        scheduleDate.getMinutes() === time.getMinutes()
      );
    });
  };

  useEffect(() => {
    setTimesSlots(generateTimeSlots(filter.date, filter.scheduleMinuteInterval));
  }, [filter.date, schedules]);

  return (
    <>
      {timesSlots.map((time) => {
        const isFiltered = hasSchedulingFilteredOnTime(time);
        const isAvailable = !hasSchedulingOnTime(time) && isFutureDate(time);

        if (isFiltered || isAvailable)
          return (
            <div className={style.row} key={time.getTime()}>
              <div className={style.hour}>
                <p className={style["hour-text"]}>
                  {`${time.getHours().toString().padStart(2, "0")}`}
                  {`:${time.getMinutes().toString().padStart(2, "0")}h`}
                </p>
              </div>
              <div className={style["container__service_card"]}>
                {isFiltered ? (
                  <ServiceCard
                    schedule={
                      schedules.find(
                        (schedule) =>
                          new Date(schedule.data).getHours() ===
                            time.getHours() &&
                          new Date(schedule.data).getMinutes() ===
                            time.getMinutes()
                      )!
                    }
                  />
                ) : (
                  <div
                    className={style.card}
                    onClick={() => {
                      handleOpenModal(time);
                    }}
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
