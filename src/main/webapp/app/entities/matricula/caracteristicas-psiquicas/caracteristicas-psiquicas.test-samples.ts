import { ICaracteristicasPsiquicas } from './caracteristicas-psiquicas.model';

export const sampleWithRequiredData: ICaracteristicasPsiquicas = {
  id: 66133,
  nome: 'Peso Gostoso Configuration',
};

export const sampleWithPartialData: ICaracteristicasPsiquicas = {
  id: 71706,
  nome: 'marca grená Inteligente',
};

export const sampleWithFullData: ICaracteristicasPsiquicas = {
  id: 52148,
  nome: 'Solutions Mobility',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
