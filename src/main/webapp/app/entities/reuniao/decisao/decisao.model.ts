import { IVotoSimDecisao } from 'app/entities/reuniao/voto-sim-decisao/voto-sim-decisao.model';
import { IVotoNaoDecisao } from 'app/entities/reuniao/voto-nao-decisao/voto-nao-decisao.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IDecisao {
  id?: number;
  nome?: string;
  obs?: string | null;
  votoSims?: IVotoSimDecisao[] | null;
  votoNaos?: IVotoNaoDecisao[] | null;
  reuniao?: IReuniao | null;
}

export class Decisao implements IDecisao {
  constructor(
    public id?: number,
    public nome?: string,
    public obs?: string | null,
    public votoSims?: IVotoSimDecisao[] | null,
    public votoNaos?: IVotoNaoDecisao[] | null,
    public reuniao?: IReuniao | null
  ) {}
}

export function getDecisaoIdentifier(decisao: IDecisao): number | undefined {
  return decisao.id;
}
