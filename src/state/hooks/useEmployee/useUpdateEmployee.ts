import { useRecoilState, useSetRecoilState } from "recoil";
import http from "../../../service/http";
import { IBarber  as IEmployee} from "../../../shared/interfaces/IBarber"
import { employeesListState } from "../../atom";


const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, "");

    if (cleaned.length !== 11) {
      throw new Error("Número de telefone inválido");
    }

    const ddd = cleaned.slice(0, 2);
    const firstPart = cleaned.slice(2, 7);
    const secondPart = cleaned.slice(7);

    return `(${ddd}) ${firstPart}-${secondPart}`;
  };


const useUpdateEmployee = () => {
  const [employeesList,setEmployeesList] = useRecoilState(employeesListState);
    return async (newInfosEmployee: IEmployee, employeeID: number): Promise<IEmployee> => {
        newInfosEmployee.telefone = formatPhoneNumber(newInfosEmployee.telefone);
        const response = await http.put<IEmployee>(`/barbeiros/${employeeID}`, newInfosEmployee);
        setEmployeesList(employeesList.map((employee) => {if(Number(employee.id) === employeeID) { return newInfosEmployee} else return employee }))
        return response.data;
    }
}

export default useUpdateEmployee;