import style from "./style.module.css";
import Calendar from "./Calendar";
import { useFilter } from "../../../../state/hooks/schedules/filter/useFilter";
import { useSetFilter } from "../../../../state/hooks/schedules/filter/useSetFilter";

const FilterMenu = () => {
  const filter = useFilter();
  const setFilter = useSetFilter();

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({...filter,
      date: filter.date,
      status: filter.status !== event.target.id ? event.target.id : null});
  };

  const onChangeInterval = (interval: number) => {
    setFilter({ ...filter, scheduleMinuteInterval: interval });
  };

  return (
    <div id={style["filter-menu"]}>
      <Calendar />
      <div className={style.filter}>
        <p className={style.filter__title}>Filtro</p>
        <button onClick={() => onChangeInterval(30)}>30</button>
        <button onClick={() => onChangeInterval(15)}>15</button>
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
            id="finished"
            type="checkbox"
            checked={filter.status === "finished"}
            onChange={onChangeFilter}
          />
          <label htmlFor="finished">Finalizado</label>
        </span>
      </div>
    </div>
  );
};

export default FilterMenu;
