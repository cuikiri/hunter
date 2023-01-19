import dayjs from 'dayjs/esm';
import { ITurma } from 'app/entities/matricula/turma/turma.model';
import { IDadosPessoais } from 'app/entities/user/dados-pessoais/dados-pessoais.model';

export interface IMatricula {
  id?: number;
  data?: dayjs.Dayjs;
  responsavel?: string | null;
  rg?: string | null;
  cpf?: string | null;
  obs?: string | null;
  turma?: ITurma | null;
  dadosPessoais?: IDadosPessoais | null;
}

export class Matricula implements IMatricula {
  constructor(
    public id?: number,
    public data?: dayjs.Dayjs,
    public responsavel?: string | null,
    public rg?: string | null,
    public cpf?: string | null,
    public obs?: string | null,
    public turma?: ITurma | null,
    public dadosPessoais?: IDadosPessoais | null
  ) {}
}

export function getMatriculaIdentifier(matricula: IMatricula): number | undefined {
  return matricula.id;
}
