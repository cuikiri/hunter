import { ITipoContratacao } from './tipo-contratacao.model';

export const sampleWithRequiredData: ITipoContratacao = {
  id: 1770,
  nome: 'Chapéu',
};

export const sampleWithPartialData: ITipoContratacao = {
  id: 57203,
  nome: 'SAS',
};

export const sampleWithFullData: ITipoContratacao = {
  id: 3364,
  nome: 'Implementation Taka',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
