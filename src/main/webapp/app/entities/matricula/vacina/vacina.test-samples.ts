import { IVacina } from './vacina.model';

export const sampleWithRequiredData: IVacina = {
  id: 15796,
  nome: 'Technician',
};

export const sampleWithPartialData: IVacina = {
  id: 97900,
  nome: 'SDR',
  idade: 'Calça',
};

export const sampleWithFullData: IVacina = {
  id: 75661,
  nome: 'Minas Bola',
  idade: 'invoi',
  obs: 'up Janeiro Money',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
