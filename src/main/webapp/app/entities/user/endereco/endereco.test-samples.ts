import { IEndereco, NewEndereco } from './endereco.model';

export const sampleWithRequiredData: IEndereco = {
  id: 91029,
  cep: 'Credit neu',
  logradouro: 'application optimize',
  complemento1: 'infomediaries CFP Money',
  complemento2: 'transmitting parsing',
  numero: 'Fantástico',
  bairro: 'Innovative Macedônia',
  localidade: 'dynamic Shilling',
  uf: 'Salsicha methodical Rodovia',
  unidade: 'Checking Data',
  ibge: 'HomeXXXXXX',
  gia: 'index scale Automate',
  latitude: 36446,
  longitude: 90813,
};

export const sampleWithPartialData: IEndereco = {
  id: 10725,
  cep: 'e-markets',
  logradouro: 'JBOD XML SMTP',
  complemento1: 'Buckinghamshire multi-byte',
  complemento2: 'Luvas Alagoas',
  numero: 'Borders ma',
  bairro: 'Madeira Borders',
  localidade: 'Borders Response',
  uf: 'e-services navigate',
  unidade: 'Pizza',
  ibge: 'amarelo revolutionar',
  gia: 'scalable matrix',
  latitude: 24379,
  longitude: 91084,
};

export const sampleWithFullData: IEndereco = {
  id: 47885,
  cep: 'Borders Di',
  logradouro: 'Pequeno',
  complemento1: 'withdrawal technologies Technician',
  complemento2: 'Borders Credit',
  numero: 'Bola Team-',
  bairro: 'bluetooth disintermediate state',
  localidade: 'Gostoso',
  uf: 'Accounts Fantástico e-business',
  unidade: 'Computadores Decentr',
  ibge: 'orchestrate bluetoot',
  gia: 'schemas web-readines',
  latitude: 16756,
  longitude: 12190,
};

export const sampleWithNewData: NewEndereco = {
  cep: 'communitie',
  logradouro: 'vortals Berkshire',
  complemento1: 'web-enabled protocol',
  complemento2: 'connecting',
  numero: 'Zambian in',
  bairro: 'Roupas',
  localidade: 'calculate invoice Principal',
  uf: 'overriding',
  unidade: 'Jóias Macio Congelad',
  ibge: 'ADP Plástico Ergonôm',
  gia: 'Metal Refinado',
  latitude: 73540,
  longitude: 63440,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
