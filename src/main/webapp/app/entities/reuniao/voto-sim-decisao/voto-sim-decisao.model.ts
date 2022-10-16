import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';

export interface IVotoSimDecisao {
  id: number;
  nome?: string | null;
  obs?: string | null;
  decisao?: Pick<IDecisao, 'id'> | null;
}

export type NewVotoSimDecisao = Omit<IVotoSimDecisao, 'id'> & { id: null };
