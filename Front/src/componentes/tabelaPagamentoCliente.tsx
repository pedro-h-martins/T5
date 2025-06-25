import { Component } from "react";
import '../css/styles.css';

type props = {
    tema: string
}

export default class TabelaPagamentoCliente extends Component<props> {
    render() {
        return (
            <main className="container-fluid">
                <section className="payment-section">
                    <h3 className="text-center mb-4">Pagamento deste Cliente:</h3>

                    <h4 className="mb-3">Produtos</h4>
                    <article className="card mb-4">
                        <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex row">
                            <div className="col-md-3">Nome do Produto</div>
                            <div className="col-md-3">Preço Unitário</div>
                            <div className="col-md-3">Quantidade</div>
                            <div className="col-md-3">Pet</div>
                        </div>
                        <div className="row py-3 px-3 border-bottom transition">
                            <div className="col-12 col-md-3 mb-2 mb-md-0">
                                <span className="d-md-none fw-semibold me-2">Nome do Produto: </span>
                                Ração Premium
                            </div>
                            <div className="col-12 col-md-3 mb-2 mb-md-0">
                                <span className="d-md-none fw-semibold me-2">Preço Unitário: </span>
                                R$ 120,00
                            </div>
                            <div className="col-12 col-md-3 mb-2 mb-md-0">
                                <span className="d-md-none fw-semibold me-2">Quantidade: </span>
                                2
                            </div>
                            <div className="col-12 col-md-3">
                                <span className="d-md-none fw-semibold me-2">Pet: </span>
                                Rex
                            </div>
                        </div>
                    </article>

                    <h4 className="mb-3">Serviços</h4>
                    <article className="card">
                        <div className="bg-info bg-opacity-10 rounded p-3 mb-3 fw-semibold d-none d-md-flex row">
                            <div className="col-md-3">Nome do Serviço</div>
                            <div className="col-md-3">Preço Unitário</div>
                            <div className="col-md-3">Quantidade</div>
                            <div className="col-md-3">Pet</div>
                        </div>
                        <div className="row py-3 px-3 border-bottom transition">
                            <div className="col-12 col-md-3 mb-2 mb-md-0">
                                <span className="d-md-none fw-semibold me-2">Nome do Serviço: </span>
                                Banho e Tosa
                            </div>
                            <div className="col-12 col-md-3 mb-2 mb-md-0">
                                <span className="d-md-none fw-semibold me-2">Preço Unitário: </span>
                                R$ 80,00
                            </div>
                            <div className="col-12 col-md-3 mb-2 mb-md-0">
                                <span className="d-md-none fw-semibold me-2">Quantidade: </span>
                                1
                            </div>
                            <div className="col-12 col-md-3">
                                <span className="d-md-none fw-semibold me-2">Pet: </span>
                                Rex
                            </div>
                        </div>
                    </article>
                </section>

                <section className="total-section">
                    <article className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 fw-bold">Total a Pagar:</div>
                                <div className="col-md-9">R$ 320,00</div>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        )
    }
}