import { useRecoilValue } from "recoil"
import { filteredSchedulesState } from "./selectors";

const useSchedules = () => {
    return useRecoilValue(filteredSchedulesState);   
}

export default useSchedules;