//@ts-ignore
import style from "./style.module.css";

interface Props {
  dateSelected: Date;
  services: String[];
}

const TimeForm = ({ dateSelected, services }: Props) => {
    
  function serviceTimeCalculator(time: Date, services: String[]): Date {
    const aux = new Date(time);
    aux.setMinutes(aux.getMinutes() + 30 * services.length);
    return aux;
  }

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  return (
    <div id={style.container}>
      <p className={style.title}>Data e Horário</p>
      <p>
        {`${formatDate(dateSelected)}`} • {`${formatTime(dateSelected)}`} -{" "}
        {`${formatTime(serviceTimeCalculator(dateSelected, services))}`}
      </p>
    </div>
  );
};

export default TimeForm;
