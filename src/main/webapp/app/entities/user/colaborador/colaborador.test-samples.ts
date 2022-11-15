import dayjs from 'dayjs/esm';

import { IColaborador } from './colaborador.model';

export const sampleWithRequiredData: IColaborador = {
  id: 56141,
  dataCadastro: dayjs('2022-09-15'),
};

export const sampleWithPartialData: IColaborador = {
  id: 89547,
  dataCadastro: dayjs('2022-09-15'),
  dataRecisao: dayjs('2022-09-15'),
  salario: 82531,
  obs: 'incentivize Brand',
};

export const sampleWithFullData: IColaborador = {
  id: 60720,
  dataCadastro: dayjs('2022-09-15'),
  dataAdmissao: dayjs('2022-09-15'),
  dataRecisao: dayjs('2022-09-15'),
  salario: 62678,
  ativo: true,
  obs: 'PNG portal',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
