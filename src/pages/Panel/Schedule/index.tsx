import style from "./style.module.css";
import FilterMenu from "./FilterMenu";
import ScheduleList from "./ScheduleList";

const Schedule = () => {
  return (
    <div id={style.container}>
      <div id={style.services}>
        <ScheduleList />
      </div>
      <FilterMenu />
    </div>
  );
};

export default Schedule;