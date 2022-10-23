import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';

export interface IVotoNaoDecisao {
  id?: number;
  nome?: string;
  obs?: string | null;
  decisao?: IDecisao | null;
}

export class VotoNaoDecisao implements IVotoNaoDecisao {
  constructor(public id?: number, public nome?: string, public obs?: string | null, public decisao?: IDecisao | null) {}
}

export function getVotoNaoDecisaoIdentifier(votoNaoDecisao: IVotoNaoDecisao): number | undefined {
  return votoNaoDecisao.id;
}
