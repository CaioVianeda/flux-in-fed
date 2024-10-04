import Avatar from '@mui/material/Avatar';
import style from './style.module.css'
import { MoreVert } from '@mui/icons-material';
import { ISchedule } from '../../../../../../shared/interfaces/ISchedule';

interface Props{
    scheduling: ISchedule
}

const SchedulingCard = ({scheduling}: Props) => {

    const getTimeFromDate = (date: string) => {
        return date.substring(11,16);
    }

  return(  <div className={style.card}>
    <div className={style.card_infos}>
      <div>
        <Avatar sx={{ width: 58, height: 58 }} />
      </div>
      <div className={style.card_infos_info}>
        <span className={style.name}>{scheduling.nomeCliente.toUpperCase()}</span>
        <span className={style.time}>{getTimeFromDate(scheduling.data)}</span>
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