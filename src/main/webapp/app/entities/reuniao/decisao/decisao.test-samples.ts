import { IDecisao, NewDecisao } from './decisao.model';

export const sampleWithRequiredData: IDecisao = {
  id: 5379,
  nome: 'invoice',
};

export const sampleWithPartialData: IDecisao = {
  id: 37791,
  nome: 'haptic',
};

export const sampleWithFullData: IDecisao = {
  id: 22995,
  nome: 'state primary Travessa',
  obs: 'back-end empowering',
};

export const sampleWithNewData: NewDecisao = {
  nome: 'open-source Música',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
