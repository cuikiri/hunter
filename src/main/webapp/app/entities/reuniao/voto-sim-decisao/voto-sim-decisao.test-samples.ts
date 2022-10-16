import { IVotoSimDecisao, NewVotoSimDecisao } from './voto-sim-decisao.model';

export const sampleWithRequiredData: IVotoSimDecisao = {
  id: 78196,
  nome: 'Avon',
};

export const sampleWithPartialData: IVotoSimDecisao = {
  id: 35078,
  nome: 'Dynamic',
};

export const sampleWithFullData: IVotoSimDecisao = {
  id: 65410,
  nome: 'hardware Alameda',
  obs: 'Luvas Bicicleta cultivate',
};

export const sampleWithNewData: NewVotoSimDecisao = {
  nome: 'Plástico',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
