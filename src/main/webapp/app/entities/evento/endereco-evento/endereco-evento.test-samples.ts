import { IEnderecoEvento } from './endereco-evento.model';

export const sampleWithRequiredData: IEnderecoEvento = {
  id: 31477,
  cep: 'Account co',
  logradouro: 'transitional Incrível Sabonete',
  numero: 'deposit Gr',
  bairro: 'Tunísia Timor-Leste Account',
  cidade: 'Madeira Berkshire matrix',
  uf: 'Gr',
};

export const sampleWithPartialData: IEnderecoEvento = {
  id: 72838,
  cep: 'Sudão pane',
  logradouro: 'Networked generate',
  complemento: 'synergistic wireless Engineer',
  numero: 'optical Lo',
  bairro: 'Salsicha Romênia navigating',
  cidade: 'services alliance Buckinghamshire',
  uf: 'Al',
};

export const sampleWithFullData: IEnderecoEvento = {
  id: 33025,
  cep: 'Avenida Hu',
  logradouro: 'Investor Inteligente',
  complemento: 'Account Customer',
  numero: 'Turismo',
  bairro: 'technologies Reino multi-byte',
  cidade: 'Baht infrastructures',
  uf: 'em',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
