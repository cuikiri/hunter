import dayjs from 'dayjs/esm';

import { IEstoque, NewEstoque } from './estoque.model';

export const sampleWithRequiredData: IEstoque = {
  id: 46991,
  data: dayjs('2022-09-15'),
  qtde: 60536,
  valorUnitario: 83489,
  valorTotal: 51958,
};

export const sampleWithPartialData: IEstoque = {
  id: 38612,
  data: dayjs('2022-09-15'),
  qtde: 55913,
  valorUnitario: 20606,
  valorTotal: 8841,
};

export const sampleWithFullData: IEstoque = {
  id: 96443,
  data: dayjs('2022-09-15'),
  qtde: 87101,
  valorUnitario: 55117,
  valorTotal: 63197,
};

export const sampleWithNewData: NewEstoque = {
  data: dayjs('2022-09-15'),
  qtde: 63829,
  valorUnitario: 53015,
  valorTotal: 40015,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
