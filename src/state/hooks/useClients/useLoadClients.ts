import { useRecoilState } from "recoil";
import { clientsState } from "../../atom";
import http from "../../../service/http";
import { IClient } from "../../../shared/interfaces/IClient";

export const useLoadClients = () => {
  const [clients, setClients] = useRecoilState(clientsState);

  const loadClients = async () => {
    if (clients.length === 0) {
      const response = await http.get<IClient[]>("/clientes");
      setClients(response.data);
    }
    return clients;
  };

  return loadClients;
};