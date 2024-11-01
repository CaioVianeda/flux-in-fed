import http from "../../../service/http";
import { IBarberShop as IEstablishment } from "../../../shared/interfaces/IBarberShop";
import { useSetEstablishment } from "./useSetEstablishment";

export const useLoadEstablishment = () => {
  const setEstablishment = useSetEstablishment();
  return async (id: Number) => {
    await http
      .get<IEstablishment>(`/barbearias/${id}`)
      .then((response) => {
        setEstablishment(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Erro inesperado, entre em contato com o desenvolvedor.");
      });
  };
};
