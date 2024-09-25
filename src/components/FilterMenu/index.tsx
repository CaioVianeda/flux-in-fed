import { Dispatch, SetStateAction } from "react";
import style from "./style.module.css";
import Calendar from "../Calendar";

interface Props {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  dateFilter: Date;
  setDateFilter: Dispatch<SetStateAction<Date>>;
}

const FilterMenu = ({
  filter,
  setFilter,
  dateFilter,
  setDateFilter,
}: Props) => {
  return (
    <div id={style["filter-menu"]}>
      <Calendar
        date={new Date()}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <div className={style.filter}>
        <p className={style.filter__title}>Titulo</p>
        <span>
          <input
            id="confirmed"
            type="checkbox"
            checked={filter === "confirmed"}
            onChange={() => {
              filter === "confirmed" ? setFilter("") : setFilter("confirmed");
            }}
          />
          <label htmlFor="confirmed">Confirmado</label>
        </span>
        <span>
          <input
            id="waitingConfimation"
            type="checkbox"
            checked={filter === "waitingConfirmation"}
            onChange={() => {
              filter === "waitingConfirmation"
                ? setFilter("")
                : setFilter("waitingConfirmation");
            }}
          />
          <label htmlFor="waitingConfirmation">Aguardando Confirmação</label>
        </span>
        <span>
          <input
            id="finished"
            type="checkbox"
            checked={filter === "finished"}
            onChange={() => {
              filter === "finished" ? setFilter("") : setFilter("finished");
            }}
          />
          <label htmlFor="finished">Finalizado</label>
        </span>
        <span>
          <input id="canceled" type="checkbox" onChange={() => {}} />
          <label htmlFor="canceled">Cancelado</label>
        </span>
      </div>
    </div>
  );
};

export default FilterMenu;
