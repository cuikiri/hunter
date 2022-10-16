import { IProduto, NewProduto } from './produto.model';

export const sampleWithRequiredData: IProduto = {
  id: 79836,
  nome: 'Extended end-to-end Aço',
};

export const sampleWithPartialData: IProduto = {
  id: 86863,
  nome: 'Polarised revolutionary hybrid',
  unidade: 'global Borracha',
  peso: 'withdrawal compressi',
};

export const sampleWithFullData: IProduto = {
  id: 96539,
  nome: 'Franc Factors',
  descricao: 'e',
  unidade: 'dot-com synthesize R',
  peso: 'generating Mônaco ov',
};

export const sampleWithNewData: NewProduto = {
  nome: 'Bulgária Account',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
