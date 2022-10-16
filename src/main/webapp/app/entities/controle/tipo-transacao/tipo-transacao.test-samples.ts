import { ITipoTransacao, NewTipoTransacao } from './tipo-transacao.model';

export const sampleWithRequiredData: ITipoTransacao = {
  id: 40033,
  nome: 'leverage Rondônia Tr',
};

export const sampleWithPartialData: ITipoTransacao = {
  id: 63564,
  nome: 'Legacy mindshare mar',
};

export const sampleWithFullData: ITipoTransacao = {
  id: 91113,
  nome: 'Peixe',
};

export const sampleWithNewData: NewTipoTransacao = {
  nome: 'Somoni paradigms fúc',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
