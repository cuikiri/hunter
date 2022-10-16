import { Ensino } from 'app/entities/enumerations/ensino.model';

import { IAcompanhamentoAluno, NewAcompanhamentoAluno } from './acompanhamento-aluno.model';

export const sampleWithRequiredData: IAcompanhamentoAluno = {
  id: 66735,
  ano: 57759,
  ensino: Ensino['FUNDAMENTAL1'],
  bimestre: 90986,
};

export const sampleWithPartialData: IAcompanhamentoAluno = {
  id: 65787,
  ano: 20827,
  ensino: Ensino['FUNDAMENTAL1'],
  bimestre: 69584,
};

export const sampleWithFullData: IAcompanhamentoAluno = {
  id: 39344,
  ano: 90920,
  ensino: Ensino['FUNDAMENTAL2'],
  bimestre: 86210,
};

export const sampleWithNewData: NewAcompanhamentoAluno = {
  ano: 91007,
  ensino: Ensino['MEDIO'],
  bimestre: 72023,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
