import http from "../../../service/http"
import { useServices } from "./useServices";
import { useSetServices } from "./useSetServices";

export const useDeleteService = () =>{
    const services = useServices();
    const setServices = useSetServices();
    return (id: Number) => {
        http.delete(`/procedimentos/${id}`)
        .then(() => {
            setServices(services.filter((service) => service.id !== id));
            alert("Procedimento deletado com sucesso!");
        })
        .catch((error) => {
            console.log(error);
            alert("Erro inesperado, entre em contato com o desenvolvedor.");
        });
    }
}