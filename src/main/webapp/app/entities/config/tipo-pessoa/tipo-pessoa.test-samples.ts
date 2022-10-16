import { ITipoPessoa, NewTipoPessoa } from './tipo-pessoa.model';

export const sampleWithRequiredData: ITipoPessoa = {
  id: 41059,
  codigo: 'withdrawal quantifyi',
  nome: 'açafrão pixel',
};

export const sampleWithPartialData: ITipoPessoa = {
  id: 94588,
  codigo: 'Infrastructure Resea',
  nome: 'leverage withdrawal Switchable',
  descricao: 'relationships Implementation Travessa',
};

export const sampleWithFullData: ITipoPessoa = {
  id: 32363,
  codigo: 'Luvas Response Card',
  nome: 'Birr Paraná',
  descricao: 'Licenciado Creative',
};

export const sampleWithNewData: NewTipoPessoa = {
  codigo: 'Pequeno',
  nome: 'Internal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
