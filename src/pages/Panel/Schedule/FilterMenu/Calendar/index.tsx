import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import style from "./styles.module.css";
import {memo, useState } from "react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { schedulesFilterState } from "../../../../../state/atom";
import { monthNames } from "../../../../../utils/constants/constants";

const Calendar = () => {

  const [filter, setFilter] = useRecoilState(schedulesFilterState);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const firstDayOfMonth = startOfMonth(calendarDate);
  const lastDayOfMonth = endOfMonth(calendarDate);
  const daysOfMonth = eachDayOfInterval({
    start: firstDayOfMonth, 
    end: lastDayOfMonth,
  });
  const firstDayWeek = startOfMonth(calendarDate).getDay();

  function createCalendarDays() {

    let daysOfAnotherMonth = []

    for (
      let i = 0;
      i < firstDayWeek;
      i++
    ) {
      daysOfAnotherMonth.push(<div key={i}> </div>);
    }

    return daysOfAnotherMonth;
  }

  function changeMonth(value: number){
    let newDate = new Date(calendarDate);
    if(calendarDate.getMonth() + value > 12) {
      newDate.setFullYear(calendarDate.getFullYear()+1);
      newDate.setMonth(calendarDate.getMonth() + value);
    }
    else if(calendarDate.getMonth() + value < 0){
      newDate.setFullYear(calendarDate.getFullYear()-1);
      newDate.setMonth(11);
    } 
    else{
    newDate.setMonth(calendarDate.getMonth() + value);
  }
    setCalendarDate(newDate);  
  }

  function changeDate(date: Date){
    setFilter(prevState => ({date: date, status: prevState.status}));
    setCalendarDate(date);
  }

  return (
    <div id={style.calendar}>
      <div id={style['month-header']}>
        <div className={style["change-month"]} onClick={() => changeMonth(-1)}><ArrowBackIosNew fontSize="small"/></div>
        <span>{`${monthNames[calendarDate.getMonth()]} - ${calendarDate.getFullYear()}`}</span>
        <div className={style["change-month"]} onClick={() => changeMonth(1)}><ArrowForwardIos fontSize="small"/></div>
        <div id={style["today-button"]} onClick={() => {changeDate(new Date())}}>Hoje</div>
      </div>

      <div className={style.days}>

        <div className={style.week}>D</div>
        <div className={style.week}>S</div>
        <div className={style.week}>T</div>
        <div className={style.week}>Q</div>
        <div className={style.week}>Q</div>
        <div className={style.week}>S</div>
        <div className={style.week}>S</div>
        {createCalendarDays()}
        {daysOfMonth.map((day) => (
          <div
            onClick={() => {changeDate(day)}}
            key={day.getTime()}
            className={`${style.day} ${isSameDay(day,filter.date ) && style["selected-day"]}` }
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo( Calendar);
