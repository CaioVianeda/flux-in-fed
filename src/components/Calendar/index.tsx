import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";
//@ts-ignore
import style from "./styles.module.css";
import { monthNames } from "../../utils/constants/constants";
import {useState } from "react";

interface Props {
  date: Date;
  dateFilter: Date;
  setDateFilter: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar = ({ date, dateFilter, setDateFilter }: Props) => {

  const [calendarDate, setCalendarDate] = useState(new Date(date));
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
    let newDate = new Date(calendarDate);
    newDate.setDate(date.getDate());
    setCalendarDate(newDate);
  }

  return (
    <div className={style.calendar}>
      <div className={style['month-header']}>
        <button className={style["change-month"]} onClick={() => changeMonth(-1)}>{`<`}</button>
        <span>{`${monthNames[calendarDate.getMonth()]} - ${calendarDate.getFullYear()}`}</span>
        <button className={style["change-month"]} onClick={() => changeMonth(1)}>{`>`}</button>
        <button onClick={() => {setDateFilter(new Date()); setCalendarDate(new Date())}}>Hoje</button>
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
            onClick={() => {setDateFilter(day); changeDate(day)}}
            key={day.getTime()}
            className={`${style.day} ${isSameDay(day,dateFilter ) ? style["selected-day"] : undefined}` }
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
