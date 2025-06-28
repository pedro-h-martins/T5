import { 
  Cliente, 
  Pet, 
  Produto, 
  Servico, 
  TopClient, 
  TopItem, 
  ConsumoResponse 
} from './types';

const API_BASE_URL = 'http://localhost:3001/api';

const clienteAPI = {
  getAllClientes: async (): Promise<Cliente[]> => {
    const response = await fetch(`${API_BASE_URL}/clientes`);
    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }
    return response.json();
  },

  getClienteByCpf: async (cpf: string): Promise<Cliente> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar cliente');
    }
    return response.json();
  },

  createCliente: async (cliente: Partial<Cliente>): Promise<{ message: string; cliente: Cliente }> => {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });
    
    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar cliente');
      } catch (e) {
        if (response.status === 409) {
          throw new Error('Cliente com este CPF já existe');
        }
        throw new Error(`Erro ao cadastrar cliente (${response.status})`);
      }
    }
    return response.json();
  },

  updateCliente: async (cpf: string, cliente: Partial<Cliente>): Promise<{ message: string; cliente: Cliente }> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar cliente');
    }
    return response.json();
  },

  deleteCliente: async (cpf: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir cliente');
    }
    return response.json();
  },

  getClientePets: async (cpf: string): Promise<Pet[]> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}/pets`);
    if (!response.ok) {
      throw new Error('Erro ao buscar pets do cliente');
    }
    return response.json();
  },

  addPetToCliente: async (cpf: string, pet: Partial<Pet>): Promise<{ message: string; pet: Pet }> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pet),
    });
    if (!response.ok) {
      throw new Error('Erro ao adicionar pet ao cliente');
    }
    return response.json();
  },

  getClienteProdutos: async (cpf: string): Promise<Produto[]> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}/produtos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos do cliente');
    }
    return response.json();
  },

  addProdutoToCliente: async (cpf: string, produtoId: string): Promise<ConsumoResponse> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}/produtos/${produtoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao adicionar produto ao cliente');
    }
    return response.json();
  },

  getClienteServicos: async (cpf: string): Promise<Servico[]> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}/servicos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar serviços do cliente');
    }
    return response.json();
  },

  addServicoToCliente: async (cpf: string, servicoId: string): Promise<ConsumoResponse> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}/servicos/${servicoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao adicionar serviço ao cliente');
    }
    return response.json();
  },

  addTelefoneToCliente: async (cpf: string, telefone: { ddd: string, numero: string } | null): Promise<{ message: string; telefone: { ddd: string, numero: string } }> => {
    if (!telefone) {
      throw new Error('Telefone inválido');
    }
    
    const response = await fetch(`${API_BASE_URL}/clientes/${cpf}/telefones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telefone),
    });
    if (!response.ok) {
      throw new Error('Erro ao adicionar telefone ao cliente');
    }
    return response.json();
  },
};

const petAPI = {
  getAllPets: async (): Promise<Pet[]> => {
    const response = await fetch(`${API_BASE_URL}/pets`);
    if (!response.ok) {
      throw new Error('Erro ao buscar pets');
    }
    return response.json();
  },

  getPetById: async (id: string): Promise<Pet> => {
    const response = await fetch(`${API_BASE_URL}/pets/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar pet');
    }
    return response.json();
  },

  updatePet: async (id: string, pet: Partial<Pet>): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pet),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar pet');
    }
    return response.json();
  },

  deletePet: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir pet');
    }
    return response.json();
  },
};

const produtoAPI = {
  getAllProdutos: async (): Promise<Produto[]> => {
    const response = await fetch(`${API_BASE_URL}/produtos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    return response.json();
  },

  getProdutoById: async (id: string): Promise<Produto> => {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produto');
    }
    return response.json();
  },

  createProduto: async (produto: Partial<Produto>): Promise<{ message: string; produto: Produto }> => {
    const response = await fetch(`${API_BASE_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
    if (!response.ok) {
      throw new Error('Erro ao cadastrar produto');
    }
    return response.json();
  },

  updateProduto: async (id: string, produto: Partial<Produto>): Promise<{ message: string; produto: Produto }> => {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }
    return response.json();
  },

  deleteProduto: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir produto');
    }
    return response.json();
  },
};

const servicoAPI = {
  getAllServicos: async (): Promise<Servico[]> => {
    const response = await fetch(`${API_BASE_URL}/servicos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar serviços');
    }
    return response.json();
  },

  getServicoById: async (id: string): Promise<Servico> => {
    const response = await fetch(`${API_BASE_URL}/servicos/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar serviço');
    }
    return response.json();
  },

  createServico: async (servico: Partial<Servico>): Promise<{ message: string; servico: Servico }> => {
    const response = await fetch(`${API_BASE_URL}/servicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico),
    });
    if (!response.ok) {
      throw new Error('Erro ao cadastrar serviço');
    }
    return response.json();
  },

  updateServico: async (id: string, servico: Partial<Servico>): Promise<{ message: string; servico: Servico }> => {
    const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar serviço');
    }
    return response.json();
  },

  deleteServico: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir serviço');
    }
    return response.json();
  },
};

const relatoriosAPI = {
  getTopClientesProdutos: async (): Promise<TopClient[]> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/top-clientes-produtos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar top clientes por produtos');
    }
    return response.json();
  },

  getTopClientesServicos: async (): Promise<TopClient[]> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/top-clientes-servicos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar top clientes por serviços');
    }
    return response.json();
  },

  getTopProdutos: async (): Promise<TopItem[]> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/top-produtos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos mais consumidos');
    }
    return response.json();
  },

  getTopServicos: async (): Promise<TopItem[]> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/top-servicos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar serviços mais consumidos');
    }
    return response.json();
  },

  getTopClientesValor: async (): Promise<TopClient[]> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/top5-clientes-valor`);
    if (!response.ok) {
      throw new Error('Erro ao buscar top 5 clientes por valor');
    }
    return response.json();
  },

  getProdutosMaisConsumidosPorTipoPet: async (): Promise<{tipo: string, raca: string, produto: string}[]> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/produtos-por-pet`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos mais consumidos por tipo de pet');
    }
    return response.json();
  },
  
  getServicosMaisConsumidosPorTipoPet: async (): Promise<{tipo: string, raca: string, servico: string}[]> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/servicos-por-pet`);
    if (!response.ok) {
      throw new Error('Erro ao buscar serviços mais consumidos por tipo de pet');
    }
    return response.json();
  },
  
  getConsumoPorCliente: async (cpf: string): Promise<{
    produtos: {nome: string, valor: number, quantidade: number, pet?: string}[],
    servicos: {nome: string, preco: number, quantidade: number, pet?: string}[],
    valorTotal: number
  }> => {
    const response = await fetch(`${API_BASE_URL}/relatorios/consumo-cliente/${cpf}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar consumo do cliente');
    }
    return response.json();
  }
};

const api = {
  cliente: clienteAPI,
  pet: petAPI,
  produto: produtoAPI,
  servico: servicoAPI,
  relatorios: relatoriosAPI,
};

export default api;
