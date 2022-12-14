import dayjs from 'dayjs/esm';

import { IEntradaEstoque } from './entrada-estoque.model';

export const sampleWithRequiredData: IEntradaEstoque = {
  id: 78258,
  data: dayjs('2022-09-15'),
  qtde: 61034,
  valorUnitario: 87377,
};

export const sampleWithPartialData: IEntradaEstoque = {
  id: 89704,
  data: dayjs('2022-09-15'),
  qtde: 39351,
  valorUnitario: 67983,
  obs: 'Eletrônicos verde-azulado',
};

export const sampleWithFullData: IEntradaEstoque = {
  id: 64423,
  data: dayjs('2022-09-15'),
  qtde: 66468,
  valorUnitario: 58077,
  obs: 'model Bicicleta',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
