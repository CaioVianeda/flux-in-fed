import { useSetRecoilState } from "recoil";
import { ISchedule } from "../../../shared/interfaces/ISchedule";
import { schedulesState } from "../../atom";
import { IToSchedule } from "../../../shared/interfaces/IToSchedule";
import { format } from "date-fns";
import http from "../../../service/http";
import axios from "axios";

const useAddSchedule = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  const convertDateToString = (date: Date) => {
    const selectedDate = new Date(date);
    return format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss");
  };

  return async (newSchedule: IToSchedule) => {


    const newScheduleWithDateFormatted = {...newSchedule, data: newSchedule.data instanceof Date ? convertDateToString(newSchedule.data): newSchedule.data}

    try {
      const response = await http.post<ISchedule>("atendimento", newScheduleWithDateFormatted);
      setSchedules((prev) => [...prev, response.data]);
      alert("Agendamento realizado!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert(`${error.response.data}`);
        } else {
          alert(`Ops... Erro desconhecido.`);
        }
      }
    }
  };
};

export default useAddSchedule;