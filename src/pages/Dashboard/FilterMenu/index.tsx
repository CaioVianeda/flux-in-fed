import { Dispatch, SetStateAction } from "react";
import './style.css'
import Calendario from "../../../components/Calendar";

interface Props {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  setDateFilter: Dispatch<SetStateAction<Date>>;
}

const FilterMenu = ({ filter, setFilter, setDateFilter }: Props) => {
  return (
    <div id="filter-menu">
      <Calendario date={new Date()}/>
      <div className="filter">
        <p className="filter__title">Titulo</p>
        <span>
          <input
            type="checkbox"
            checked={filter === "confirmed"}
            onChange={() => {
              filter === "confirmed" ? setFilter("") : setFilter("confirmed");
            }}
          />
          Confirmado
        </span>
        <span>
          <input
            type="checkbox"
            checked={filter === "waitingConfirmation"}
            onChange={() => {
              filter === "waitingConfirmation"
                ? setFilter("")
                : setFilter("waitingConfirmation");
            }}
          />
          Aguardando Confirmação
        </span>
        <span>
          <input
            type="checkbox"
            checked={filter === "finished"}
            onChange={() => {
              filter === "finished" ? setFilter("") : setFilter("finished");
            }}
          />
          Finalizado
        </span>
        <span>
          <input type="checkbox" onChange={(event) => {}} />
          Cancelado
        </span>
      </div>

      <button onClick={() => setDateFilter(new Date())}>Hoje</button>
    </div>
  );
};

export default FilterMenu;
