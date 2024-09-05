import { useState } from "react";
import { IBarber } from "../../shared/interfaces/IBarber";
//@ts-ignore
import style from "./style.module.css";
import FilterMenu from "../../components/FilterMenu";
import ServiceList from "../../components/ServiceList";
import { dayNames, monthNames } from "../../utils/constants/constants";
//@ts-ignore
import Lupa from '../../assets/lupa.png'

const Dashboard = () => {
  const [barber, setBarber] = useState<IBarber>();
  const [filter, setFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Date>(new Date());

  return (
        <div id={style.container}>
          <div id={style.container__services}>
            <div id={style.container__services__header}>
              <p>{`${
                dateFilter.getDate() < 10
                  ? "0" + dateFilter.getDate()
                  : dateFilter.getDate()
              } - ${monthNames[dateFilter.getMonth()]} (${
                dayNames[dateFilter.getDay()]
              })`}</p>
              <div className={style["input-container"]}>
                <input type="text" placeholder="Buscar" />
                <img className={style.icon} src={Lupa} alt="lupa" width={18}/>
              </div>
            </div>
            <ServiceList filter={filter} dateFilter={dateFilter} />
          </div>
          <FilterMenu
            filter={filter}
            dateFilter={dateFilter}
            setFilter={setFilter}
            setDateFilter={setDateFilter}
          />
        </div>
  
  );
};

export default Dashboard;
