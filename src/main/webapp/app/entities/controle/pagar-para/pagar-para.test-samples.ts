import { IPagarPara, NewPagarPara } from './pagar-para.model';

export const sampleWithRequiredData: IPagarPara = {
  id: 47727,
  nome: 'Rua',
};

export const sampleWithPartialData: IPagarPara = {
  id: 68121,
  nome: 'Montserrat',
  banco: 'Ferramentas',
  agencia: 'circuit Jogos',
  conta: 'projection',
};

export const sampleWithFullData: IPagarPara = {
  id: 22388,
  nome: 'Buckinghamshire',
  descricao: 'Account',
  cnpj: false,
  documento: 'Algodão',
  banco: 'Buckinghamshire uniform',
  agencia: 'Intranet',
  conta: 'Devolved',
  pix: 'Esportes District',
};

export const sampleWithNewData: NewPagarPara = {
  nome: 'backing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
