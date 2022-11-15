import { ITipoPagar } from './tipo-pagar.model';

export const sampleWithRequiredData: ITipoPagar = {
  id: 59682,
  nome: 'Música streamline Ky',
};

export const sampleWithPartialData: ITipoPagar = {
  id: 60575,
  nome: 'Optimization',
};

export const sampleWithFullData: ITipoPagar = {
  id: 62008,
  nome: 'bypass transmit',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
