import { ISubGrupoProduto, NewSubGrupoProduto } from './sub-grupo-produto.model';

export const sampleWithRequiredData: ISubGrupoProduto = {
  id: 93823,
  nome: 'Assistant',
};

export const sampleWithPartialData: ISubGrupoProduto = {
  id: 22704,
  nome: 'Tunisian connecting',
  obs: 'cross-platform Data',
};

export const sampleWithFullData: ISubGrupoProduto = {
  id: 25722,
  nome: 'optical',
  obs: 'Loan implement withdrawal',
};

export const sampleWithNewData: NewSubGrupoProduto = {
  nome: 'Inteligente',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
