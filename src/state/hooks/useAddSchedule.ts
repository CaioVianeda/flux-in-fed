import { useSetRecoilState } from "recoil";
import { ISchedule } from "../../shared/interfaces/ISchedule";
import { schedulesState } from "../atom";

const useAddSchedule = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  return (newSchedule: ISchedule) => {
    setSchedules((prev) => [...prev, newSchedule]);
  };
};

export default useAddSchedule;
