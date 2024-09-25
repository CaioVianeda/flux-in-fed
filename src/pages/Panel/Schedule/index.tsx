import { useState } from "react";

import style from "./style.module.css";
import FilterMenu from "../../../components/FilterMenu";
import ServiceList from "./ServiceList";
import { dayNames, monthNames } from "../../../utils/constants/constants";
import SearchText from "../../../components/SeachText";
import { useRecoilValue } from "recoil";
import { employeeState, filterDateState } from "../../../state/atom";

const Schedule = () => {
  const [filter, setFilter] = useState<string>("");
  const employee = useRecoilValue(employeeState);
  const filterDate = useRecoilValue(filterDateState);

  return (
    <div id={style.container}>
      <div id={style.container__services}>
        <div id={style.container__services__header}>
          <p className={style.date}>{`${
            filterDate.getDate() < 10
              ? "0" + filterDate.getDate()
              : filterDate.getDate()
          } - ${monthNames[filterDate.getMonth()]} (${
            dayNames[filterDate.getDay()]
          })`}</p>
          <SearchText />
        </div>
        {employee && (
          <ServiceList
            filter={filter}
            dateFilter={filterDate}
            employee={employee}
          />
        )}
      </div>
      <FilterMenu filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default Schedule;
