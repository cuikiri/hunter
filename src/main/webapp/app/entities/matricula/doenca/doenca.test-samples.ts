import { IDoenca } from './doenca.model';

export const sampleWithRequiredData: IDoenca = {
  id: 69431,
  nome: 'marca Credit Cambridgeshire',
};

export const sampleWithPartialData: IDoenca = {
  id: 10511,
  nome: 'Communications Lustroso',
  sintoma: 'Rua',
  obs: 'Algodão Agent África',
};

export const sampleWithFullData: IDoenca = {
  id: 1089,
  nome: 'Aço reboot multi-byte',
  sintoma: 'web-enabled Avon implement',
  precaucoes: 'Account Amapá',
  socorro: 'Analyst CSS Borracha',
  obs: 'AI',
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
