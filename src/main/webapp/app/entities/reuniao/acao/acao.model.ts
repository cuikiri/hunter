import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IAcao {
  id?: number;
  nome?: string;
  obs?: string | null;
  reuniao?: IReuniao | null;
}

export class Acao implements IAcao {
  constructor(public id?: number, public nome?: string, public obs?: string | null, public reuniao?: IReuniao | null) {}
}

export function getAcaoIdentifier(acao: IAcao): number | undefined {
  return acao.id;
}
