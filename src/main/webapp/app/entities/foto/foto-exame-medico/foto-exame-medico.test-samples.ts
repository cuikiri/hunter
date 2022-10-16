import { IFotoExameMedico, NewFotoExameMedico } from './foto-exame-medico.model';

export const sampleWithRequiredData: IFotoExameMedico = {
  id: 652,
  foto: '../fake-data/blob/hipster.png',
  fotoContentType: 'unknown',
};

export const sampleWithPartialData: IFotoExameMedico = {
  id: 79903,
  foto: '../fake-data/blob/hipster.png',
  fotoContentType: 'unknown',
};

export const sampleWithFullData: IFotoExameMedico = {
  id: 48396,
  foto: '../fake-data/blob/hipster.png',
  fotoContentType: 'unknown',
};

export const sampleWithNewData: NewFotoExameMedico = {
  foto: '../fake-data/blob/hipster.png',
  fotoContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
