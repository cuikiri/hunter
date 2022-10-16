import dayjs from 'dayjs/esm';

import { TipoReuniao } from 'app/entities/enumerations/tipo-reuniao.model';

import { IReuniao, NewReuniao } from './reuniao.model';

export const sampleWithRequiredData: IReuniao = {
  id: 40308,
  nome: 'Tugrik Rondônia open-source',
  descricao: 'Rua',
  data: dayjs('2022-10-14'),
};

export const sampleWithPartialData: IReuniao = {
  id: 1172,
  nome: 'Aço Mato Bebê',
  descricao: 'synergies dot-com out-of-the-box',
  data: dayjs('2022-10-14'),
  dataFim: dayjs('2022-10-14'),
  horaInicio: 'incre',
  horaFim: 'Bacon',
};

export const sampleWithFullData: IReuniao = {
  id: 14445,
  nome: 'disintermediate SAS',
  descricao: 'system Bahia channels',
  data: dayjs('2022-10-14'),
  dataInicio: dayjs('2022-10-14'),
  dataFim: dayjs('2022-10-14'),
  horaInicio: 'inter',
  horaFim: 'Fantá',
  tipoReuniao: TipoReuniao['CRIATIVA'],
  obs: 'Albânia bifurcated sexy',
};

export const sampleWithNewData: NewReuniao = {
  nome: 'Lindo',
  descricao: 'backing',
  data: dayjs('2022-10-14'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
