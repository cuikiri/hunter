import dayjs from 'dayjs/esm';

import { IMatricula } from './matricula.model';

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

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
