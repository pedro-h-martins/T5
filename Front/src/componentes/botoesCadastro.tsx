import { Component } from "react";

type props = {
    tema: string,
    seletorView: Function,
    telaAtiva: string
}

export default class BotoesCadastro extends Component<props> {
    render() {
        return (
            <div className="sticky-bottom bg-light py-3 mt-auto">
                <div className="container-fluid">
                    <div className="d-flex justify-content-center gap-2">                        
                        <button type="button" 
                            className={`btn ${this.props.telaAtiva === 'Cadastrar Cliente' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={(e) => this.props.seletorView('Cadastrar Cliente', e)}>
                            Cadastrar Cliente
                        </button>
                        <button type="button" 
                            className={`btn ${this.props.telaAtiva === 'Cadastrar Pet' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={(e) => this.props.seletorView('Cadastrar Pet', e)}>
                            Cadastrar Pet
                        </button>
                        <button type="button" 
                            className={`btn ${this.props.telaAtiva === 'Cadastrar Produto' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={(e) => this.props.seletorView('Cadastrar Produto', e)}>
                            Cadastrar Produto
                        </button>
                        <button type="button" 
                            className={`btn ${this.props.telaAtiva === 'Cadastrar Serviço' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={(e) => this.props.seletorView('Cadastrar Serviço', e)}>
                            Cadastrar Serviço
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
