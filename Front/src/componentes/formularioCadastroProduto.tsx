import { Component, FormEvent, createRef } from "react";

type props = {
    tema: string
}

export default class FormularioCadastroProduto extends Component<props> {
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
                        <input type="text" className="form-control" placeholder="Nome do produto" aria-label="Nome do produto" aria-describedby="Nome do produto" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">R$</span>
                        <input type="number" step="0.01" min="0" className="form-control" placeholder="Preço do produto" aria-label="Preço do produto" aria-describedby="Preço do produto" />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}
