import { IFotoProduto, NewFotoProduto } from './foto-produto.model';

export const sampleWithRequiredData: IFotoProduto = {
  id: 47904,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoProduto = {
  id: 49657,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFotoProduto = {
  id: 57121,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithNewData: NewFotoProduto = {
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
