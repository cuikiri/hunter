import { IDadosPessoais } from 'app/entities/user/dados-pessoais/dados-pessoais.model';

export interface IEndereco {
  id?: number;
  cep?: string;
  logradouro?: string;
  complemento1?: string;
  numero?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  unidade?: string;
  dadosPessoais?: IDadosPessoais | null;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public cep?: string,
    public logradouro?: string,
    public complemento1?: string,
    public numero?: string,
    public bairro?: string,
    public localidade?: string,
    public uf?: string,
    public unidade?: string,
    public dadosPessoais?: IDadosPessoais | null
  ) {}
}

export function getEnderecoIdentifier(endereco: IEndereco): number | undefined {
  return endereco.id;
}
