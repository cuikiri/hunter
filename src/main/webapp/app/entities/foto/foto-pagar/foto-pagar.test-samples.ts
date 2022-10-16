import { IFotoPagar, NewFotoPagar } from './foto-pagar.model';

export const sampleWithRequiredData: IFotoPagar = {
  id: 91081,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoPagar = {
  id: 66675,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFotoPagar = {
  id: 85329,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithNewData: NewFotoPagar = {
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
