import { Component } from "react";
import '../css/styles.css';

type props = {
    tema: string
}

export default class TabelaProdutosServicosMaisConsumidos extends Component<props> {
    render() {
        return (
            <main className="container-fluid">                
                <section className="products-section mb-5">
                    <header>
                        <h3 className="text-center mb-4">Produtos mais consumidos pelos pets</h3>
                    </header>
                    <article className="card">
                        <div className="card-body p-0">
                            <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                <div className="col-md-4">Tipo de Animal</div>
                                <div className="col-md-4">Raça</div>
                                <div className="col-md-4">Produto</div>
                            </div>
                            <div className="px-3">
                                <ul className="list-unstyled m-0">                                    
                                    <li className="row py-3 border-bottom transition">
                                        <span className="col-md-4" data-label="Animal:">Cachorro</span>
                                        <span className="col-md-4" data-label="Raça:">Golden Retriever</span>
                                        <span className="col-md-4" data-label="Produto:">Ração Premium</span>
                                    </li>
                                    <li className="row py-3 border-bottom transition">
                                        <span className="col-md-4" data-label="Animal:">Gato</span>
                                        <span className="col-md-4" data-label="Raça:">Siamês</span>
                                        <span className="col-md-4" data-label="Produto:">Petisco Natural</span>
                                    </li>
                                    <li className="row py-3 border-bottom transition">
                                        <span className="col-md-4" data-label="Animal:">Passarinho</span>
                                        <span className="col-md-4" data-label="Raça:">Periquito</span>
                                        <span className="col-md-4" data-label="Produto:">Alpiste Premium</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </article>
                </section>

                <section className="services-section">
                    <header>
                        <h3 className="text-center mb-4">Serviços mais consumidos pelos pets</h3>
                    </header>
                    <article className="card">
                        <div className="card-body p-0">
                            <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex">
                                <div className="col-md-4">Tipo de Animal</div>
                                <div className="col-md-4">Raça</div>
                                <div className="col-md-4">Serviço</div>
                            </div>
                            <div className="px-3">
                                <ul className="list-unstyled m-0">                                    
                                    <li className="row py-3 border-bottom transition">
                                        <span className="col-md-4" data-label="Animal:">Cachorro</span>
                                        <span className="col-md-4" data-label="Raça:">Golden Retriever</span>
                                        <span className="col-md-4" data-label="Serviço:">Banho e Tosa</span>
                                    </li>
                                    <li className="row py-3 border-bottom transition">
                                        <span className="col-md-4" data-label="Animal:">Gato</span>
                                        <span className="col-md-4" data-label="Raça:">Siamês</span>
                                        <span className="col-md-4" data-label="Serviço:">Consulta Veterinária</span>
                                    </li>
                                    <li className="row py-3 border-bottom transition">
                                        <span className="col-md-4" data-label="Animal:">Passarinho</span>
                                        <span className="col-md-4" data-label="Raça:">Periquito</span>
                                        <span className="col-md-4" data-label="Serviço:">Corte de Unhas</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        )
    }
}
