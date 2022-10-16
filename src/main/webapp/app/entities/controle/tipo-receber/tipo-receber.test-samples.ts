import { ITipoReceber, NewTipoReceber } from './tipo-receber.model';

export const sampleWithRequiredData: ITipoReceber = {
  id: 74700,
  nome: 'toolset',
};

export const sampleWithPartialData: ITipoReceber = {
  id: 62167,
  nome: 'primary bifurcated',
};

export const sampleWithFullData: ITipoReceber = {
  id: 78954,
  nome: 'Malawi Specialist',
};

export const sampleWithNewData: NewTipoReceber = {
  nome: 'Mexican vertical Pro',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
