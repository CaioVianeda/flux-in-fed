import { selector } from "recoil";
import { schedulesFilterState, schedulesState } from "../../atom";

export const filteredSchedulesState = selector({
    key: 'filteredSchedulesState',
    get: ({get}) => {
        const filter = get(schedulesFilterState);
        const schedules = get(schedulesState);

        switch (filter.status) {
            case "confirmed":
              return schedules.filter((schedule) => schedule.confirmado);
            case "waitingConfirmation":
              return schedules.filter((schedule) => !schedule.confirmado);
            case "finished":
              return schedules.filter((schedule) => schedule.finalizado);
            case "canceled":
              return schedules.filter((schedule) => schedule);
            default:
              return schedules;
          }
    }
})
