import { selector } from "recoil";
import { schedulesFilterState, schedulesState } from "../../atom";

export const filteredSchedulesState = selector({
    key: 'filteredSchedulesState',
    get: ({get}) => {
        const filter = get(schedulesFilterState);
        const schedules = get(schedulesState);

        switch (filter.status) {
            case "confirmed":
              return schedules.filter((schedule) => schedule.confirmado && !schedule.finalizado);
            case "finished":
              return schedules.filter((schedule) => schedule.finalizado );
            default:
              return schedules;
          }
    }
})
