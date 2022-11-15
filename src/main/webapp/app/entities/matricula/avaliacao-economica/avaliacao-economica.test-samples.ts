import { SimNao } from 'app/entities/enumerations/sim-nao.model';
import { Escola } from 'app/entities/enumerations/escola.model';
import { Moradia } from 'app/entities/enumerations/moradia.model';
import { Pais } from 'app/entities/enumerations/pais.model';
import { SituacaoMoradia } from 'app/entities/enumerations/situacao-moradia.model';
import { TipoMoradia } from 'app/entities/enumerations/tipo-moradia.model';
import { FamiliaExiste } from 'app/entities/enumerations/familia-existe.model';
import { AssitenciaMedica } from 'app/entities/enumerations/assitencia-medica.model';

import { IAvaliacaoEconomica } from './avaliacao-economica.model';

export const sampleWithRequiredData: IAvaliacaoEconomica = {
  id: 77987,
  trabalhoOuEstagio: SimNao['NAO'],
  contribuiRendaFamiliar: SimNao['SIM'],
  apoioFinanceiroFamiliar: SimNao['NAO'],
  estudaAtualmente: SimNao['SIM'],
  estudouAnteriormente: SimNao['SIM'],
  concluiAnoEscolarAnterior: SimNao['SIM'],
  moraCom: Moradia['AMIGOS'],
  pais: Pais['PAI_FALECIDOS'],
  situacaoMoradia: SituacaoMoradia['PROPRIO'],
  tipoMoradia: TipoMoradia['CASA'],
  recebeBeneficioGoverno: SimNao['SIM'],
  familiaExiste: FamiliaExiste['ABANDONO'],
  assitenciaMedica: AssitenciaMedica['PUBLICA'],
  temAlergia: SimNao['SIM'],
  temProblemaSaude: SimNao['SIM'],
  tomaMedicamento: SimNao['NAO'],
  teveFratura: SimNao['NAO'],
  teveCirurgia: SimNao['NAO'],
  temDeficiencia: SimNao['NAO'],
  temAcompanhamentoMedico: SimNao['NAO'],
};

export const sampleWithPartialData: IAvaliacaoEconomica = {
  id: 47024,
  trabalhoOuEstagio: SimNao['SIM'],
  vinculoEmpregaticio: SimNao['NAO'],
  contribuiRendaFamiliar: SimNao['NAO'],
  apoioFinanceiroFamiliar: SimNao['NAO'],
  estudaAtualmente: SimNao['SIM'],
  escolaAtual: Escola['PUBLICA'],
  estudouAnteriormente: SimNao['SIM'],
  escolaAnterior: Escola['PARTICULAR'],
  concluiAnoEscolarAnterior: SimNao['NAO'],
  repetente: SimNao['NAO'],
  dificuldadeAprendizado: SimNao['SIM'],
  dificuldadeDisciplina: 'Borracha Berkshire',
  moraCom: Moradia['MAE'],
  pais: Pais['PAI_FALECIDOS'],
  situacaoMoradia: SituacaoMoradia['CEDIDO'],
  tipoMoradia: TipoMoradia['OUTROS'],
  recebeBeneficioGoverno: SimNao['SIM'],
  familiaExiste: FamiliaExiste['DEFICIENCIA'],
  assitenciaMedica: AssitenciaMedica['PUBLICA'],
  temAlergia: SimNao['NAO'],
  temProblemaSaude: SimNao['SIM'],
  tomaMedicamento: SimNao['NAO'],
  teveFratura: SimNao['SIM'],
  teveCirurgia: SimNao['SIM'],
  temDeficiencia: SimNao['NAO'],
  temAcompanhamentoMedico: SimNao['NAO'],
};

export const sampleWithFullData: IAvaliacaoEconomica = {
  id: 32097,
  trabalhoOuEstagio: SimNao['NAO'],
  vinculoEmpregaticio: SimNao['SIM'],
  cargoFuncao: 'salmão invoice',
  contribuiRendaFamiliar: SimNao['SIM'],
  apoioFinanceiroFamiliar: SimNao['NAO'],
  estudaAtualmente: SimNao['SIM'],
  escolaAtual: Escola['PUBLICA'],
  estudouAnteriormente: SimNao['NAO'],
  escolaAnterior: Escola['PUBLICA'],
  concluiAnoEscolarAnterior: SimNao['NAO'],
  repetente: SimNao['SIM'],
  dificuldadeAprendizado: SimNao['SIM'],
  dificuldadeDisciplina: 'Self-enabling',
  moraCom: Moradia['OUTROS'],
  pais: Pais['OUTROS'],
  situacaoMoradia: SituacaoMoradia['FINANCIADO'],
  tipoMoradia: TipoMoradia['CASA'],
  recebeBeneficioGoverno: SimNao['SIM'],
  tipoBeneficio: 'payment haptic',
  familiaExiste: FamiliaExiste['DOENCA'],
  assitenciaMedica: AssitenciaMedica['PRIVADA'],
  temAlergia: SimNao['NAO'],
  temProblemaSaude: SimNao['NAO'],
  tomaMedicamento: SimNao['NAO'],
  teveFratura: SimNao['SIM'],
  teveCirurgia: SimNao['NAO'],
  temDeficiencia: SimNao['SIM'],
  temAcompanhamentoMedico: SimNao['NAO'],
};

Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
