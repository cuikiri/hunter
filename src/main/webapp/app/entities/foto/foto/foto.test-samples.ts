import { IFoto, NewFoto } from './foto.model';

export const sampleWithRequiredData: IFoto = {
  id: 6821,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFoto = {
  id: 19377,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFoto = {
  id: 41592,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithNewData: NewFoto = {
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
