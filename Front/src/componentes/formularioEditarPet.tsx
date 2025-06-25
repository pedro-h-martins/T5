import { Component, FormEvent, createRef } from "react";

type props = {
    tema: string
}

export default class FormularioEditaPet extends Component<props> {
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
                    <div className="text-center mb-4">
                        <h4>Digite o CPF do responsável pelo Pet:</h4>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div className="input-group mb-3 w-90">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CPF do responsável"
                                aria-label="CPF do responsável"
                            />
                        </div>
                        <button
                            className="btn btn-outline-secondary"
                            type="submit"
                            style={{ background: tema }}
                        >
                            Buscar
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
