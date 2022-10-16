import dayjs from 'dayjs/esm';
import { TipoReuniao } from 'app/entities/enumerations/tipo-reuniao.model';

export interface IReuniao {
  id: number;
  nome?: string | null;
  descricao?: string | null;
  data?: dayjs.Dayjs | null;
  dataInicio?: dayjs.Dayjs | null;
  dataFim?: dayjs.Dayjs | null;
  horaInicio?: string | null;
  horaFim?: string | null;
  tipoReuniao?: TipoReuniao | null;
  obs?: string | null;
}

export type NewReuniao = Omit<IReuniao, 'id'> & { id: null };
