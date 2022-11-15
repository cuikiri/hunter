import { IEndereco } from './endereco.model';

export const sampleWithRequiredData: IEndereco = {
  id: 91029,
  cep: 'Credit neu',
  logradouro: 'application optimize',
  complemento1: 'infomediaries CFP Money',
  numero: 'Fantástico',
  bairro: 'Innovative Macedônia',
  localidade: 'dynamic Shilling',
  uf: 'Salsicha methodical Rodovia',
  unidade: 'Checking Data',
};

export const sampleWithPartialData: IEndereco = {
  id: 10725,
  cep: 'e-markets',
  logradouro: 'JBOD XML SMTP',
  complemento1: 'Buckinghamshire multi-byte',
  numero: 'Borders ma',
  bairro: 'Madeira Borders',
  localidade: 'Borders Response',
  uf: 'e-services navigate',
  unidade: 'Pizza',
};

export const sampleWithFullData: IEndereco = {
  id: 47885,
  cep: 'Borders Di',
  logradouro: 'Pequeno',
  complemento1: 'withdrawal technologies Technician',
  numero: 'Bola Team-',
  bairro: 'bluetooth disintermediate state',
  localidade: 'Gostoso',
  uf: 'Accounts Fantástico e-business',
  unidade: 'Computadores Decentr',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
