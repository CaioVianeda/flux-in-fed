import ScheduleCard from "./SchedulingCard";
import style from './style.module.css'
import { useRecoilValue } from "recoil";
import { schedulesState } from "../../../../state/atom";

const ServiceListCards = () => {

  const schedules = useRecoilValue(schedulesState);

  return (
    <div id={style["scheduling-list-cards"]}>  
      {schedules.map((scheduling) => <ScheduleCard key={scheduling.id} scheduling={scheduling}/>)}
    </div>
  );
};

export default ServiceListCards;
