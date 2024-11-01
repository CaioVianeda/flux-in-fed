import http from "../../../service/http";
import { IService } from "../../../shared/interfaces/IService";
import { useServices } from "./useServices";
import { useSetServices } from "./useSetServices";

export const useUpdateService = () => {
  const services = useServices();
  const setServices = useSetServices();
  return async (updatedservice: IService) => {
    const body = {
      nome: updatedservice.nome,
      preco: updatedservice.preco,
    };

    http.put(`/procedimentos/${updatedservice.id}`, body).then(() => {
      alert("Procedimento atualizado com sucesso!");
      setServices(
        services.map((service) => {
          if (service.id === updatedservice.id) {
            return updatedservice;
          }
          return service;
        })
      );
    }).catch((erro) => {
        alert("Erro inesperado, entre em contato com o desenvolvedor.");
        console.log(erro);
    })
  };
};
