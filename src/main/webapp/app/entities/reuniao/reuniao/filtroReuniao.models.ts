export interface IFiltroReuniao {
  tipo?: string | null;
  idReuniao?: number | null;
}

export class FiltroReuniao implements IFiltroReuniao {
  constructor(public tipo?: string | null, public idReuniao?: number) {}
}
