import Avatar from '@mui/material/Avatar';
import style from './style.module.css'
import { MoreVert } from '@mui/icons-material';
import { ISchedule } from '../../../../../../shared/interfaces/ISchedule';

interface Props{
    scheduling: ISchedule
}

const SchedulingCard = ({scheduling}: Props) => {

  const addTimeToDate = (date: Date, duration: string) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    newDate.setSeconds(newDate.getSeconds() + seconds);
    return newDate;
  };

  const showTimeOfSchedule = (date: Date, duration: string) => {
    const scheduleTimeEnd = addTimeToDate(date, duration);
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }h - ${scheduleTimeEnd.getHours()}:${
      scheduleTimeEnd.getMinutes() < 10
        ? "0" + scheduleTimeEnd.getMinutes()
        : scheduleTimeEnd.getMinutes()
    }h`;
  };

  return(  <div className={style.card}>
    <div className={style.card_infos}>
      <div>
        <Avatar sx={{ width: 50, height: 50 }} />
      </div>
      <div className={style.info}>
        <span className={style.name}>{scheduling.nomeCliente.toUpperCase()}</span>
        <span className={style.time}>{showTimeOfSchedule(new Date(scheduling.data), scheduling.duracao)}</span>
      </div>
    </div>
    <div>
      <div id={style.button__more}>
        <MoreVert />
      </div>
    </div>
  </div>)
}

export default SchedulingCard;