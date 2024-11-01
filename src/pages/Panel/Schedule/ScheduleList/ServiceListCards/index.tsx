import SchedulingCard from "./SchedulingCard";
import style from './style.module.css'
import useSchedules from "../../../../../state/hooks/schedules/useSchedules";

const ServiceListCards = () => {

  const schedules = useSchedules();
  const orderedSchedules = [...schedules].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

  return (
    <div id={style["scheduled_list_cards"]}>  
      {orderedSchedules.map((scheduling) => <SchedulingCard key={scheduling.id} scheduling={scheduling}/>)}
    </div>
  );
};

export default ServiceListCards;