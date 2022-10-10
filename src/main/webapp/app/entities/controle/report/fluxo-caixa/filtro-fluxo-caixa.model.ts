import dayjs from 'dayjs/esm';

export interface IFiltroFluxoCaixa {
  dataInicio?: dayjs.Dayjs;
  dataFim?: dayjs.Dayjs;
  tipo?: string | null;
}

export class FiltroFluxoCaixa implements IFiltroFluxoCaixa {
  constructor(public data?: dayjs.Dayjs, public dataFim?: dayjs.Dayjs, public tipo?: string | null) {}
}
