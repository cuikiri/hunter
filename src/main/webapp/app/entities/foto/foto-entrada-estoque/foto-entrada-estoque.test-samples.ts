import { IFotoEntradaEstoque } from './foto-entrada-estoque.model';

export const sampleWithRequiredData: IFotoEntradaEstoque = {
  id: 85977,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoEntradaEstoque = {
  id: 13738,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFotoEntradaEstoque = {
  id: 968,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
