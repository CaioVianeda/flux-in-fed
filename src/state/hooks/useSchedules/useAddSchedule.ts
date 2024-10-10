import { useSetRecoilState } from "recoil";
import { ISchedule } from "../../../shared/interfaces/ISchedule";
import { schedulesState } from "../../atom";
import { IToSchedule } from "../../../shared/interfaces/IToSchedule";
import http from "../../../service/http";

const useAddSchedule = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  return async (newSchedule: IToSchedule) => {
    try {
      const response = await http.post<ISchedule>("atendimento", newSchedule);
      setSchedules((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(`Erro ao solicitar atendimento: ${error}`);
    }
  };
};

export default useAddSchedule;
