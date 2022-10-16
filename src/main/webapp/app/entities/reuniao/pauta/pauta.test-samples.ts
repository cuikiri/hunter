import { IPauta, NewPauta } from './pauta.model';

export const sampleWithRequiredData: IPauta = {
  id: 26367,
  nome: 'deliverables',
};

export const sampleWithPartialData: IPauta = {
  id: 6998,
  nome: 'Assistant overriding Alameda',
};

export const sampleWithFullData: IPauta = {
  id: 92089,
  nome: 'digital deposit methodology',
  obs: 'Pequeno',
};

export const sampleWithNewData: NewPauta = {
  nome: 'Bedfordshire Mercearia',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
