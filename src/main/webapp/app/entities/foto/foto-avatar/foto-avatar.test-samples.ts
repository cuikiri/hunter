import { IFotoAvatar } from './foto-avatar.model';

export const sampleWithRequiredData: IFotoAvatar = {
  id: 26440,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoAvatar = {
  id: 77151,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

export const sampleWithFullData: IFotoAvatar = {
  id: 18853,
  conteudo: '../fake-data/blob/hipster.png',
  conteudoContentType: 'unknown',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
