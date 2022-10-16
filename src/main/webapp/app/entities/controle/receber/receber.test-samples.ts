import dayjs from 'dayjs/esm';

import { StatusContaReceber } from 'app/entities/enumerations/status-conta-receber.model';

import { IReceber, NewReceber } from './receber.model';

export const sampleWithRequiredData: IReceber = {
  id: 22537,
  data: dayjs('2022-09-15'),
  valor: 59633,
};

export const sampleWithPartialData: IReceber = {
  id: 27539,
  data: dayjs('2022-09-15'),
  valor: 48647,
  status: StatusContaReceber['RECEBIDA'],
  obs: 'Brazilian tangible archive',
};

export const sampleWithFullData: IReceber = {
  id: 82249,
  data: dayjs('2022-09-15'),
  valor: 33618,
  status: StatusContaReceber['ARECEBER'],
  obs: 'Ergonomic Madeira',
};

export const sampleWithNewData: NewReceber = {
  data: dayjs('2022-09-15'),
  valor: 298,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
