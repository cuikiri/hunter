import dayjs from 'dayjs/esm';

import { IMensagem, NewMensagem } from './mensagem.model';

export const sampleWithRequiredData: IMensagem = {
  id: 46374,
  data: dayjs('2022-06-23'),
  titulo: 'Taka',
  conteudo: 'Industrial',
};

export const sampleWithPartialData: IMensagem = {
  id: 39153,
  data: dayjs('2022-06-22'),
  titulo: 'Rua haptic',
  conteudo: 'Cadeira Operative',
};

export const sampleWithFullData: IMensagem = {
  id: 81497,
  data: dayjs('2022-06-23'),
  titulo: 'transmit Organized',
  conteudo: 'Realigned',
};

export const sampleWithNewData: NewMensagem = {
  data: dayjs('2022-06-23'),
  titulo: 'Salada',
  conteudo: 'Object-based',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
