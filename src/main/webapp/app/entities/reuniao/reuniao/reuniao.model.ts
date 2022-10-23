import dayjs from 'dayjs/esm';
import { IPauta } from 'app/entities/reuniao/pauta/pauta.model';
import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';
import { IAcao } from 'app/entities/reuniao/acao/acao.model';
import { IParticipante } from 'app/entities/reuniao/participante/participante.model';
import { TipoReuniao } from 'app/entities/enumerations/tipo-reuniao.model';

export interface IReuniao {
  id?: number;
  nome?: string;
  descricao?: string;
  data?: dayjs.Dayjs;
  dataInicio?: dayjs.Dayjs | null;
  dataFim?: dayjs.Dayjs | null;
  horaInicio?: string | null;
  horaFim?: string | null;
  tipoReuniao?: TipoReuniao | null;
  obs?: string | null;
  pautas?: IPauta[] | null;
  decisoes?: IDecisao[] | null;
  acoes?: IAcao[] | null;
  participantes?: IParticipante[] | null;
}

export class Reuniao implements IReuniao {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public data?: dayjs.Dayjs,
    public dataInicio?: dayjs.Dayjs | null,
    public dataFim?: dayjs.Dayjs | null,
    public horaInicio?: string | null,
    public horaFim?: string | null,
    public tipoReuniao?: TipoReuniao | null,
    public obs?: string | null,
    public pautas?: IPauta[] | null,
    public decisoes?: IDecisao[] | null,
    public acoes?: IAcao[] | null,
    public participantes?: IParticipante[] | null
  ) {}
}

export function getReuniaoIdentifier(reuniao: IReuniao): number | undefined {
  return reuniao.id;
}
