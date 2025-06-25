import { Component, FormEvent, createRef } from "react";

type props = {
    tema: string
}

export default class FormularioCadastroServico extends Component<props> {
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
                        <input type="text" className="form-control" placeholder="Nome do serviço" aria-label="Nome do serviço" aria-describedby="Nome do serviço" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">R$</span>
                        <input type="number" step="0.01" min="0" className="form-control" placeholder="Preço do serviço" aria-label="Preço do serviço" aria-describedby="Preço do serviço" />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}
