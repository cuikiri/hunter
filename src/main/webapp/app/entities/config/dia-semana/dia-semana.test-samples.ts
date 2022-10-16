import { IDiaSemana, NewDiaSemana } from './dia-semana.model';

export const sampleWithRequiredData: IDiaSemana = {
  id: 95543,
  nome: 'HTTP',
};

export const sampleWithPartialData: IDiaSemana = {
  id: 91775,
  nome: 'Guernesey Congelado',
  obs: 'invoice',
};

export const sampleWithFullData: IDiaSemana = {
  id: 15814,
  nome: 'Rua system Borracha',
  obs: 'secondary technologies Mouse',
};

export const sampleWithNewData: NewDiaSemana = {
  nome: 'generating Kuwaiti',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
