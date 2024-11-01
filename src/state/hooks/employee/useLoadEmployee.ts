import http from "../../../service/http";
import { useLoadEstablishment } from "../establishment/useLoadEstablishment";
import { useSetEmployee } from "./useSetEmployee";

export const useLoadEmployee = () => {
  const setEmployee = useSetEmployee();
  const loadEstablishment = useLoadEstablishment();

  return async (id: Number) => {
    await http
      .get(`/barbeiros/${id}`)
      .then((response) => {
        setEmployee(response.data);
        loadEstablishment(response.data.idBarbearia);
      })
      .catch((error) => {
        console.log(error);
        alert("Erro inesperado, entre em contato com o desenvolvedor.");
      });
  };
};
