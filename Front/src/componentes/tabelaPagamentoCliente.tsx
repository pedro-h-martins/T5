import { Component } from "react";
import '../css/styles.css';
import api from "../services/api";
import Notificacao from "./notificacao";

type props = {
    tema: string,
    clienteCpf: string
}

type state = {
    consumoData: {
        produtos: {nome: string, valor: number, quantidade: number}[],
        servicos: {nome: string, preco: number, quantidade: number}[],
        valorTotal: number
    } | null,
    loading: boolean,
    error: string | null
}

export default class TabelaPagamentoCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            consumoData: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarConsumoCliente();
    }

    componentDidUpdate(prevProps: props) {
        if (prevProps.clienteCpf !== this.props.clienteCpf) {
            this.carregarConsumoCliente();
        }
    }

    carregarConsumoCliente = async () => {
        if (!this.props.clienteCpf) return;

        this.setState({ loading: true, error: null });
        try {
            const produtos = await api.cliente.getClienteProdutos(this.props.clienteCpf);
            
            const servicos = await api.cliente.getClienteServicos(this.props.clienteCpf);
            
            const valorProdutos = produtos.reduce((total, produto) => total + produto.valor, 0);
            const valorServicos = servicos.reduce((total, servico) => total + servico.preco, 0);
            const valorTotal = valorProdutos + valorServicos;
            
            const produtosAgrupados = produtos.reduce((acc, produto) => {
                const key = produto.id + "-" + produto.nome;
                if (!acc[key]) {
                    acc[key] = {
                        nome: produto.nome,
                        valor: produto.valor,
                        quantidade: 0
                    };
                }
                acc[key].quantidade++;
                return acc;
            }, {} as Record<string, {nome: string, valor: number, quantidade: number}>);
            
            const servicosAgrupados = servicos.reduce((acc, servico) => {
                const key = servico.id + "-" + servico.nome;
                if (!acc[key]) {
                    acc[key] = {
                        nome: servico.nome,
                        preco: servico.preco,
                        quantidade: 0
                    };
                }
                acc[key].quantidade++;
                return acc;
            }, {} as Record<string, {nome: string, preco: number, quantidade: number}>);
            
            this.setState({
                consumoData: {
                    produtos: Object.values(produtosAgrupados),
                    servicos: Object.values(servicosAgrupados),
                    valorTotal
                },
                loading: false
            });
        } catch (error) {
            console.error("Erro ao carregar consumo do cliente:", error);
            this.setState({
                error: "Erro ao carregar os dados de consumo do cliente. Por favor, tente novamente.",
                loading: false,
                consumoData: null
            });
        }
    }

    limparNotificacoes = () => {
        this.setState({ error: null });
    }

    formatarValor = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    render() {
        const { consumoData, loading, error } = this.state;

        if (loading) {
            return (
                <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Carregando informações de consumo...</p>
                </div>
            );
        }

        if (!this.props.clienteCpf) {
            return (
                <div className="alert alert-info">
                    Selecione um cliente para ver seus pagamentos.
                </div>
            );
        }

        return (
            <main className="container-fluid">
                {error && (
                    <Notificacao
                        mensagem={error}
                        tipo="error"
                        onClose={this.limparNotificacoes}
                    />
                )}
                
                <section className="payment-section">
                    <h3 className="text-center mb-4">Pagamento deste Cliente:</h3>

                    <h4 className="mb-3">Produtos</h4>
                    <article className="card mb-4">
                        {consumoData && consumoData.produtos && consumoData.produtos.length > 0 ? (
                            <>
                                <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex row">
                                    <div className="col-md-4">Nome do Produto</div>
                                    <div className="col-md-4">Preço Unitário</div>
                                    <div className="col-md-4">Quantidade</div>
                                </div>
                                {consumoData.produtos.map((produto, index) => (
                                    <div key={index} className="row py-3 px-3 border-bottom transition">
                                        <div className="col-12 col-md-4 mb-2 mb-md-0">
                                            <span className="d-md-none fw-semibold me-2">Nome do Produto: </span>
                                            {produto.nome}
                                        </div>
                                        <div className="col-12 col-md-4 mb-2 mb-md-0">
                                            <span className="d-md-none fw-semibold me-2">Preço Unitário: </span>
                                            {this.formatarValor(produto.valor)}
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <span className="d-md-none fw-semibold me-2">Quantidade: </span>
                                            {produto.quantidade}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="alert alert-info m-3">
                                Este cliente não consumiu produtos.
                            </div>
                        )}
                    </article>

                    <h4 className="mb-3">Serviços</h4>
                    <article className="card">
                        {consumoData && consumoData.servicos && consumoData.servicos.length > 0 ? (
                            <>
                                <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex row">
                                    <div className="col-md-4">Nome do Serviço</div>
                                    <div className="col-md-4">Preço Unitário</div>
                                    <div className="col-md-4">Quantidade</div>
                                </div>
                                {consumoData.servicos.map((servico, index) => (
                                    <div key={index} className="row py-3 px-3 border-bottom transition">
                                        <div className="col-12 col-md-4 mb-2 mb-md-0">
                                            <span className="d-md-none fw-semibold me-2">Nome do Serviço: </span>
                                            {servico.nome}
                                        </div>
                                        <div className="col-12 col-md-4 mb-2 mb-md-0">
                                            <span className="d-md-none fw-semibold me-2">Preço Unitário: </span>
                                            {this.formatarValor(servico.preco)}
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <span className="d-md-none fw-semibold me-2">Quantidade: </span>
                                            {servico.quantidade}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="alert alert-info m-3">
                                Este cliente não consumiu serviços.
                            </div>
                        )}
                    </article>
                </section>

                <section className="total-section mt-4">
                    <article className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 fw-bold">Total a Pagar:</div>
                                <div className="col-md-9">
                                    {consumoData ? this.formatarValor(consumoData.valorTotal || 0) : 'R$ 0,00'}
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        )
    }
}