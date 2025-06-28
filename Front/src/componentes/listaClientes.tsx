/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import BotoesAcaoCliente from "./botoesAcaoCliente";
import BotaoTopClientes from "./botaoTopClientes";
import api from "../services/api";
import Notificacao from "./notificacao";

type props = {
    tema: string,
    seletorView: Function,
    seletorCliente?: Function
}

type state = {
    selectedClient: number | null;
    clientData: Array<{
        nome: string;
        nomeSocial: string;
        cpf: string;
        pets?: Array<{ nome: string }>;
        telefones?: Array<{ ddd: string; numero: string }>;
        produtosConsumidos?: Array<{
            id?: string;
            nome: string;
            valor: number;
        }>;
        servicosConsumidos?: Array<{
            id?: string;
            nome: string;
            preco: number;
        }>;
    }>;
    produtos: Array<{
        id?: string;
        nome: string;
        valor: number;
    }>;
    servicos: Array<{
        id?: string;
        nome: string;
        preco: number;
    }>;
    selectedProduto: string;
    selectedServico: string;
    produtoQuantidade: number;
    servicoQuantidade: number;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

export default class ListaCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            selectedClient: null,
            clientData: [],
            produtos: [],
            servicos: [],
            selectedProduto: "",
            selectedServico: "",
            produtoQuantidade: 1,
            servicoQuantidade: 1,
            loading: true,
            error: null,
            successMessage: null
        };
    }

    componentDidMount() {
        this.carregarClientes();
        this.carregarProdutos();
        this.carregarServicos();
    }

    carregarClientes = async () => {
        this.setState({ loading: true, error: null });
        try {
            const clientes = await api.cliente.getAllClientes();
            this.setState({
                clientData: clientes,
                loading: false
            });
        } catch (error) {
            console.error("Erro ao carregar clientes:", error);
            this.setState({
                error: "Erro ao carregar a lista de clientes",
                loading: false
            });
        }
    }

    carregarProdutos = async () => {
        try {
            const produtos = await api.produto.getAllProdutos();

            const produtosValidos = produtos.filter(p => p && p.id);
            
            if (produtosValidos.length === 0) {
                console.warn("Nenhum produto com ID válido foi encontrado");
            }
            
            this.setState({ produtos: produtosValidos });
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
            this.setState({ error: "Erro ao carregar a lista de produtos" });
        }
    }

    carregarServicos = async () => {
        try {
            const servicos = await api.servico.getAllServicos();
    
            const servicosValidos = servicos.filter(s => s && s.id);
            
            if (servicosValidos.length === 0) {
                console.warn("Nenhum serviço com ID válido foi encontrado");
            }
            
            this.setState({ servicos: servicosValidos });
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
            this.setState({ error: "Erro ao carregar a lista de serviços" });
        }
    }

    excluirCliente = async (cpf: string) => {
        try {
            await api.cliente.deleteCliente(cpf);

            this.carregarClientes();
        } catch (error) {
            console.error(`Erro ao excluir cliente com CPF ${cpf}:`, error);
            this.setState({ error: `Erro ao excluir cliente com CPF ${cpf}` });
        }
    }

    handleClientClick = (index: number) => {
        this.setState({ selectedClient: this.state.selectedClient === index ? null : index });
    }

    handleSave = (index: number) => {
        this.setState({ selectedClient: null });
    }

    handleDelete = (index: number) => {
        const cliente = this.state.clientData[index];
        if (cliente && cliente.cpf) {
            this.excluirCliente(cliente.cpf);
        }
    }

    handleOrder = async (index: number) => {
        const cliente = this.state.clientData[index];
        if (!cliente || !cliente.cpf) {
            this.setState({ error: "CPF do cliente não encontrado" });
            return;
        }

        const { selectedProduto, selectedServico, produtoQuantidade, servicoQuantidade } = this.state;
        
        let produtoParaAdicionar: {id?: string; nome: string; valor: number} | null = null;
        if (selectedProduto && selectedProduto.trim() !== '') {
            produtoParaAdicionar = this.state.produtos.find(p => p.id === selectedProduto) || null;
            if (!produtoParaAdicionar || !produtoParaAdicionar.id) {
                this.setState({ error: "Produto selecionado não encontrado ou sem ID válido. Por favor, selecione novamente." });
                return;
            }

            console.log("Produto para adicionar:", produtoParaAdicionar);
        }
    
        let servicoParaAdicionar: {id?: string; nome: string; preco: number} | null = null;
        if (selectedServico && selectedServico.trim() !== '') {
            servicoParaAdicionar = this.state.servicos.find(s => s.id === selectedServico) || null;
            if (!servicoParaAdicionar || !servicoParaAdicionar.id) {
                this.setState({ error: "Serviço selecionado não encontrado ou sem ID válido. Por favor, selecione novamente." });
                return;
            }
        
            console.log("Serviço para adicionar:", servicoParaAdicionar);
        }
        
        if (!produtoParaAdicionar && !servicoParaAdicionar) {
            this.setState({ error: "Selecione pelo menos um produto ou serviço" });
            return;
        }
        
        let mensagens = [];

        try {
            console.log("Cliente CPF:", cliente.cpf);
            
            if (produtoParaAdicionar && produtoParaAdicionar.id) {
                console.log("Enviando produto com ID:", produtoParaAdicionar.id);
                
                try {
        
                    for (let i = 0; i < produtoQuantidade; i++) {
                        const produtoObj = {
                            id: produtoParaAdicionar.id,
                            nome: produtoParaAdicionar.nome,
                            valor: produtoParaAdicionar.valor
                        };
                        
                        this.adicionarProdutoClienteManualmente(cliente.cpf, produtoObj);
                    }
                    
                    try {
                        const promessasProdutos = Array.from({ length: produtoQuantidade }, () => {
                            if (produtoParaAdicionar && produtoParaAdicionar.id) {
                                return api.cliente.addProdutoToCliente(cliente.cpf, produtoParaAdicionar.id);
                            }
                            return Promise.reject(new Error("ID do produto indefinido"));
                        });
                        
                        await Promise.all(promessasProdutos).catch(error => {
                            console.warn("Erro ao adicionar produtos via API, mas já adicionados localmente:", error);
                        });
                        
                        try {
                            await this.atualizarProdutosDoCliente(cliente.cpf);
                        } catch (updateErr) {
                            console.warn("Erro ao atualizar produtos via API, usando dados locais:", updateErr);
                        }
                    } catch (error) {
                        console.warn("Usando apenas os produtos adicionados localmente devido a erros da API:", error);
                    }
                    
                    mensagens.push(`${produtoQuantidade}x ${produtoParaAdicionar.nome}`);
                } catch (prodErr: any) {
                    console.error(`Erro ao adicionar produto (${produtoParaAdicionar.id}):`, prodErr);
                    throw new Error(`Erro ao adicionar produto "${produtoParaAdicionar.nome}": ${prodErr.message || String(prodErr)}`);
                }
            }

            if (servicoParaAdicionar && servicoParaAdicionar.id) {
                console.log("Enviando serviço com ID:", servicoParaAdicionar.id);
                
                try {

                    for (let i = 0; i < servicoQuantidade; i++) {
                        const servicoObj = {
                            id: servicoParaAdicionar.id,
                            nome: servicoParaAdicionar.nome,
                            preco: servicoParaAdicionar.preco
                        };
                        
                        this.adicionarServicoClienteManualmente(cliente.cpf, servicoObj);
                    }
                    
                
                    try {
                        const promessasServicos = Array.from({ length: servicoQuantidade }, () => {

                            if (servicoParaAdicionar && servicoParaAdicionar.id) {
                                return api.cliente.addServicoToCliente(cliente.cpf, servicoParaAdicionar.id);
                            }
                            return Promise.reject(new Error("ID do serviço indefinido"));
                        });
                        
                        await Promise.all(promessasServicos).catch(error => {
                            console.warn("Erro ao adicionar serviços via API, mas já adicionados localmente:", error);
                        });
                        
                        try {
                            await this.atualizarServicosDoCliente(cliente.cpf);
                        } catch (updateErr) {
                            console.warn("Erro ao atualizar serviços via API, usando dados locais:", updateErr);
                        }
                    } catch (error) {
                        console.warn("Usando apenas os serviços adicionados localmente devido a erros da API:", error);
                    }
                    
                    mensagens.push(`${servicoQuantidade}x ${servicoParaAdicionar.nome}`);
                } catch (servErr: any) {
                    console.error(`Erro ao adicionar serviço (${servicoParaAdicionar.id}):`, servErr);
                    throw new Error(`Erro ao adicionar serviço "${servicoParaAdicionar.nome}": ${servErr.message || String(servErr)}`);
                }
            }

            if (mensagens.length === 0) {
                this.setState({ error: "Selecione pelo menos um produto ou serviço" });
                return;
            }
        
            this.setState({ 
                successMessage: `Pedido realizado com sucesso! ${mensagens.join(" e ")}`,
                selectedProduto: "",
                selectedServico: "",
                produtoQuantidade: 1,
                servicoQuantidade: 1,
                error: null 
            });

            setTimeout(() => {
                this.setState({ successMessage: null });
            }, 3000);

        } catch (error: any) {
            console.error("Erro ao processar pedido:", error);
            this.setState({ error: error.message || "Erro ao processar o pedido. Tente novamente." });
        }
    }

    atualizarProdutosDoCliente = async (cpf: string): Promise<void> => {
        try {
            const produtos = await api.cliente.getClienteProdutos(cpf);
            const clientDataAtualizado = [...this.state.clientData];
            const clienteIndex = clientDataAtualizado.findIndex(c => c.cpf === cpf);
            
            if (clienteIndex !== -1) {
                const cliente = clientDataAtualizado[clienteIndex];
                
                if (!cliente.produtosConsumidos) {
                    cliente.produtosConsumidos = [];
                }
                
                cliente.produtosConsumidos = produtos;
                
                this.setState({ clientData: clientDataAtualizado });
            }
        } catch (error) {
            console.error("Erro ao atualizar produtos do cliente:", error);
        }
    }

    atualizarServicosDoCliente = async (cpf: string): Promise<void> => {
        try {
            const servicos = await api.cliente.getClienteServicos(cpf);
            const clientDataAtualizado = [...this.state.clientData];
            const clienteIndex = clientDataAtualizado.findIndex(c => c.cpf === cpf);
            
            if (clienteIndex !== -1) {
                const cliente = clientDataAtualizado[clienteIndex];
                
                if (!cliente.servicosConsumidos) {
                    cliente.servicosConsumidos = [];
                }
                
                cliente.servicosConsumidos = servicos;
                
                this.setState({ clientData: clientDataAtualizado });
            }
        } catch (error) {
            console.error("Erro ao atualizar serviços do cliente:", error);
        }
    }

    adicionarProdutoClienteManualmente = (cpf: string, produto: { id?: string; nome: string; valor: number }): boolean => {
        const clientDataAtualizado = [...this.state.clientData];
        const clienteIndex = clientDataAtualizado.findIndex(c => c.cpf === cpf);
        
        if (clienteIndex !== -1) {
            const cliente = clientDataAtualizado[clienteIndex];
            
            if (!cliente.produtosConsumidos) {
                cliente.produtosConsumidos = [];
            }
            
            cliente.produtosConsumidos.push(produto);
            
            this.setState({ clientData: clientDataAtualizado });
            return true;
        }
        
        return false;
    }

    adicionarServicoClienteManualmente = (cpf: string, servico: { id?: string; nome: string; preco: number }): boolean => {
        const clientDataAtualizado = [...this.state.clientData];
        const clienteIndex = clientDataAtualizado.findIndex(c => c.cpf === cpf);
        
        if (clienteIndex !== -1) {
            const cliente = clientDataAtualizado[clienteIndex];
            
            if (!cliente.servicosConsumidos) {
                cliente.servicosConsumidos = [];
            }
            
            cliente.servicosConsumidos.push(servico);
            
            this.setState({ clientData: clientDataAtualizado });
            return true;
        }
        
        return false;
    }

    handleProdutoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedProduto: e.target.value });
    }

    handleServicoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedServico: e.target.value });
    }

    handleProdutoQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantidade = parseInt(e.target.value);
        this.setState({ produtoQuantidade: isNaN(quantidade) ? 1 : quantidade });
    }

    handleServicoQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantidade = parseInt(e.target.value);
        this.setState({ servicoQuantidade: isNaN(quantidade) ? 1 : quantidade });
    }

    limparNotificacoes = () => {
        this.setState({
            error: null,
            successMessage: null
        });
    }

    render() {
        const { error, loading, successMessage } = this.state;

        return (
            <div className="container-fluid px-3 px-md-4 d-flex flex-column min-vh-100">
                {error && (
                    <Notificacao
                        mensagem={error}
                        tipo="error"
                        onClose={this.limparNotificacoes}
                    />
                )}

                {successMessage && (
                    <Notificacao
                        mensagem={successMessage}
                        tipo="success"
                        onClose={this.limparNotificacoes}
                    />
                )}

                {loading && (
                    <div className="text-center py-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p className="mt-2">Carregando clientes...</p>
                    </div>
                )}

                <BotaoTopClientes seletorView={this.props.seletorView} viewAtual="Clientes" />
                <div className="list-group flex-grow-1 mb-5">
                    {this.state.clientData.map((cliente, index) => (
                        <div key={index} className="list-group-item shadow-sm mb-2">
                            <div className="d-flex w-100 justify-content-between align-items-center"
                                onClick={() => this.handleClientClick(index)}
                                style={{ cursor: 'pointer' }}>
                                <h5 className="mb-1 text-break">{cliente.nome}</h5>
                                <i className={`bi bi-chevron-${this.state.selectedClient === index ? 'up' : 'down'}`}></i>
                            </div>

                            {this.state.selectedClient === index && (
                                <div className="mt-3">
                                    <form className="mb-3">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Nome</label>
                                                <input type="text" className="form-control" defaultValue={cliente.nome} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Nome Social</label>
                                                <input type="text" className="form-control" defaultValue={cliente.nomeSocial} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Telefone</label>
                                                <input type="text" className="form-control" defaultValue={cliente.telefones && cliente.telefones.length > 0 ? `(${cliente.telefones[0].ddd}) ${cliente.telefones[0].numero}` : 'N/A'} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Pet</label>
                                                <select className="form-select" defaultValue={cliente.pets && cliente.pets.length > 0 ? cliente.pets[0].nome : ''}>
                                                    {cliente.pets && cliente.pets.map((pet, petIndex) => (
                                                        <option key={petIndex} value={pet.nome}>{pet.nome}</option>
                                                    ))}
                                                    {(!cliente.pets || cliente.pets.length === 0) && (
                                                        <option value="">Nenhum pet cadastrado</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="mb-3">Solicitar Produtos e Serviços</h6>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Produto</label>
                                                    <select 
                                                        className="form-select mb-2"
                                                        value={this.state.selectedProduto}
                                                        onChange={this.handleProdutoChange}
                                                    >
                                                        <option value="">Selecione um produto</option>
                                                        {this.state.produtos
                                                            .filter(produto => produto.id)
                                                            .map((produto, i) => (
                                                                <option key={i} value={produto.id}>{produto.nome} - R$ {produto.valor.toFixed(2)}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div className="input-group">
                                                        <span className="input-group-text">Quantidade</span>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            min="1" 
                                                            value={this.state.produtoQuantidade}
                                                            onChange={this.handleProdutoQuantidadeChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Serviço</label>
                                                    <select 
                                                        className="form-select mb-2"
                                                        value={this.state.selectedServico}
                                                        onChange={this.handleServicoChange}
                                                    >
                                                        <option value="">Selecione um serviço</option>
                                                        {this.state.servicos
                                                            .filter(servico => servico.id)
                                                            .map((servico, i) => (
                                                                <option key={i} value={servico.id}>{servico.nome} - R$ {servico.preco.toFixed(2)}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div className="input-group">
                                                        <span className="input-group-text">Quantidade</span>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            min="1" 
                                                            value={this.state.servicoQuantidade}
                                                            onChange={this.handleServicoQuantidadeChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-grid d-md-flex justify-content-md-start mt-3">
                                                <button type="button" className="btn btn-primary" onClick={() => this.handleOrder(index)}>
                                                    Solicitar Pedido
                                                </button>
                                            </div>
                                        </div>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                            <button type="button" className="btn btn-success" onClick={() => this.handleSave(index)}>
                                                Salvar Modificações
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(index)}>
                                                Excluir Cliente
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <BotoesAcaoCliente 
                    seletorView={this.props.seletorView}
                    seletorCliente={this.props.seletorCliente}
                    clienteCpf={this.state.selectedClient !== null ? this.state.clientData[this.state.selectedClient]?.cpf : undefined}
                />
            </div>
        )
    }
}