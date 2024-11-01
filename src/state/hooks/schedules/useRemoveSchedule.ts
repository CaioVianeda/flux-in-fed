import { useSetRecoilState } from "recoil";
import { schedulesState } from "../../atom";
import http from "../../../service/http";

const useRemoveSchedule = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  return async (scheduleIdToDelete: number) => {
    
      await http
        .delete(`/atendimento/${scheduleIdToDelete}`)
        .then(() => {
          alert("Atendimento removido com sucesso!");
        })
        .then(() => {
          setSchedules((prev) =>
            prev.filter((schedule) => schedule.id !== scheduleIdToDelete)
          );
        })
        .catch((erro) => console.log(erro));
    
  };
};

export default useRemoveSchedule;
