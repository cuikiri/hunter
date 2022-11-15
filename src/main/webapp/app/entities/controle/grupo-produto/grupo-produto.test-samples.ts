import { IGrupoProduto } from './grupo-produto.model';

export const sampleWithRequiredData: IGrupoProduto = {
  id: 88628,
  nome: 'Granito Product Caribbean',
};

export const sampleWithPartialData: IGrupoProduto = {
  id: 38786,
  nome: 'killer optimize Genérico',
};

export const sampleWithFullData: IGrupoProduto = {
  id: 75184,
  nome: 'dot-com Chief Multi-lateral',
  obs: 'superstructure',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
