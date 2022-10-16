import dayjs from 'dayjs/esm';

import { ISaidaEstoque, NewSaidaEstoque } from './saida-estoque.model';

export const sampleWithRequiredData: ISaidaEstoque = {
  id: 53397,
  data: dayjs('2022-09-15'),
  qtde: 75326,
  valorUnitario: 98533,
};

export const sampleWithPartialData: ISaidaEstoque = {
  id: 26975,
  data: dayjs('2022-09-15'),
  qtde: 63240,
  valorUnitario: 91980,
};

export const sampleWithFullData: ISaidaEstoque = {
  id: 98972,
  data: dayjs('2022-09-15'),
  qtde: 31832,
  valorUnitario: 19062,
  obs: 'Open-source',
};

export const sampleWithNewData: NewSaidaEstoque = {
  data: dayjs('2022-09-15'),
  qtde: 58966,
  valorUnitario: 72393,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
