import { IDocumento } from './documento.model';

export const sampleWithRequiredData: IDocumento = {
  id: 81947,
  descricao: 'infrastructure',
};

export const sampleWithPartialData: IDocumento = {
  id: 86029,
  descricao: 'withdrawal Queijo',
};

export const sampleWithFullData: IDocumento = {
  id: 79712,
  descricao: 'synergistic Agent Principal',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
