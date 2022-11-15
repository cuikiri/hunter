import { IItemMateria } from './item-materia.model';

export const sampleWithRequiredData: IItemMateria = {
  id: 22754,
  nota: 'Goiás',
};

export const sampleWithPartialData: IItemMateria = {
  id: 62262,
  nota: 'Customer-focused cli',
  obs: 'XML deposit productivity',
};

export const sampleWithFullData: IItemMateria = {
  id: 4915,
  nota: 'Public-key',
  obs: 'connect',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
