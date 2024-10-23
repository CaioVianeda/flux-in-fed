import { useRecoilValue } from "recoil"
import { employeeState } from "../../atom"

export const useEmployee = () => {
    return useRecoilValue(employeeState);
}