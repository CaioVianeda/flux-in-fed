import { useSetRecoilState } from "recoil"
import { ISchedule } from "../../../shared/interfaces/ISchedule"
import { schedulesState } from "../../atom"

export const useSetSchedules = () => {
    const setSchedules = useSetRecoilState(schedulesState);
    return (schedules: ISchedule[]) => {
        setSchedules(schedules);
    }
}