import { ITipoContratacao, NewTipoContratacao } from './tipo-contratacao.model';

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

export const sampleWithNewData: NewTipoContratacao = {
  nome: 'marca Research Espírito',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
