import { useSetRecoilState } from "recoil"
import { IBarber as IEmployee} from "../../../shared/interfaces/IBarber"
import { employeeState } from "../../atom"

export const useSetEmployee = () => {

    const setEmployee = useSetRecoilState(employeeState);
    return (employee: IEmployee) => {
        setEmployee(employee);
    }
}