import { Component } from "react";
import "../css/styles.css";
import api from "../services/api";
import Notificacao from "./notificacao";

type props = {
    tema: string
}

type state = {
    selectedService: number | null;
    serviceData: Array<{
        id?: string;
        nome: string;
        preco: number;
    }>;
    topServices: Array<{
        nome: string;
        quantidade: number;
        percentual?: number;
    }>;
    loading: boolean;
    loadingTop: boolean;
    error: string | null;
}

export default class ListaServico extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            selectedService: null,
            serviceData: [],
            topServices: [],
            loading: true,
            loadingTop: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarServicos();
        this.carregarServicosTopConsumidos();
    }

    carregarServicos = async () => {
        this.setState({ loading: true, error: null });
        try {
            const servicos = await api.servico.getAllServicos();
            this.setState({ 
                serviceData: servicos, 
                loading: false 
            });
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
            this.setState({ 
                error: "Erro ao carregar a lista de serviços", 
                loading: false 
            });
        }
    }

    carregarServicosTopConsumidos = async () => {
        this.setState({ loadingTop: true, error: null });
        try {
            const topServicos = await api.relatorios.getTopServicos();
            this.setState({ 
                topServices: topServicos,
                loadingTop: false
            });
        } catch (error) {
            console.error("Erro ao carregar serviços mais consumidos:", error);
            this.setState({ 
                error: "Erro ao carregar a lista de serviços mais consumidos",
                loadingTop: false
            });
        }
    }

    handleServiceClick = (index: number) => {
        this.setState({ selectedService: this.state.selectedService === index ? null : index });
    }

    handleSave = async (index: number) => {
        try {
            const servico = this.state.serviceData[index];
            if (servico.id) {
                await api.servico.updateServico(servico.id, {
                    nome: servico.nome,
                    preco: servico.preco
                });
                await this.carregarServicos();
                await this.carregarServicosTopConsumidos();
            }
            this.setState({ selectedService: null });
        } catch (error) {
            console.error("Erro ao salvar serviço:", error);
            this.setState({ error: "Erro ao salvar serviço" });
        }
    }

    handleDelete = async (index: number) => {
        try {
            const servico = this.state.serviceData[index];
            if (servico.id) {
                await api.servico.deleteServico(servico.id);
                await this.carregarServicos();
                await this.carregarServicosTopConsumidos();
            }
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
            this.setState({ error: "Erro ao excluir serviço" });
        }
    }

    limparNotificacoes = () => {
        this.setState({
            error: null
        });
    }

    handlePrecoChange = (index: number, preco: number) => {
        const serviceData = [...this.state.serviceData];
        serviceData[index] = { ...serviceData[index], preco };
        this.setState({ serviceData });
    }

    render() {
        const { error, loading, loadingTop } = this.state;

        if (loading) {
            return (
                <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Carregando serviços...</p>
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
                                    <i className="bi bi-scissors me-2"></i>Serviços Disponíveis
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    {this.state.serviceData.map((servico, index) => (
                                        <div key={index} className="list-group-item list-group-item-action border-0 border-bottom mb-2 transition">
                                            <div className="d-flex w-100 justify-content-between align-items-center py-2"
                                                onClick={() => this.handleServiceClick(index)}
                                                style={{ cursor: 'pointer' }}>
                                                <div>
                                                    <h5 className="mb-1 fw-semibold">{servico.nome}</h5>
                                                    <p className="mb-0 text-muted">
                                                        <span className="badge bg-primary bg-opacity-10 text-primary me-2">
                                                            R$ {servico.preco.toFixed(2)}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className={`bi bi-chevron-${this.state.selectedService === index ? 'up' : 'down'} fs-5 text-secondary`}></i>
                                                </div>
                                            </div>

                                            {this.state.selectedService === index && (
                                                <div className="mt-3 border-top pt-3 animate__animated animate__fadeIn">
                                                    <form className={`mb-3 service-${index}`}>
                                                        <div className="mb-3">
                                                            <label className="form-label text-muted small fw-bold">Valor do Serviço</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">R$</span>
                                                                <input type="number"
                                                                    className="form-control form-control-sm"
                                                                    step="0.01"
                                                                    value={servico.preco}
                                                                    onChange={(e) => this.handlePrecoChange(index, parseFloat(e.target.value) || 0)} />
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
                                        <p className="mt-2">Carregando serviços mais consumidos...</p>
                                    </div>
                                ) : (
                                    <div className="list-group">
                                        {this.state.topServices.length > 0 ? (
                                            this.state.topServices.map((servico, index) => (
                                                <div key={index} className="list-group-item list-group-item-action border-0 border-bottom transition">
                                                    <div className="d-flex w-100 justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <span className="badge rounded-pill bg-primary me-3">{index + 1}</span>
                                                            <h6 className="mb-0">{servico.nome}</h6>
                                                        </div>
                                                        <small className="text-muted">
                                                            <i className="bi bi-star-fill text-warning me-1"></i>
                                                            {servico.quantidade} {servico.percentual ? `(${servico.percentual}%)` : ''}
                                                        </small>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-3">
                                                <p>Nenhum serviço consumido ainda</p>
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
