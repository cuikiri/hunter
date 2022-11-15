import { ITurma } from './turma.model';

export const sampleWithRequiredData: ITurma = {
  id: 7606,
  nome: 'Representative',
  ano: 94087,
};

export const sampleWithPartialData: ITurma = {
  id: 90490,
  nome: 'robust District',
  ano: 31064,
};

export const sampleWithFullData: ITurma = {
  id: 75911,
  nome: 'Prático',
  ano: 74149,
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
