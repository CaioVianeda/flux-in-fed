import { useSetRecoilState } from "recoil";
import { ISchedule } from "../../shared/interfaces/ISchedule";
import { schedulesState } from "../atom";

const useRemoveSchedule = () => {

    const setSchedules = useSetRecoilState(schedulesState);

    return (scheduleRemovedId: number) => {
        setSchedules(prev => prev.filter((schedule) => schedule.id !== scheduleRemovedId));
    }
}

export default useRemoveSchedule;