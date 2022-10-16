import { IFotoIcon, NewFotoIcon } from './foto-icon.model';

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

export const sampleWithNewData: NewFotoIcon = {
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
