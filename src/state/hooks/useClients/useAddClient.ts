import { useSetRecoilState } from "recoil"
import { clientsState } from "../../atom"
import { IClient } from "../../../shared/interfaces/IClient";
import http from "../../../service/http";

export const useAddClient = () => {

    const setClients = useSetRecoilState(clientsState);

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

    const createClient = async (client: IClient) => {

        if(client.nome === ''){
          throw new Error("Nome do cliente não foi informado!")
        }
        if(client.telefone === ''){
            throw new Error("Telefone do cliente não foi informado!")
          }
        const body = {
          nome: client.nome,
          telefone: formatPhoneNumber(client.telefone),
        };
    
        const response = await http.post<IClient>("clientes", body);
        if (!response.data || !response.data.id) {
          throw new Error("Não houve retorno da API!");
        }
        return response.data;
      };
    

    return async (newClient: IClient) => {
        try{
            const createdClient = await createClient(newClient);
            setClients((prevClients) => [...prevClients, createdClient]);
            return createdClient;
        } catch(erro){
            console.log(`Erro ao criar cliente: ${erro}`);
        } 
    }
}