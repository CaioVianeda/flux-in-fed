import { useRecoilState } from "recoil";
import http from "../../../service/http";
import { IBarber } from "../../../shared/interfaces/IBarber";
import { employeesListState } from "../../atom";

interface newEmployee {
  nome: string;
  telefone: string;
  email: string;
}

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

const useCreateEmployee = () => {
  const [employeesList, setEmployeesList] = useRecoilState(employeesListState);
  return async (
    newEmployee: newEmployee,
    idEstablishment: number
  ): Promise<IBarber> => {
    newEmployee.telefone = formatPhoneNumber(newEmployee.telefone);
    const response = await http.post<IBarber>(
      `/barbeiros/${idEstablishment}`,
      newEmployee
    );
    setEmployeesList([...employeesList, response.data]);
    return response.data;
  };
};

export default useCreateEmployee;
