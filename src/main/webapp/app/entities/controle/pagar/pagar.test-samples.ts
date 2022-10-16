import dayjs from 'dayjs/esm';

import { StatusContaPagar } from 'app/entities/enumerations/status-conta-pagar.model';

import { IPagar, NewPagar } from './pagar.model';

export const sampleWithRequiredData: IPagar = {
  id: 41931,
  data: dayjs('2022-09-15'),
  valor: 96727,
};

export const sampleWithPartialData: IPagar = {
  id: 4978,
  data: dayjs('2022-09-15'),
  valor: 58236,
  status: StatusContaPagar['VENCIDA'],
};

export const sampleWithFullData: IPagar = {
  id: 39415,
  data: dayjs('2022-09-15'),
  valor: 91599,
  status: StatusContaPagar['PAGA_VENCIDA'],
  obs: 'Turquia Brunei',
};

export const sampleWithNewData: NewPagar = {
  data: dayjs('2022-09-15'),
  valor: 98621,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
