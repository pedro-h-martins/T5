import { Component } from "react";

type props = {
    seletorView: Function
}

export default class BotoesAcaoCliente extends Component<props> {
    render() {
        return (
            <div className="sticky-bottom py-4 mt-auto" style={{ background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)', borderTop: '1px solid #dee2e6', boxShadow: '0px -2px 10px rgba(0,0,0,0.05)' }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-center gap-3">
                        <button type="button" 
                            className="btn btn-outline-primary fw-bold"
                            onClick={(e) => this.props.seletorView('Editar Pet', e)}>
                            Atualizar/Editar Pet
                        </button>
                        <button type="button" 
                            className="btn btn-outline-success fw-bold"
                            onClick={(e) => this.props.seletorView('Produtos e Serviços', e)}>
                            Produtos e Serviços dos Pets
                        </button>                        
                        <button type="button" 
                            className="btn btn-outline-info fw-bold"
                            onClick={(e) => this.props.seletorView('Pagamento do Cliente', e)}>
                            Pagamento do Cliente
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
