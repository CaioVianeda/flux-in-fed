import { ISchedule } from "../../../shared/interfaces/ISchedule";
import http from "../../../service/http";
import { useEmployee } from "../employee/useEmployee";
import { useSetSchedules } from "./useSetSchedules";

const useLoadSchedules = () => {
  const employee = useEmployee();
  const setSchedules = useSetSchedules();

  function formatDateToLocalDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  return (fromDate: Date, toDate: Date) => {
    const body = {
      dataInicial: formatDateToLocalDateTime(fromDate),
      dataFinal: formatDateToLocalDateTime(toDate),
    };
    if(employee.id === '0' || employee.id === null){
      setSchedules([]);
    } else{
    http
      .post<ISchedule[]>(`/atendimento/${employee.id}/filtrar`, body)
      .then((response) => {
        return setSchedules(response.data);
      })
      .catch((error) => {
        alert("Erro inesperado, entre em contato com o desenvolvedor.");
        console.log(error);
      });}
  };
};

export default useLoadSchedules;
