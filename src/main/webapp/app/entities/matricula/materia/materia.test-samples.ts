import { IMateria } from './materia.model';

export const sampleWithRequiredData: IMateria = {
  id: 91727,
  nome: 'full-range Refinado Inteligente',
};

export const sampleWithPartialData: IMateria = {
  id: 89174,
  nome: 'transmitting',
};

export const sampleWithFullData: IMateria = {
  id: 96114,
  nome: 'generation',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
