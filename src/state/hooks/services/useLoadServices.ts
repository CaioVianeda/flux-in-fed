import http from "../../../service/http";
import { IService } from "../../../shared/interfaces/IService";
import { useSetServices } from "./useSetServices";

export const useLoadServices = () => {
    const setServices = useSetServices()
    return async () => {
    await http.get<IService[]>("/procedimentos").then((response) => {
            setServices(response.data);
          });
    }
}