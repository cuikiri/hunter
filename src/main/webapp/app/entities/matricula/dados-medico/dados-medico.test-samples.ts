import dayjs from 'dayjs/esm';

import { Pressao } from 'app/entities/enumerations/pressao.model';
import { Coracao } from 'app/entities/enumerations/coracao.model';

import { IDadosMedico, NewDadosMedico } from './dados-medico.model';

export const sampleWithRequiredData: IDadosMedico = {
  id: 44539,
  data: dayjs('2022-09-15'),
  peso: 4983,
  altura: 417,
  pressao: Pressao['BAIXA'],
  coracao: Coracao['INSUFICIENCIA'],
};

export const sampleWithPartialData: IDadosMedico = {
  id: 63144,
  data: dayjs('2022-09-15'),
  peso: 23023,
  altura: 28194,
  pressao: Pressao['NORMAL'],
  coracao: Coracao['ENDOCARDITE'],
};

export const sampleWithFullData: IDadosMedico = {
  id: 1238,
  data: dayjs('2022-09-15'),
  peso: 22868,
  altura: 98348,
  pressao: Pressao['NORMAL'],
  coracao: Coracao['ARTERIOSCLEROSE'],
  medicacao: 'Specialist IB',
  obs: 'HDD',
};

export const sampleWithNewData: NewDadosMedico = {
  data: dayjs('2022-09-15'),
  peso: 1309,
  altura: 40367,
  pressao: Pressao['ALTA'],
  coracao: Coracao['CARDIOMIOPATIA'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
