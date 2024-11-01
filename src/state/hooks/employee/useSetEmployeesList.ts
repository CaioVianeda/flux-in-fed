import { useSetRecoilState } from "recoil"
import { employeesListState} from "../../atom"
import { IBarber as IEmployee } from "../../../shared/interfaces/IBarber";


export const useSetEmployeesList = () => {
    const setEmployeesList = useSetRecoilState(employeesListState);
   return (employeesList: IEmployee[]) => {
        setEmployeesList(employeesList);
   }
}