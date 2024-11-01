import { useSetRecoilState } from "recoil"
import { IScheduleFilter } from "../../../../shared/interfaces/IScheduleFilter"
import { schedulesFilterState } from "../../../atom"

export const useSetFilter = () => {
    const setFilter = useSetRecoilState(schedulesFilterState); 
    return (filter: IScheduleFilter) => {
        setFilter(filter);
    }
}