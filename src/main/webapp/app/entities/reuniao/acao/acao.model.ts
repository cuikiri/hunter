import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IAcao {
  id: number;
  nome?: string | null;
  obs?: string | null;
  reuniao?: Pick<IReuniao, 'id'> | null;
}

export type NewAcao = Omit<IAcao, 'id'> & { id: null };
