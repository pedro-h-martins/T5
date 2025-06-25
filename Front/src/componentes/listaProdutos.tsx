import { Component } from "react";
import "../css/styles.css";

type props = {
    tema: string
}

type state = {
    selectedProduct: number | null;
    productData: Array<{
        nome: string;
        valor: number;
    }>;
}

export default class ListaProduto extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            selectedProduct: null,
            productData: [
                { nome: 'Ração Premium', valor: 29.99 },
                { nome: 'Antipulgas', valor: 39.99 },
                { nome: 'Brinquedo Mastigável', valor: 19.99 },
                { nome: 'Shampoo Pet', valor: 49.99 }
            ]
        };
    } handleProductClick = (index: number) => {
        this.setState({ selectedProduct: this.state.selectedProduct === index ? null : index });
    }

    handleSave = (index: number) => {
        this.setState({
            selectedProduct: null
        });
    }

    handleDelete = (index: number) => {
        const updatedProducts = this.state.productData.filter((_, i) => i !== index);
        this.setState({
            productData: updatedProducts,
            selectedProduct: null
        });
    }

    render() {
        return (
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
                                                    <form className="mb-3">
                                                        <div className="mb-3">
                                                            <label className="form-label text-muted small fw-bold">Valor do Produto</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text bg-light">R$</span>
                                                                <input type="number"
                                                                    className="form-control form-control-sm"
                                                                    step="0.01"
                                                                    defaultValue={produto.valor} />
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
                                <div className="list-group">
                                    {['Antipulgas', 'Shampoo Pet', 'Brinquedo Mastigável'].map((produto, index) => (
                                        <div key={index} className="list-group-item list-group-item-action border-0 border-bottom transition">
                                            <div className="d-flex w-100 justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <span className="badge rounded-pill bg-primary me-3">{index + 1}</span>
                                                    <h6 className="mb-0">{produto}</h6>
                                                </div>
                                                <small className="text-muted">
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    {['92%', '84%', '71%'][index]}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
