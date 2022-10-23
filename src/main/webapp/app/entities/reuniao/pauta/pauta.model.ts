import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';

export interface IPauta {
  id?: number;
  nome?: string;
  obs?: string | null;
  reuniao?: IReuniao | null;
}

export class Pauta implements IPauta {
  constructor(public id?: number, public nome?: string, public obs?: string | null, public reuniao?: IReuniao | null) {}
}

export function getPautaIdentifier(pauta: IPauta): number | undefined {
  return pauta.id;
}
