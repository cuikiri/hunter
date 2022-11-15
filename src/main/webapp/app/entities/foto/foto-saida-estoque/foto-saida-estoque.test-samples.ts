import { IFotoSaidaEstoque } from './foto-saida-estoque.model';

export const sampleWithRequiredData: IFotoSaidaEstoque = {
  id: 67577,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoSaidaEstoque = {
  id: 64581,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFotoSaidaEstoque = {
  id: 21008,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
