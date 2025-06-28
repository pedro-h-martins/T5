import { Component } from "react";
import "../css/styles.css";
import api from "../services/api";
import Notificacao from "./notificacao";

type props = {
    tema: string
}

type state = {
    selectedProduct: number | null;
    productData: Array<{
        id?: string;
        nome: string;
        valor: number;
    }>;
    topProducts: Array<{
        nome: string;
        quantidade: number;
        percentual?: number;
    }>;
    loading: boolean;
    loadingTop: boolean;
    error: string | null;
}

export default class ListaProduto extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            selectedProduct: null,
            productData: [],
            topProducts: [],
            loading: true,
            loadingTop: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarProdutos();
        this.carregarProdutosTopConsumidos();
    }

    carregarProdutos = async () => {
        this.setState({ loading: true, error: null });
        try {
            const produtos = await api.produto.getAllProdutos();
            this.setState({ 
                productData: produtos, 
                loading: false 
            });
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
            this.setState({ 
                error: "Erro ao carregar a lista de produtos", 
                loading: false 
            });
        }
    }

    carregarProdutosTopConsumidos = async () => {
        this.setState({ loadingTop: true, error: null });
        try {
            const topProdutos = await api.relatorios.getTopProdutos();
            this.setState({ 
                topProducts: topProdutos,
                loadingTop: false
            });
        } catch (error) {
            console.error("Erro ao carregar produtos mais consumidos:", error);
            this.setState({ 
                error: "Erro ao carregar a lista de produtos mais consumidos",
                loadingTop: false
            });
        }
    }

    handleProductClick = (index: number) => {
        this.setState({ selectedProduct: this.state.selectedProduct === index ? null : index });
    }

    handleSave = async (index: number) => {
        try {
            const produto = this.state.productData[index];
            
            if (produto.id) {
                await api.produto.updateProduto(produto.id, {
                    nome: produto.nome,
                    valor: produto.valor
                });
                await this.carregarProdutos();
                await this.carregarProdutosTopConsumidos();
            }
            this.setState({ selectedProduct: null });
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            this.setState({ error: "Erro ao salvar produto" });
        }
    }

    handleDelete = async (index: number) => {
        try {
            const produto = this.state.productData[index];
            if (produto.id) {
                await api.produto.deleteProduto(produto.id);
                await this.carregarProdutos();
                await this.carregarProdutosTopConsumidos();
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            this.setState({ error: "Erro ao excluir produto" });
        }
    }

    limparNotificacoes = () => {
        this.setState({
            error: null
        });
    }

    handleValorChange = (index: number, valor: number) => {
        const productData = [...this.state.productData];
        productData[index] = { ...productData[index], valor };
        this.setState({ productData });
    }

    render() {
        const { error, loading, loadingTop } = this.state;

        if (loading) {
            return (
                <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Carregando produtos...</p>
                </div>
            );
        }

        return (
            <div>
                {error && (
                    <Notificacao 
                        mensagem={error} 
                        tipo="error"
                        onClose={this.limparNotificacoes}
                    />
                )}
                <div className="container-fluid px-lg-5 py-4">
                <div className="row">
                    <div className="col-lg-8 mb-5">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-light py-3">
                                <h4 className="card-title mb-0 text-primary">
                                    <i className="bi bi-box-seam me-2"></i>Produtos Disponíveis
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    {this.state.productData.map((produto, index) => (
                                        <div key={index} className="list-group-item list-group-item-action border-0 border-bottom mb-2 transition">
                                            <div className="d-flex w-100 justify-content-between align-items-center py-2"
                                                onClick={() => this.handleProductClick(index)}
                                                style={{ cursor: 'pointer' }}>
                                                <div>
                                                    <h5 className="mb-1 fw-semibold">{produto.nome}</h5>
                                                    <p className="mb-0 text-muted">
                                                        <span className="badge bg-primary bg-opacity-10 text-primary me-2">
                                                            R$ {produto.valor.toFixed(2)}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className={`bi bi-chevron-${this.state.selectedProduct === index ? 'up' : 'down'} fs-5 text-secondary`}></i>
                                                </div>
                                            </div>

                                            {this.state.selectedProduct === index && (
                                                <div className="mt-3 border-top pt-3 animate__animated animate__fadeIn">
                                                    <form className={`mb-3 product-${index}`}>
                                                        <div className="mb-3">
                                                            <label className="form-label text-muted small fw-bold">Valor do Produto</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">R$</span>
                                                                <input type="number"
                                                                    className="form-control form-control-sm"
                                                                    step="0.01"
                                                                    value={produto.valor}
                                                                    onChange={(e) => this.handleValorChange(index, parseFloat(e.target.value) || 0)} />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex gap-2">
                                                            <button type="button"
                                                                className="btn btn-sm btn-success"
                                                                onClick={() => this.handleSave(index)}>
                                                                <i className="bi bi-check-lg me-1"></i>Salvar
                                                            </button>
                                                            <button type="button"
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => this.handleDelete(index)}>
                                                                <i className="bi bi-trash me-1"></i>Excluir
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 mb-5">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-light py-3">
                                <h4 className="card-title mb-0 text-primary">
                                    <i className="bi bi-graph-up-arrow me-2"></i>Mais Consumidos
                                </h4>
                            </div>
                            <div className="card-body">
                                {this.state.loadingTop ? (
                                    <div className="text-center py-3">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                        <p className="mt-2">Carregando produtos mais consumidos...</p>
                                    </div>
                                ) : (
                                    <div className="list-group">
                                        {this.state.topProducts.length > 0 ? (
                                            this.state.topProducts.map((produto, index) => (
                                                <div key={index} className="list-group-item list-group-item-action border-0 border-bottom transition">
                                                    <div className="d-flex w-100 justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <span className="badge rounded-pill bg-primary me-3">{index + 1}</span>
                                                            <h6 className="mb-0">{produto.nome}</h6>
                                                        </div>
                                                        <small className="text-muted">
                                                            <i className="bi bi-star-fill text-warning me-1"></i>
                                                            {produto.quantidade} {produto.percentual ? `(${produto.percentual}%)` : ''}
                                                        </small>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-3">
                                                <p>Nenhum produto consumido ainda</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
