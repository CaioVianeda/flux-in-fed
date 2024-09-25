import { atom } from "recoil";
import { IBarber } from "../shared/interfaces/IBarber";
import { IBarberShop } from "../shared/interfaces/IBarberShop";

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

export const filterDateState = atom<Date>({
    key: "filterDate",
    default: new Date(),
})
