import { IAlergia } from './alergia.model';

export const sampleWithRequiredData: IAlergia = {
  id: 37545,
  nome: 'Chief petróleo calculating',
};

export const sampleWithPartialData: IAlergia = {
  id: 69318,
  nome: 'stable',
  precaucoes: 'navigate Eletrônicos',
  obs: 'Engineer',
};

export const sampleWithFullData: IAlergia = {
  id: 41976,
  nome: 'Metrics',
  sintoma: 'amarelo Account quantifying',
  precaucoes: 'Maranhão Avon Equatorial',
  socorro: 'info-mediaries withdrawal Branding',
  obs: 'Samoa Equador cross-platform',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
