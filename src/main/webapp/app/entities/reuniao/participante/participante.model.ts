import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IParticipante {
  id: number;
  nome?: string | null;
  obs?: string | null;
  reuniao?: Pick<IReuniao, 'id'> | null;
}

export type NewParticipante = Omit<IParticipante, 'id'> & { id: null };
