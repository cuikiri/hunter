import { IParticipante, NewParticipante } from './participante.model';

export const sampleWithRequiredData: IParticipante = {
  id: 67295,
  nome: 'National',
};

export const sampleWithPartialData: IParticipante = {
  id: 52767,
  nome: 'Directives',
};

export const sampleWithFullData: IParticipante = {
  id: 43291,
  nome: 'Sabonete Gostoso lilás',
  obs: 'Directives China',
};

export const sampleWithNewData: NewParticipante = {
  nome: 'Multi-layered Botsuana Reactive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
