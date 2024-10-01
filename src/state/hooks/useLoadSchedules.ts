import { useSetRecoilState } from "recoil";
import { schedulesState } from "../atom";
import { ISchedule } from "../../shared/interfaces/ISchedule";

const useLoadSchedules = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  return (schedules: ISchedule[]) => {
    return setSchedules(schedules);
  };
};

export default useLoadSchedules;
