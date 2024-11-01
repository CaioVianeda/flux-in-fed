import http from "../../../service/http";
import { IService } from "../../../shared/interfaces/IService";
import { useServices } from "./useServices";
import { useSetServices } from "./useSetServices";

export const useAddService = () => {
  const services = useServices();
  const setServices = useSetServices();
  return (newService: IService) => {
    const body = {
      nome: newService.nome,
      preco: newService.preco,
    };
    http.post("/procedimentos", body).then((response) => {
      alert("Procedimento criado com sucesso!");
      setServices([...services, response.data]);
    }).catch((error) => {
      alert("Erro inesperado, entre em contato com o desenvolvedor.");
      console.log(error);
    })
  };
};
