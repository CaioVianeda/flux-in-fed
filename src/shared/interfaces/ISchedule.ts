import { IService } from "./IService";

export interface ISchedule {
  id: number;
  clienteId: number;
  nomeCliente: string;
  nomeBarbeiro: string;
  procedimentos: IService[];
  total: number;
  data: string | Date;
  duracao: string;
  finalizado: boolean;
  confirmado: boolean;
}

