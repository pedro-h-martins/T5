import { Component } from "react";
import '../css/styles.css';
import api from "../services/api";

type props = {
    tema: string
}

type state = {
    produtosPorPet: Array<{
        tipo: string,
        raca: string,
        produto: string
    }>,
    servicosPorPet: Array<{
        tipo: string,
        raca: string,
        servico: string
    }>,
    loadingProdutos: boolean,
    loadingServicos: boolean
}

export default class TabelaProdutosServicosMaisConsumidos extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            produtosPorPet: [],
            servicosPorPet: [],
            loadingProdutos: true,
            loadingServicos: true
        };
    }

    componentDidMount() {
        this.carregarProdutosPorPet();
        this.carregarServicosPorPet();
    }

    carregarProdutosPorPet = async () => {
        this.setState({ loadingProdutos: true });
        try {
            const produtosPorPet = await api.relatorios.getProdutosMaisConsumidosPorTipoPet();
            this.setState({
                produtosPorPet,
                loadingProdutos: false
            });
        } catch (error) {
            console.error("Erro ao carregar produtos por pet:", error);
            this.setState({
                produtosPorPet: [],
                loadingProdutos: false
            });
        }
    }

    carregarServicosPorPet = async () => {
        this.setState({ loadingServicos: true });
        try {
            const servicosPorPet = await api.relatorios.getServicosMaisConsumidosPorTipoPet();
            this.setState({
                servicosPorPet,
                loadingServicos: false
            });
        } catch (error) {
            console.error("Erro ao carregar serviços por pet:", error);
            this.setState({
                servicosPorPet: [],
                loadingServicos: false
            });
        }
    }

    render() {
        const { 
            produtosPorPet, 
            servicosPorPet, 
            loadingProdutos, 
            loadingServicos 
        } = this.state;

        return (
            <main className="container-fluid">
                
                <section className="products-section mb-5">
                    <header>
                        <h3 className="text-center mb-4">Produtos mais consumidos pelos pets</h3>
                    </header>
                    {loadingProdutos ? (
                        <div className="text-center py-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                            <p className="mt-2">Carregando dados de produtos...</p>
                        </div>
                    ) : (
                        <article className="card">
                            <div className="card-body p-0">
                                <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                    <div className="col-md-4">Tipo de Animal</div>
                                    <div className="col-md-4">Raça</div>
                                    <div className="col-md-4">Produto</div>
                                </div>
                                <div className="px-3">
                                    <ul className="list-unstyled m-0">
                                        {produtosPorPet.length > 0 ? (
                                            produtosPorPet.map((item, index) => (
                                                <li key={index} className="row py-3 border-bottom transition">
                                                    <span className="col-md-4" data-label="Animal:">{item.tipo}</span>
                                                    <span className="col-md-4" data-label="Raça:">{item.raca}</span>
                                                    <span className="col-md-4" data-label="Produto:">{item.produto}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="row py-3">
                                                <span className="col-12 text-center">Nenhum dado disponível</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    )}
                </section>

                <section className="services-section">
                    <header>
                        <h3 className="text-center mb-4">Serviços mais consumidos pelos pets</h3>
                    </header>
                    {loadingServicos ? (
                        <div className="text-center py-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                            <p className="mt-2">Carregando dados de serviços...</p>
                        </div>
                    ) : (
                        <article className="card">
                            <div className="card-body p-0">
                                <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                    <div className="col-md-4">Tipo de Animal</div>
                                    <div className="col-md-4">Raça</div>
                                    <div className="col-md-4">Serviço</div>
                                </div>
                                <div className="px-3">
                                    <ul className="list-unstyled m-0">
                                        {servicosPorPet.length > 0 ? (
                                            servicosPorPet.map((item, index) => (
                                                <li key={index} className="row py-3 border-bottom transition">
                                                    <span className="col-md-4" data-label="Animal:">{item.tipo}</span>
                                                    <span className="col-md-4" data-label="Raça:">{item.raca}</span>
                                                    <span className="col-md-4" data-label="Serviço:">{item.servico}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="row py-3">
                                                <span className="col-12 text-center">Nenhum dado disponível</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    )}
                </section>
            </main>
        );
    }
}
