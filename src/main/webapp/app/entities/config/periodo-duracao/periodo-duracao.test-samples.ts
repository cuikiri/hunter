import dayjs from 'dayjs/esm';

import { IPeriodoDuracao, NewPeriodoDuracao } from './periodo-duracao.model';

export const sampleWithRequiredData: IPeriodoDuracao = {
  id: 32457,
  nome: 'Senior',
  dataInicio: dayjs('2022-09-15'),
  dataFim: dayjs('2022-09-15'),
};

export const sampleWithPartialData: IPeriodoDuracao = {
  id: 19163,
  nome: 'Response Camboja',
  dataInicio: dayjs('2022-09-15'),
  dataFim: dayjs('2022-09-15'),
  horaInicio: 'Bacon',
  horaFim: 'Conge',
  obs: 'Aço da',
};

export const sampleWithFullData: IPeriodoDuracao = {
  id: 83543,
  nome: 'Product Madeira users',
  dataInicio: dayjs('2022-09-15'),
  dataFim: dayjs('2022-09-15'),
  horaInicio: 'Bedfo',
  horaFim: 'Borra',
  obs: 'dynamic Sapatos',
};

export const sampleWithNewData: NewPeriodoDuracao = {
  nome: 'program',
  dataInicio: dayjs('2022-09-15'),
  dataFim: dayjs('2022-09-15'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
