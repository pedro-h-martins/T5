import { Component, FormEvent, createRef } from "react";

type props = {
    tema: string
}

export default class FormularioCadastroCliente extends Component<props> {
    private formRef: React.RefObject<HTMLFormElement>;

    constructor(props: props) {
        super(props);
        this.formRef = createRef();
    }

    handleReset = (e: FormEvent) => {
        e.preventDefault();
        if (this.formRef.current) {
            this.formRef.current.reset();
        }
    }

    render() {
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <form ref={this.formRef} onSubmit={this.handleReset}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="Nome" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="Nome social" />
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="CPF" aria-label="CPF" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-group">
                                <input type="date" className="form-control" placeholder="Data de Emissão CPF" aria-label="Data de Emissão CPF" />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="RG" aria-label="RG" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-group">
                                <input type="date" className="form-control" placeholder="Data de Emissão RG" aria-label="Data de Emissão RG" />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" style={{ background: tema }}>@</span>
                        <input type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="E-mail" />
                    </div>                    
                    <div className="row mb-3">
                        <div className="col-12 col-md-6 mb-3 mb-md-0">
                            <div className="input-group">
                                <input type="tel" className="form-control" placeholder="Telefone 1" aria-label="Telefone 1" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group">
                                <input type="tel" className="form-control" placeholder="Telefone 2" aria-label="Telefone 2" />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}