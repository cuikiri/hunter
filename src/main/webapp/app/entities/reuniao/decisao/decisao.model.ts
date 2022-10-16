import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IDecisao {
  id: number;
  nome?: string | null;
  obs?: string | null;
  reuniao?: Pick<IReuniao, 'id'> | null;
}

export type NewDecisao = Omit<IDecisao, 'id'> & { id: null };
