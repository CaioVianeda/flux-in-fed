import { useEffect, useState } from "react";
import { IBarber } from "../../shared/interfaces/IBarber";
//@ts-ignore
import style from "./style.module.css";
import FilterMenu from "../../components/FilterMenu";
import ServiceList from "../../components/ServiceList";
import { dayNames, monthNames } from "../../utils/constants/constants";
import SearchText from "../../components/SeachText";
import http from "../../service/http";

const Dashboard = () => {
  const [barber, setBarber] = useState<IBarber>();
  const [filter, setFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Date>(new Date());

  useEffect(() => {
    http.get("/barbeiros/3").then((response) => {
      setBarber(response.data);
    });
  }, []);

  return (
        <div id={style.container}>
          <div id={style.container__services}>
            <div id={style.container__services__header}>
              <p className={style.date}>{`${
                dateFilter.getDate() < 10
                  ? "0" + dateFilter.getDate()
                  : dateFilter.getDate()
              } - ${monthNames[dateFilter.getMonth()]} (${
                dayNames[dateFilter.getDay()]
              })`}</p>
              <SearchText/>
            </div>
            {barber && <ServiceList filter={filter} dateFilter={dateFilter} employee={barber}/>}
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
