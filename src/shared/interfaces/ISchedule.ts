
export interface ISchedule {
  id: number;
  clienteId: number;
  nomeCliente: string;
  nomeBarbeiro: string;
  procedimentos: procedimento[];
  total: number;
  data: string;
  duracao: string;
  finalizado: boolean;
  confirmado: boolean;
}

interface procedimento {
    id: number;
    nome: string;
    preco: number;
}