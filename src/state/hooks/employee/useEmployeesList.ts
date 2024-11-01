import { useRecoilValue } from "recoil"
import { employeesListState } from "../../atom"

export const useEmployeesList = () => {
    return useRecoilValue(employeesListState);
}