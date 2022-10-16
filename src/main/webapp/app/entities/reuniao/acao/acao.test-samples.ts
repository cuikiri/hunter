import { IAcao, NewAcao } from './acao.model';

export const sampleWithRequiredData: IAcao = {
  id: 8725,
  nome: 'Solomon synthesizing',
};

export const sampleWithPartialData: IAcao = {
  id: 72294,
  nome: 'systems forecast',
  obs: 'Piauí magenta International',
};

export const sampleWithFullData: IAcao = {
  id: 32413,
  nome: 'Gostoso convergence',
  obs: 'up Architect payment',
};

export const sampleWithNewData: NewAcao = {
  nome: 'GB Horizontal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
