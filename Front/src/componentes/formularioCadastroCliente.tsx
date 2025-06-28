import { Component, FormEvent, createRef, ChangeEvent } from "react";
import api from "../services/api";
import Notificacao from "./notificacao";

type props = {
    tema: string;
    onClienteAdicionado?: () => void;
}

type state = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataCpf: string;
    rg: string;
    dataRg: string;
    telefone1: string;
    telefone2: string;
    loading: boolean;
    error: string | null;
    success: string | null;
}

export default class FormularioCadastroCliente extends Component<props, state> {
    private formRef: React.RefObject<HTMLFormElement>;

    constructor(props: props) {
        super(props);
        this.formRef = createRef();
        this.state = {
            nome: '',
            nomeSocial: '',
            cpf: '',
            dataCpf: '',
            rg: '',
            dataRg: '',
            telefone1: '',
            telefone2: '',
            loading: false,
            error: null,
            success: null
        };
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value } as unknown as Pick<state, keyof state>);
    }

    handleReset = (e: FormEvent) => {
        e.preventDefault();
        if (this.formRef.current) {
            this.formRef.current.reset();
        }
    }

    processarNumeroTelefone(numero: string) {
        const apenasNumeros = numero.replace(/\D/g, '');

        if (apenasNumeros.length < 10) {
            console.warn("Formato de telefone inválido:", numero);
            return null;
        }

        const ddd = apenasNumeros.substring(0, 2);
        const numeroSemDDD = apenasNumeros.substring(2);

        return { ddd, numero: numeroSemDDD };
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ loading: true, error: null, success: null });

        try {

            const clienteData = {
                nome: this.state.nome,
                nomeSocial: this.state.nomeSocial,
                cpf: this.state.cpf,
                dataEmissao: this.state.dataCpf
            };
            const response = await api.cliente.createCliente(clienteData);

            if (response && response.cliente && response.cliente.cpf) {

                if (this.state.rg && this.state.dataRg) {
                    try {

                        console.log("RG pronto para ser adicionado", this.state.rg, this.state.dataRg);
                    } catch (rgError) {
                        console.warn("Erro ao adicionar RG:", rgError);
                    }
                }

                if (this.state.telefone1) {
                    try {

                        const telefone = this.processarNumeroTelefone(this.state.telefone1);
                        if (telefone) {
                            await api.cliente.addTelefoneToCliente(response.cliente.cpf, telefone);
                            console.log("Telefone 1 adicionado com sucesso:", telefone);
                        } else {
                            console.warn("Telefone 1 em formato inválido, pulando:", this.state.telefone1);
                        }
                    } catch (telError) {
                        console.warn("Erro ao adicionar telefone 1:", telError);
                    }
                }

                if (this.state.telefone2) {
                    try {

                        const telefone = this.processarNumeroTelefone(this.state.telefone2);
                        if (telefone) {
                            await api.cliente.addTelefoneToCliente(response.cliente.cpf, telefone);
                            console.log("Telefone 2 adicionado com sucesso:", telefone);
                        } else {
                            console.warn("Telefone 2 em formato inválido, pulando:", this.state.telefone2);
                        }
                    } catch (telError) {
                        console.warn("Erro ao adicionar telefone 2:", telError);
                    }
                }
            }

            this.setState({
                loading: false,
                success: "Cliente cadastrado com sucesso!"
            });

            if (this.formRef.current) {
                this.formRef.current.reset();

                this.setState({
                    nome: '',
                    nomeSocial: '',
                    cpf: '',
                    dataCpf: '',
                    rg: '',
                    dataRg: '',
                    telefone1: '',
                    telefone2: ''
                });
            }

            if (this.props.onClienteAdicionado) {
                this.props.onClienteAdicionado();
            }
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            let errorMessage = "Erro ao cadastrar cliente. Verifique os dados e tente novamente.";

            if (error instanceof Error && error.message.includes('CPF já existe')) {
                errorMessage = "Um cliente com este CPF já está cadastrado no sistema.";
            }

            this.setState({
                loading: false,
                error: errorMessage
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
        let tema = this.props.tema
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
                        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="Nome" name="nome" value={this.state.nome} onChange={this.handleInputChange} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome social (opcional)" aria-label="Nome social" aria-describedby="Nome social" name="nomeSocial" value={this.state.nomeSocial} onChange={this.handleInputChange} />
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="CPF" aria-label="CPF" name="cpf" value={this.state.cpf} onChange={this.handleInputChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-group">
                                <input type="date" className="form-control" placeholder="Data de Emissão CPF" aria-label="Data de Emissão CPF" name="dataCpf" value={this.state.dataCpf} onChange={this.handleInputChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="RG" aria-label="RG" name="rg" value={this.state.rg} onChange={this.handleInputChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-group">
                                <input type="date" className="form-control" placeholder="Data de Emissão RG" aria-label="Data de Emissão RG" name="dataRg" value={this.state.dataRg} onChange={this.handleInputChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" style={{ background: tema }}>@</span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="E-mail (opcional)"
                            aria-label="E-mail"
                            aria-describedby="E-mail"
                            name="email"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Insira um endereço de e-mail válido (exemplo@dominio.com)"
                        />
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="input-group">
                                <span className="input-group-text">Telefone 1</span>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="(99) 99999-9999"
                                    aria-label="Telefone principal"
                                    name="telefone1"
                                    value={this.state.telefone1}
                                    onChange={this.handleInputChange}
                                    pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}|\d{10,11}"
                                    title="Digite um telefone no formato (99) 99999-9999 ou apenas dígitos"
                                    required
                                />
                            </div>
                            <small className="text-muted">Formato: (99) 99999-9999</small>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text">Telefone 2</span>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="(99) 99999-9999"
                                    aria-label="Telefone secundário"
                                    name="telefone2"
                                    value={this.state.telefone2}
                                    onChange={this.handleInputChange}
                                    pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}|\d{10,11}"
                                    title="Digite um telefone no formato (99) 99999-9999 ou apenas dígitos"
                                />
                            </div>
                            <small className="text-muted">Formato: (99) 99999-9999 (opcional)</small>
                        </div>
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