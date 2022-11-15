import { IReceberDe } from './receber-de.model';

export const sampleWithRequiredData: IReceberDe = {
  id: 2201,
  nome: 'viral streamline',
};

export const sampleWithPartialData: IReceberDe = {
  id: 60531,
  nome: 'Industrial expedite',
  descricao: 'to',
  cnpj: true,
};

export const sampleWithFullData: IReceberDe = {
  id: 18527,
  nome: 'maximize Team-oriented Guarani',
  descricao: 'Livros',
  cnpj: true,
  documento: 'Incrível bus',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
