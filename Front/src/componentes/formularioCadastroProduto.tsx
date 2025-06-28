import { Component, FormEvent, createRef, ChangeEvent } from "react";
import api from "../services/api";
import Notificacao from "./notificacao";

type props = {
    tema: string;
    onProdutoAdicionado?: () => void;
}

type state = {
    nome: string;
    valor: number;
    loading: boolean;
    error: string | null;
    success: string | null;
}

export default class FormularioCadastroProduto extends Component<props, state> {
    private formRef: React.RefObject<HTMLFormElement>;

    constructor(props: props) {
        super(props);
        this.formRef = createRef();
        this.state = {
            nome: '',
            valor: 0,
            loading: false,
            error: null,
            success: null
        };
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: name === 'valor' ? parseFloat(value) : value } as unknown as Pick<state, keyof state>);
    }

    handleReset = (e: FormEvent) => {
        e.preventDefault();
        if (this.formRef.current) {
            this.formRef.current.reset();
        }
        this.setState({
            nome: '',
            valor: 0
        });
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ loading: true, error: null, success: null });

        try {

            const produtoData = {
                nome: this.state.nome,
                valor: this.state.valor
            };

            await api.produto.createProduto(produtoData);

            this.setState({
                loading: false,
                success: "Produto cadastrado com sucesso!"
            });

            if (this.formRef.current) {
                this.formRef.current.reset();

                this.setState({
                    nome: '',
                    valor: 0
                });
            }

            if (this.props.onProdutoAdicionado) {
                this.props.onProdutoAdicionado();
            }
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            this.setState({
                loading: false,
                error: "Erro ao cadastrar produto. Verifique os dados e tente novamente."
            });
        }
    }

    limparNotificacoes = () => {
        this.setState({
            error: null,
            success: null
        });
    }

    render() {
        let tema = this.props.tema;
        const { error, success, loading } = this.state;

        return (
            <div className="container-fluid">
                {error && (
                    <Notificacao
                        mensagem={error}
                        tipo="error"
                        onClose={this.limparNotificacoes}
                    />
                )}

                {success && (
                    <Notificacao
                        mensagem={success}
                        tipo="success"
                        onClose={this.limparNotificacoes}
                    />
                )}

                <form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do produto"
                            name="nome"
                            value={this.state.nome}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">R$</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="form-control"
                            placeholder="Preço do produto"
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }} disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Processando...
                                </>
                            ) : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
