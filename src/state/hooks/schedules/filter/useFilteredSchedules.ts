import { useRecoilValue } from "recoil"
import { filteredSchedulesState } from "../selectors";

const useFilteredSchedules = () => {
    return useRecoilValue(filteredSchedulesState);   
}

export default useFilteredSchedules;