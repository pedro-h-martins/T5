import { Component } from "react";
import '../css/styles.css';
import api from "../services/api";
import { TopClient } from "../services/types";

type props = {
    tema: string,
    seletorView?: Function
}

type state = {
    topClientesProdutos: TopClient[];
    topClientesServicos: TopClient[];
    topClientesValor: TopClient[];
    filtroSelecionado: string | null;
    mostrarPlaceholder: boolean;
    mostrarTopValorGasto: boolean;
    loading: boolean;
    error: string | null;
}

export default class ListaTopClientes extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            topClientesProdutos: [],
            topClientesServicos: [],
            topClientesValor: [],
            filtroSelecionado: null,
            mostrarPlaceholder: true,
            mostrarTopValorGasto: false,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarDados();
    }

    carregarDados = async () => {
        this.setState({ loading: true, error: null });
        try {
            const [topClientesProdutos, topClientesServicos, topClientesValor] = await Promise.all([
                api.relatorios.getTopClientesProdutos(),
                api.relatorios.getTopClientesServicos(),
                api.relatorios.getTopClientesValor()
            ]);

            this.setState({
                topClientesProdutos,
                topClientesServicos,
                topClientesValor,
                loading: false
            });
        } catch (error) {
            console.error("Erro ao carregar dados de top clientes:", error);
            this.setState({
                error: "Erro ao carregar os dados dos top clientes",
                loading: false
            });
        }
    }

    aplicarFiltro = (filtro: string) => {
        this.setState({
            filtroSelecionado: filtro,
            mostrarPlaceholder: false,
            mostrarTopValorGasto: false
        });
    }

    mostrarTopPorValorGasto = () => {
        this.setState({
            mostrarTopValorGasto: true,
            mostrarPlaceholder: false,
            filtroSelecionado: null
        });
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
        const { 
            filtroSelecionado, 
            mostrarPlaceholder, 
            mostrarTopValorGasto, 
            topClientesProdutos, 
            topClientesServicos, 
            topClientesValor,
            loading,
            error
        } = this.state;

        if (loading) {
            return (
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p className="mt-3">Carregando dados de clientes...</p>
                    </div>
                </div>
            );
        }

        return (
            <main className="container-fluid px-2 px-md-3">
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show my-3" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                        <button type="button" className="btn-close" onClick={this.limparNotificacoes}></button>
                    </div>
                )}

                <section className="top-clients-section mb-5">
                    <header>
                        <h3 className="text-center mb-4">Top 10 Clientes por Consumo</h3>
                    </header>
                    <div className="row g-3">
                        <div className="col-md-9 order-2 order-md-1">
                            {!mostrarTopValorGasto ? (
                                <article className="card">
                                    <div className="card-body p-0">
                                        <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                            <div className="col-md-4">Cliente</div>
                                            <div className="col-md-4">Quantidade</div>
                                            <div className="col-md-4">Total</div>
                                        </div>{mostrarPlaceholder ? (
                                            <div className="placeholder-container bg-secondary bg-opacity-10 p-3 p-md-5 text-center rounded m-2 m-md-3 border border-secondary border-opacity-25">
                                                <div className="placeholder-message text-secondary py-3 py-md-4">
                                                    <i className="bi bi-filter-circle fs-1 d-block mb-3 mb-md-4"></i>
                                                    <h4 className="mb-2 mb-md-3">Selecione um filtro</h4>
                                                    <p className="text-muted mb-3">Para visualizar o ranking de clientes, escolha uma opção de filtro</p>
                                                    <div className="d-flex justify-content-center flex-wrap gap-2">
                                                        <div className="badge bg-primary bg-opacity-25 text-primary p-2">Produtos</div>
                                                        <div className="badge bg-primary bg-opacity-25 text-primary p-2">Serviços</div>
                                                    </div>
                                                    <div className="mt-4 d-flex justify-content-center">
                                                        <i className="bi bi-arrow-up-circle fs-3 d-block d-md-none"></i>
                                                        <i className="bi bi-arrow-right-circle fs-3 d-none d-md-block"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="px-3">
                                                <ul className="list-unstyled m-0">
                                                    {filtroSelecionado === 'produtos' && topClientesProdutos.map((cliente, index) => (
                                                        <li key={index} className="row py-3 border-bottom transition">
                                                            <span className="col-12 col-md-4 mb-2 mb-md-0" data-label="Cliente:">
                                                                <span className={`badge bg-${index < 3 ? 'warning' : 'secondary'} me-2`}>{index + 1}</span>
                                                                {cliente.nome}
                                                            </span>
                                                            <span className="col-6 col-md-4" data-label="Quantidade:">
                                                                <span className="d-inline d-md-none fw-bold me-2">Quantidade: </span>
                                                                {cliente.quantidade}
                                                            </span>
                                                            <span className="col-6 col-md-4 text-end text-md-start" data-label="Total:">
                                                                <span className="d-inline d-md-none fw-bold me-2">Total: </span>
                                                                <strong>{cliente.total}</strong>
                                                            </span>
                                                        </li>
                                                    ))}
                                                    
                                                    {filtroSelecionado === 'servicos' && topClientesServicos.map((cliente, index) => (
                                                        <li key={index} className="row py-3 border-bottom transition">
                                                            <span className="col-12 col-md-4 mb-2 mb-md-0" data-label="Cliente:">
                                                                <span className={`badge bg-${index < 3 ? 'warning' : 'secondary'} me-2`}>{index + 1}</span>
                                                                {cliente.nome}
                                                            </span>
                                                            <span className="col-6 col-md-4" data-label="Quantidade:">
                                                                <span className="d-inline d-md-none fw-bold me-2">Quantidade: </span>
                                                                {cliente.quantidade}
                                                            </span>
                                                            <span className="col-6 col-md-4 text-end text-md-start" data-label="Total:">
                                                                <span className="d-inline d-md-none fw-bold me-2">Total: </span>
                                                                <strong>{cliente.total}</strong>
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ) : (
                                <article className="card mb-4">
                                    <div className="card-header bg-success bg-opacity-10 d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0 text-success fs-6 fs-md-5">Top 5 Clientes por Valor Gasto</h5>
                                        <button className="btn btn-sm btn-danger ms-2" onClick={() => this.setState({ mostrarTopValorGasto: false })}>
                                            <i className="bi bi-x-lg text-white"></i>
                                        </button>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="bg-success bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                            <div className="col-md-6">Cliente</div>
                                            <div className="col-md-6 text-end">Valor Gasto</div>
                                        </div>
                                        <div className="px-3">
                                            <ul className="list-unstyled m-0">
                                                {topClientesValor.slice(0, 5).map((cliente, index) => (
                                                    <li key={index} className="row py-3 border-bottom transition">
                                                        <span className="col-12 col-md-6 mb-2 mb-md-0" data-label="Cliente:">
                                                            <span className={`badge bg-${index < 3 ? 'success' : 'secondary'} me-2`}>{index + 1}</span>
                                                            {cliente.nome}
                                                        </span>
                                                        <span className="col-12 col-md-6 text-start text-md-end fw-bold" data-label="Valor Gasto:">
                                                            <span className="d-inline d-md-none fw-normal me-2">Valor Gasto: </span>
                                                            {this.formatarValor(cliente.total)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            )}
                        </div>
                        <div className="col-md-3 order-1 order-md-2 mb-3 mb-md-0">
                            <div className="card shadow-sm sticky-top" style={{top: '1rem'}}>
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">Filtros</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-grid gap-2">
                                        <div className="d-flex flex-row flex-md-column gap-2 mb-2">
                                            <button
                                                className={`btn ${filtroSelecionado === 'produtos' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center justify-content-center flex-grow-1`}
                                                onClick={() => this.aplicarFiltro('produtos')}
                                            >
                                                <i className="bi bi-box-seam me-2"></i> Produtos
                                            </button>
                                            <button
                                                className={`btn ${filtroSelecionado === 'servicos' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center justify-content-center flex-grow-1`}
                                                onClick={() => this.aplicarFiltro('servicos')}
                                            >
                                                <i className="bi bi-scissors me-2"></i> Serviços
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-success d-flex align-items-center justify-content-center"
                                            onClick={this.mostrarTopPorValorGasto}
                                        >
                                            <i className="bi bi-currency-dollar me-2"></i> Top 5 por Valor Gasto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}
