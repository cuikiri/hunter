import { ITurma, NewTurma } from './turma.model';

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

export const sampleWithNewData: NewTurma = {
  nome: 'efficient',
  ano: 12913,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
