import http from "../../../service/http";
import { IBarber  as IEmployee} from "../../../shared/interfaces/IBarber"

interface newInfosEmployee {
    nome: string,
    telefone:string,
    email: string,
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


const useUpdateEmployee = () => {
    return async (newInfosEmployee: newInfosEmployee, employeeID: number): Promise<IEmployee> => {
        newInfosEmployee.telefone = formatPhoneNumber(newInfosEmployee.telefone);
        const response = await http.put<IEmployee>(`/barbeiros/${employeeID}`, newInfosEmployee);
        return response.data;
    }
}

export default useUpdateEmployee;