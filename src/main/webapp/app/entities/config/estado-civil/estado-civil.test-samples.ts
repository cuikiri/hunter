import { IEstadoCivil } from './estado-civil.model';

export const sampleWithRequiredData: IEstadoCivil = {
  id: 18935,
  codigo: 'turquesa Toalhas',
  descricao: 'coherent',
};

export const sampleWithPartialData: IEstadoCivil = {
  id: 80631,
  codigo: 'Supervisor Solutions',
  descricao: 'Sem Pizza',
};

export const sampleWithFullData: IEstadoCivil = {
  id: 91472,
  codigo: 'New actuating',
  descricao: 'Agent experiences',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
