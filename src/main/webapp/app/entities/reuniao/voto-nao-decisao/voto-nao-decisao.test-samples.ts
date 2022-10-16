import { IVotoNaoDecisao, NewVotoNaoDecisao } from './voto-nao-decisao.model';

export const sampleWithRequiredData: IVotoNaoDecisao = {
  id: 69922,
  nome: 'Ergonômico neural',
};

export const sampleWithPartialData: IVotoNaoDecisao = {
  id: 66350,
  nome: 'alarm Crianças bus',
};

export const sampleWithFullData: IVotoNaoDecisao = {
  id: 51685,
  nome: 'Rua productivity Avenida',
  obs: 'payment Buckinghamshire',
};

export const sampleWithNewData: NewVotoNaoDecisao = {
  nome: 'payment Account Eletrônicos',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
