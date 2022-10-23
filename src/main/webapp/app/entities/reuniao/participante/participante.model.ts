import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IParticipante {
  id?: number;
  nome?: string;
  obs?: string | null;
  reuniao?: IReuniao | null;
}

export class Participante implements IParticipante {
  constructor(public id?: number, public nome?: string, public obs?: string | null, public reuniao?: IReuniao | null) {}
}

export function getParticipanteIdentifier(participante: IParticipante): number | undefined {
  return participante.id;
}
