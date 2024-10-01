import { useSetRecoilState } from "recoil";
import { schedulesState } from "../atom";
import { ISchedule } from "../../shared/interfaces/ISchedule";

const useUpdateSchedules = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  return (scheduleUpdated: ISchedule) => {
    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id === scheduleUpdated.id) {
          return scheduleUpdated;
        }
        return schedule;
      })
    );
  };
};

export default useUpdateSchedules;
