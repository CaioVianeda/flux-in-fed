import style from "./style.module.css";
import FilterMenu from "./FilterMenu";
import ServiceList from "./ServiceList";
import { dayNames, monthNames } from "../../../utils/constants/constants";
import SearchText from "../../../components/SeachText";
import { useRecoilValue } from "recoil";
import { serviceFilterState } from "../../../state/atom";

const Schedule = () => {

  const filter = useRecoilValue(serviceFilterState);
  
  return (
    <div id={style.container}>
      <div id={style.container__services}>
        <div id={style.container__services__header}>
          <p className={style.date}>{`${
            filter.date.getDate().toString().padStart(2, '0')
          } - ${monthNames[filter.date.getMonth()]} (${
            dayNames[filter.date.getDay()]
          })`}</p>
          <SearchText />
        </div>
        <ServiceList />
      </div>
      <FilterMenu />
    </div>
  );
};

export default Schedule;
