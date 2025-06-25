import { Component } from "react";

type props = {
    seletorView: Function,
    viewAtual?: string
}

export default class BotaoTopClientes extends Component<props> {
    render() {
        const { viewAtual } = this.props;
        
        return (
            <div className="d-flex justify-content-start ms-3 my-4">
                {viewAtual === 'Top Clientes' ? (
                    <button
                        type="button"
                        className="btn btn-secondary d-flex align-items-center"
                        onClick={(e) => this.props.seletorView('Clientes', e)}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        <span>Voltar à lista geral</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        onClick={(e) => this.props.seletorView('Top Clientes', e)}
                    >
                        <i className="bi bi-trophy me-2"></i>
                        <span>Ver Top Clientes</span>
                    </button>
                )}
            </div>
        )
    }
}
