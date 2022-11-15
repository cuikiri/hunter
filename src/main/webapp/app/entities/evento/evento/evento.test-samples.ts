import { IEvento } from './evento.model';

export const sampleWithRequiredData: IEvento = {
  id: 92648,
  nome: 'human-resource Rua',
};

export const sampleWithPartialData: IEvento = {
  id: 47689,
  nome: 'Atum Configuration',
  descricao: 'Buckinghamshire synthesizing sticky',
  obs: 'Plástico Central Queijo',
};

export const sampleWithFullData: IEvento = {
  id: 41107,
  nome: 'Groelândia tertiary',
  descricao: 'Buckinghamshire SAS',
  ativo: false,
  obs: 'Manager seize Jogos',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
