import { useSetRecoilState } from "recoil";
import { schedulesState } from "../../atom";
import { ISchedule } from "../../../shared/interfaces/ISchedule";
import http from "../../../service/http";

const useUpdateSchedules = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  return async (scheduleToUpdate: ISchedule) => {
    await http
      .put<ISchedule>(`/atendimento/${scheduleToUpdate.id}/finalizar`)
      .then(() => {
        alert("Atendimento finalizado!");
      })
      .then(() => {
        setSchedules((prev) => {
          console.log("Estado anterior:", prev);
          const updatedSchedules = prev.map((schedule) => {
            if (schedule.id === scheduleToUpdate.id) {
              return { ...scheduleToUpdate, finalizado: true };
            }
            return schedule;
          });
          console.log("Novo estado:", updatedSchedules);
          return updatedSchedules;
        });
      })
      .catch((erro) => console.log(erro));
  };
};

export default useUpdateSchedules;
