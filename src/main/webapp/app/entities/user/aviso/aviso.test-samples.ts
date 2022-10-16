import dayjs from 'dayjs/esm';

import { IAviso, NewAviso } from './aviso.model';

export const sampleWithRequiredData: IAviso = {
  id: 36374,
  data: dayjs('2022-06-22'),
  titulo: 'architect Programmable Market',
  conteudo: 'Música Chapéu programming',
};

export const sampleWithPartialData: IAviso = {
  id: 8203,
  data: dayjs('2022-06-22'),
  titulo: 'next-generation Venezuela Brinquedos',
  conteudo: 'Borders',
};

export const sampleWithFullData: IAviso = {
  id: 66122,
  data: dayjs('2022-06-22'),
  titulo: 'esmeralda Buckinghamshire',
  conteudo: 'Architect FTP',
};

export const sampleWithNewData: NewAviso = {
  data: dayjs('2022-06-22'),
  titulo: 'Incrível Monitored digital',
  conteudo: 'bronze neural Avon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
