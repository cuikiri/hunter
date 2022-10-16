import { IRaca, NewRaca } from './raca.model';

export const sampleWithRequiredData: IRaca = {
  id: 21720,
  codigo: 'Amapá withdrawal',
  descricao: 'open-source JSON',
};

export const sampleWithPartialData: IRaca = {
  id: 97811,
  codigo: 'Brunei primary Admin',
  descricao: 'cohesive',
};

export const sampleWithFullData: IRaca = {
  id: 58839,
  codigo: 'Web',
  descricao: 'navigating',
};

export const sampleWithNewData: NewRaca = {
  codigo: 'Principal',
  descricao: 'Travessa',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
