import { atom } from "recoil";
import { IBarber } from "../shared/interfaces/IBarber";
import { IBarberShop } from "../shared/interfaces/IBarberShop";
import { IScheduleFilter } from "../shared/interfaces/IScheduleFilter";
import { IClient } from "../shared/interfaces/IClient";
import { IService } from "../shared/interfaces/IService";
import { ISchedule } from "../shared/interfaces/ISchedule";

export const employeeState = atom<IBarber>({
  key: "employeeState",
  default: {
    id: "0",
    nome: "",
    idBarbearia: 0,
    telefone: "",
    email: "",
  },
});

export const establishmentState = atom<IBarberShop>({
  key: "establishmentState",
  default: {
    id: 0,
    nome: "",
    email: "",
  },
});

export const schedulesState = atom<ISchedule[]>({
  key: 'schedulesState',
  default: []
})

export const schedulesFilterState = atom<IScheduleFilter>({
  key: 'schedulesFilterState',
  default: {date: new Date(), status: null}
})

export const clientsState = atom<IClient[]>({
  key: 'clientsState',
  default: []
})