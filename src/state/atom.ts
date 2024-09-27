import { atom } from "recoil";
import { IBarber } from "../shared/interfaces/IBarber";
import { IBarberShop } from "../shared/interfaces/IBarberShop";
import { IServiceFilter } from "../shared/interfaces/IServiceFilter";
import { IClient } from "../shared/interfaces/IClient";

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

export const serviceFilterState = atom<IServiceFilter>({
  key: 'serviceFilterState',
  default: {date: new Date(), status: null}
})

export const clientsState = atom<IClient[]>({
  key: 'clientsState',
  default: []
})