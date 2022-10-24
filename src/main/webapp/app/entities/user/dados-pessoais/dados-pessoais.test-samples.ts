import { IDadosPessoais, NewDadosPessoais } from './dados-pessoais.model';

export const sampleWithRequiredData: IDadosPessoais = {
  id: 91359,
  nome: 'hacking overriding l',
  sobreNome: 'connect Guiné Buckinghamshire',
  mae: 'Developer',
  celular: 'Calças Mobility Cuba',
};

export const sampleWithPartialData: IDadosPessoais = {
  id: 51456,
  nome: 'turn-key Paraná',
  sobreNome: 'systematic',
  mae: 'port Regional',
  telefone: 'Synergistic transmit',
  celular: 'Rua functionalities',
  whatsapp: 'Grécia Goiás Maranhã',
};

export const sampleWithFullData: IDadosPessoais = {
  id: 15373,
  nome: 'Colombian Personal B',
  sobreNome: 'reciprocal',
  pai: 'implement HDD Madeira',
  mae: 'Card Costa',
  telefone: 'approach',
  celular: 'input Alameda',
  whatsapp: 'Congelado capacitor',
};

export const sampleWithNewData: NewDadosPessoais = {
  nome: 'enhance Travessa Ave',
  sobreNome: 'pele Amazonas Future',
  mae: 'protocol âmbar artificial',
  celular: 'Configuration',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
