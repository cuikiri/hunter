import { IFotoIcon } from './foto-icon.model';

export const sampleWithRequiredData: IFotoIcon = {
  id: 10226,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoIcon = {
  id: 27578,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFotoIcon = {
  id: 69089,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
