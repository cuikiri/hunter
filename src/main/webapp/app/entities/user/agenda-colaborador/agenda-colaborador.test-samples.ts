import { IAgendaColaborador } from './agenda-colaborador.model';

export const sampleWithRequiredData: IAgendaColaborador = {
  id: 69901,
  nome: 'Rondônia magnetic Human',
};

export const sampleWithPartialData: IAgendaColaborador = {
  id: 22057,
  nome: 'Mercearia Internal',
  obs: 'synthesizing',
};

export const sampleWithFullData: IAgendaColaborador = {
  id: 33326,
  nome: 'Jamaica e-markets Principal',
  obs: 'District Borracha',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
