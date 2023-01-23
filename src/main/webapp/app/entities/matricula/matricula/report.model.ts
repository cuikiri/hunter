export interface IReportMatricula {
  tipo?: string;
  idMatricula?: number;
  tipoDocumento?: number;
}

export class ReportMatricula implements IReportMatricula {
  constructor(public tipo?: string, public idMatricula?: number, public tipoDocumento?: number) {}
}
