import { IReligiao } from './religiao.model';

export const sampleWithRequiredData: IReligiao = {
  id: 56390,
  codigo: 'Avenida partnerships',
  descricao: 'Congelado Lindo Fresco',
};

export const sampleWithPartialData: IReligiao = {
  id: 2035,
  codigo: 'Buckinghamshire',
  descricao: 'granular',
};

export const sampleWithFullData: IReligiao = {
  id: 26917,
  codigo: 'preto radical',
  descricao: 'Lead Cedi Mesa',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
