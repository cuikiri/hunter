import { IFotoReceber } from './foto-receber.model';

export const sampleWithRequiredData: IFotoReceber = {
  id: 1443,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoReceber = {
  id: 22166,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFotoReceber = {
  id: 92908,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
