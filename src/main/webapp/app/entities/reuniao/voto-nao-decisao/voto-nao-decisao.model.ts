import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';

export interface IVotoNaoDecisao {
  id: number;
  nome?: string | null;
  obs?: string | null;
  decisao?: Pick<IDecisao, 'id'> | null;
}

export type NewVotoNaoDecisao = Omit<IVotoNaoDecisao, 'id'> & { id: null };
