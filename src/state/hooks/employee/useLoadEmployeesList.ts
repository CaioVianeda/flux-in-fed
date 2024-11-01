import http from "../../../service/http";
import { useSetEmployeesList } from "./useSetEmployeesList";
import { IBarber as IEmployee } from "../../../shared/interfaces/IBarber";

export const useLoadEmployeesList = () => {
    const setEmployeesList = useSetEmployeesList();
    return async () => {
        http.get<IEmployee[]>("/barbeiros").then((response) => {
            setEmployeesList(response.data);
          }); 
    }
}