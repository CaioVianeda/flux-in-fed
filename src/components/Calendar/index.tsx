import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";
import "./styles.css";

interface Props {
  date: Date;
}

const mounths = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const Calendario = ({ date }: Props) => {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const daysOfMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const today = new Date();

  function criaDiasDoCalendario() {
    for (
      let i = 0;
      i < new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      i++
    ) {
      return <th>0</th>;
    }
  }

  return (
    <div className="calendario">
      <div className="month-header">{format(date, "MMMM yyyy")}</div>
      <div className="days">
        {daysOfMonth.map((day) => (
          <div
            key={day.getTime()}
            className={`day ${isToday(day) ? "today" : ""} ${
              isSameMonth(day, date) ? "current-month" : "other-month"
            }`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
