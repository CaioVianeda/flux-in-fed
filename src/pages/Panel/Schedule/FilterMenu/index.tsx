import { Dispatch, SetStateAction } from "react";
import style from "./style.module.css";
import Calendar from "./Calendar";
import { useRecoilState } from "recoil";
import { serviceFilterState } from "../../../../state/atom";
import { IServiceFilter } from "../../../../shared/interfaces/IServiceFilter";

const FilterMenu = () => {
  const [filter, setFilter] = useRecoilState(serviceFilterState);

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IServiceFilter = {
      date: filter.date,
      status: filter.status,
    };
    if (filter.status !== event.target.id) {
      newFilter.status = event.target.id;
    } else {
      newFilter.status = null;
    }
    setFilter(newFilter);
  };

  return (
    <div id={style["filter-menu"]}>
      <Calendar />
      <div className={style.filter}>
        <p className={style.filter__title}>Titulo</p>
        <span>
          <input
            id="confirmed"
            type="checkbox"
            checked={filter.status === "confirmed"}
            onChange={onChangeFilter}
          />
          <label htmlFor="confirmed">Confirmado</label>
        </span>
        <span>
          <input
            id="waitingConfirmation"
            type="checkbox"
            checked={filter.status === "waitingConfirmation"}
            onChange={onChangeFilter}
          />
          <label htmlFor="waitingConfirmation">Aguardando Confirmação</label>
        </span>
        <span>
          <input
            id="finished"
            type="checkbox"
            checked={filter.status === "finished"}
            onChange={onChangeFilter}
          />
          <label htmlFor="finished">Finalizado</label>
        </span>
        <span>
          <input
            id="canceled"
            type="checkbox"
            checked={filter.status === "canceled"}
            onChange={onChangeFilter}
          />
          <label htmlFor="canceled">Cancelado</label>
        </span>
      </div>
    </div>
  );
};

export default FilterMenu;
