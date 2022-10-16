import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IPauta {
  id: number;
  nome?: string | null;
  obs?: string | null;
  reuniao?: Pick<IReuniao, 'id'> | null;
}

export type NewPauta = Omit<IPauta, 'id'> & { id: null };
