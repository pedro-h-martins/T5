import { Component } from "react";
import '../css/styles.css';

type props = {
    tema: string,
    seletorView?: Function
}

type state = {
    topClientes: Array<{
        nome: string;
        quantidadeProdutos: number;
        quantidadeServicos: number;
        quantidadeTotal: number;
        valorGasto: number;
    }>;
    filtroSelecionado: string | null;
    mostrarPlaceholder: boolean;
    mostrarTopValorGasto: boolean;
}

export default class ListaTopClientes extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            topClientes: [
                { nome: 'João Silva', quantidadeProdutos: 12, quantidadeServicos: 8, quantidadeTotal: 20, valorGasto: 1250.50 },
                { nome: 'Maria Oliveira', quantidadeProdutos: 10, quantidadeServicos: 7, quantidadeTotal: 17, valorGasto: 980.75 },
                { nome: 'Pedro Santos', quantidadeProdutos: 8, quantidadeServicos: 6, quantidadeTotal: 14, valorGasto: 1450.30 },
                { nome: 'Ana Pereira', quantidadeProdutos: 7, quantidadeServicos: 6, quantidadeTotal: 13, valorGasto: 890.20 },
                { nome: 'Carlos Ferreira', quantidadeProdutos: 5, quantidadeServicos: 7, quantidadeTotal: 12, valorGasto: 1120.40 },
                { nome: 'Mariana Costa', quantidadeProdutos: 6, quantidadeServicos: 5, quantidadeTotal: 11, valorGasto: 750.90 },
                { nome: 'Lucas Almeida', quantidadeProdutos: 4, quantidadeServicos: 6, quantidadeTotal: 10, valorGasto: 680.15 },
                { nome: 'Juliana Martins', quantidadeProdutos: 5, quantidadeServicos: 4, quantidadeTotal: 9, valorGasto: 540.30 },
                { nome: 'Roberto Souza', quantidadeProdutos: 3, quantidadeServicos: 5, quantidadeTotal: 8, valorGasto: 630.75 },
                { nome: 'Fernanda Lima', quantidadeProdutos: 4, quantidadeServicos: 3, quantidadeTotal: 7, valorGasto: 420.50 }
            ],
            filtroSelecionado: null,
            mostrarPlaceholder: true,
            mostrarTopValorGasto: false
        };
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

    render() {
        const { filtroSelecionado, mostrarPlaceholder, mostrarTopValorGasto } = this.state;

        return (
            <main className="container-fluid">
                <section className="top-clients-section mb-5">
                    <header>
                        <h3 className="text-center mb-4">Top 10 Clientes por Consumo</h3>
                    </header>
                    <div className="row">
                        <div className="col-md-9">
                            {!mostrarTopValorGasto ? (
                                <article className="card">
                                    <div className="card-body p-0">
                                        <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                            <div className="col-md-3">Cliente</div>
                                            <div className="col-md-3">Produtos</div>
                                            <div className="col-md-3">Serviços</div>
                                            <div className="col-md-3">Total</div>
                                        </div>{mostrarPlaceholder ? (
                                            <div className="placeholder-container bg-secondary bg-opacity-10 p-5 text-center rounded m-3 border border-secondary border-opacity-25">
                                                <div className="placeholder-message text-secondary py-4">
                                                    <i className="bi bi-filter-circle fs-1 d-block mb-4"></i>
                                                    <h4 className="mb-3">Selecione um filtro</h4>
                                                    <p className="text-muted mb-3">Para visualizar o ranking de clientes, escolha uma opção de filtro ao lado</p>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="badge bg-primary bg-opacity-25 text-primary me-2 p-2">Produtos</div>
                                                        <div className="badge bg-primary bg-opacity-25 text-primary p-2">Serviços</div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <i className="bi bi-arrow-right-circle fs-3 d-none d-md-block"></i>
                                                        <i className="bi bi-arrow-down-circle fs-3 d-block d-md-none"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="px-3">
                                                <ul className="list-unstyled m-0">
                                                    {this.state.topClientes
                                                        .sort((a, b) => {
                                                            if (filtroSelecionado === 'produtos') {
                                                                return b.quantidadeProdutos - a.quantidadeProdutos;
                                                            } else if (filtroSelecionado === 'servicos') {
                                                                return b.quantidadeServicos - a.quantidadeServicos;
                                                            } else {
                                                                return b.quantidadeTotal - a.quantidadeTotal;
                                                            }
                                                        })
                                                        .map((cliente, index) => (
                                                            <li key={index} className="row py-3 border-bottom transition">
                                                                <span className="col-md-3" data-label="Cliente:">
                                                                    <span className={`badge bg-${index < 3 ? 'warning' : 'secondary'} me-2`}>{index + 1}</span>
                                                                    {cliente.nome}
                                                                </span>
                                                                <span className={`col-md-3 ${filtroSelecionado === 'produtos' ? 'fw-bold' : ''}`} data-label="Produtos:">
                                                                    {cliente.quantidadeProdutos}
                                                                </span>
                                                                <span className={`col-md-3 ${filtroSelecionado === 'servicos' ? 'fw-bold' : ''}`} data-label="Serviços:">
                                                                    {cliente.quantidadeServicos}
                                                                </span>
                                                                <span className="col-md-3" data-label="Total:">
                                                                    <strong>{cliente.quantidadeTotal}</strong>
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
                                        <h5 className="mb-0 text-success">Top 5 Clientes por Valor Gasto</h5>
                                        <button className="btn btn-sm btn-danger" onClick={() => this.setState({ mostrarTopValorGasto: false })}>
                                            <i className="bi bi-x-lg text-white"></i>
                                        </button>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="bg-success bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                            <div className="col-md-6">Cliente</div>
                                            <div className="col-md-6 text-end">Valor Gasto (R$)</div>
                                        </div>
                                        <div className="px-3">
                                            <ul className="list-unstyled m-0">
                                                {this.state.topClientes
                                                    .sort((a, b) => b.valorGasto - a.valorGasto)
                                                    .slice(0, 5)
                                                    .map((cliente, index) => (
                                                        <li key={index} className="row py-3 border-bottom transition">
                                                            <span className="col-md-6" data-label="Cliente:">
                                                                <span className={`badge bg-${index < 3 ? 'success' : 'secondary'} me-2`}>{index + 1}</span>
                                                                {cliente.nome}
                                                            </span>
                                                            <span className="col-md-6 text-md-end fw-bold" data-label="Valor Gasto:">
                                                                {cliente.valorGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                            </span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            )}
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">Filtros</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-grid gap-2">
                                        <button
                                            className={`btn ${filtroSelecionado === 'produtos' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center justify-content-center`}
                                            onClick={() => this.aplicarFiltro('produtos')}
                                        >
                                            <i className="bi bi-box-seam me-2"></i> Produtos
                                        </button>
                                        <button
                                            className={`btn ${filtroSelecionado === 'servicos' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center justify-content-center`}
                                            onClick={() => this.aplicarFiltro('servicos')}
                                        >
                                            <i className="bi bi-scissors me-2"></i> Serviços
                                        </button>
                                        <button
                                            className="btn btn-success d-flex align-items-center justify-content-center mt-3"
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
