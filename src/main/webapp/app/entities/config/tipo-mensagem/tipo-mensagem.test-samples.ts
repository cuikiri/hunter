import { ITipoMensagem, NewTipoMensagem } from './tipo-mensagem.model';

export const sampleWithRequiredData: ITipoMensagem = {
  id: 66677,
  codigo: 'Mesa',
  nome: 'Dominican Berkshire Quality',
};

export const sampleWithPartialData: ITipoMensagem = {
  id: 78575,
  codigo: 'maximized haptic',
  nome: 'invoice',
};

export const sampleWithFullData: ITipoMensagem = {
  id: 66082,
  codigo: 'Account Orchestrator',
  nome: 'systematic Market Brand',
  descricao: 'lilás Forward Metal',
};

export const sampleWithNewData: NewTipoMensagem = {
  codigo: 'Refinado Bedfordshir',
  nome: 'Avenida',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
