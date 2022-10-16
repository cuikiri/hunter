import { ITipoDocumento, NewTipoDocumento } from './tipo-documento.model';

export const sampleWithRequiredData: ITipoDocumento = {
  id: 59406,
  codigo: 'Centralized collabor',
  nome: 'matrix',
};

export const sampleWithPartialData: ITipoDocumento = {
  id: 59584,
  codigo: 'integrated target',
  nome: 'Bahamas',
};

export const sampleWithFullData: ITipoDocumento = {
  id: 58163,
  codigo: 'Inteligente',
  nome: 'Ergonômico',
  descricao: 'Rústico application Cadeira',
};

export const sampleWithNewData: NewTipoDocumento = {
  codigo: 'protocol',
  nome: 'workforce',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
