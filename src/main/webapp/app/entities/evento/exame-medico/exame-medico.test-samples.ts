import dayjs from 'dayjs/esm';

import { IExameMedico, NewExameMedico } from './exame-medico.model';

export const sampleWithRequiredData: IExameMedico = {
  id: 69324,
  data: dayjs('2022-09-15'),
};

export const sampleWithPartialData: IExameMedico = {
  id: 40900,
  data: dayjs('2022-09-15'),
  obs: 'rosa Alameda verde-azulado',
};

export const sampleWithFullData: IExameMedico = {
  id: 250,
  data: dayjs('2022-09-15'),
  nomeMedico: 'program verde-azulado',
  crmMedico: 'JSON',
  resumo: 'input back-end sensor',
  obs: 'deposit',
};

export const sampleWithNewData: NewExameMedico = {
  data: dayjs('2022-09-15'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
