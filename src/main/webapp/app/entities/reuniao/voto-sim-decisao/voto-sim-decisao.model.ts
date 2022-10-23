import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';

export interface IVotoSimDecisao {
  id?: number;
  nome?: string;
  obs?: string | null;
  decisao?: IDecisao | null;
}

export class VotoSimDecisao implements IVotoSimDecisao {
  constructor(public id?: number, public nome?: string, public obs?: string | null, public decisao?: IDecisao | null) {}
}

export function getVotoSimDecisaoIdentifier(votoSimDecisao: IVotoSimDecisao): number | undefined {
  return votoSimDecisao.id;
}
