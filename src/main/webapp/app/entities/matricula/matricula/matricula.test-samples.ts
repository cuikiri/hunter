import dayjs from 'dayjs/esm';

import { IMatricula, NewMatricula } from './matricula.model';

export const sampleWithRequiredData: IMatricula = {
  id: 55032,
  data: dayjs('2022-09-15'),
};

export const sampleWithPartialData: IMatricula = {
  id: 54230,
  data: dayjs('2022-09-15'),
  obs: 'Cadeira',
};

export const sampleWithFullData: IMatricula = {
  id: 38973,
  data: dayjs('2022-09-15'),
  obs: 'Bahia Buckinghamshire',
};

export const sampleWithNewData: NewMatricula = {
  data: dayjs('2022-09-15'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
