export interface Cliente {
  nome: string;
  nomeSocial: string;
  cpf: string;
  dataCadastro?: Date;
  pets?: Pet[];
  telefones?: Telefone[];
  produtosConsumidos?: Produto[];
  servicosConsumidos?: Servico[];
}

export interface Pet {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  clienteNome?: string;
  clienteCpf?: string;
}

export interface Produto {
  id?: string;
  nome: string;
  valor: number;
}

export interface Servico {
  id?: string;
  nome: string;
  preco: number;
}

export interface Telefone {
  ddd: string;
  numero: string;
}

export interface RG {
  valor: string;
  dataEmissao: Date;
}

export interface CPF {
  valor: string;
  dataEmissao: Date;
}

export interface TopClient {
  nome: string;
  nomeSocial: string;
  cpf: string;
  total: number;
  quantidade: number;
}

export interface TopItem {
  nome: string;
  quantidade: number;
}

export interface ConsumoResponse {
  message: string;
  produto?: Produto;
  servico?: Servico;
  pet?: Pet;
}
