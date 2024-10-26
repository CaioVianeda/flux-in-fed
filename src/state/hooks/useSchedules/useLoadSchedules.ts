import { useSetRecoilState } from "recoil";
import { schedulesState } from "../../atom";
import { ISchedule } from "../../../shared/interfaces/ISchedule";
import { IBarber as IEmployee} from "../../../shared/interfaces/IBarber";
import http from "../../../service/http";

const useLoadSchedules = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  function formatDateToLocalDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  return (employee: IEmployee, fromDate: Date, toDate: Date) => {

    const body = {
      dataInicial: formatDateToLocalDateTime(fromDate),
      dataFinal: formatDateToLocalDateTime(toDate),
    };
    
      http
        .post<ISchedule[]>(`/atendimento/${employee.id}/filtrar`, body)
        .then((response) => {
          return setSchedules(response.data);
        })
        .catch((erro) => {
          console.log(erro);
        });

  };
};

export default useLoadSchedules;
