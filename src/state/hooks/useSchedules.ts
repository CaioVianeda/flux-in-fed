import { useRecoilValue } from "recoil"
import { schedulesState } from "../atom";

const useSchedules = () => {
    return useRecoilValue(schedulesState);   
}

export default useSchedules;