import { useRecoilValue, useSetRecoilState } from "recoil"
import { employeesListState, employeeState } from "../../atom"
import { useEffect } from "react";
import { IBarber as IEmployee } from "../../../shared/interfaces/IBarber";


export const useSetEmployeesList = () => {
    const setEmployeesList = useSetRecoilState(employeesListState);
   return (employeesList: IEmployee[]) => {
        setEmployeesList(employeesList);
   }
}