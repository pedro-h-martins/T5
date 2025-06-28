import { Component, FormEvent, createRef, ChangeEvent } from "react";
import api from "../services/api";
import Notificacao from "./notificacao";

type props = {
    tema: string;
    onPetAdicionado?: () => void;
}

type state = {
    cpfResponsavel: string;
    nomePet: string;
    tipo: string;
    genero: string;
    raca: string;
    loading: boolean;
    error: string | null;
    success: string | null;
}

export default class FormularioCadastroPet extends Component<props, state> {
    private formRef: React.RefObject<HTMLFormElement>;

    constructor(props: props) {
        super(props);
        this.formRef = createRef();
        this.state = {
            cpfResponsavel: '',
            nomePet: '',
            tipo: '',
            genero: '',
            raca: '',
            loading: false,
            error: null,
            success: null
        };
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value } as unknown as Pick<state, keyof state>);
    }

    handleReset = (e: FormEvent) => {
        e.preventDefault();
        if (this.formRef.current) {
            this.formRef.current.reset();
        }
        this.setState({
            cpfResponsavel: '',
            nomePet: '',
            tipo: '',
            genero: '',
            raca: ''
        });
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ loading: true, error: null, success: null });

        try {
            const { cpfResponsavel, nomePet, tipo, genero, raca } = this.state;

            if (!cpfResponsavel || !nomePet || !tipo || !genero) {
                throw new Error("Preencha todos os campos obrigatórios");
            }

            const petData = {
                nome: nomePet,
                tipo: tipo,
                raca: raca,
                genero: genero
            };

            await api.cliente.addPetToCliente(cpfResponsavel, petData);

            this.setState({
                loading: false,
                success: "Pet cadastrado com sucesso!"
            });

            if (this.formRef.current) {
                this.formRef.current.reset();
                this.setState({
                    cpfResponsavel: '',
                    nomePet: '',
                    tipo: '',
                    genero: '',
                    raca: ''
                });
            }

            if (this.props.onPetAdicionado) {
                this.props.onPetAdicionado();
            }
        } catch (error) {
            console.error("Erro ao cadastrar pet:", error);
            this.setState({
                loading: false,
                error: error instanceof Error ? error.message : "Erro ao cadastrar pet. Verifique os dados e tente novamente."
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
                            placeholder="CPF do Responsável" 
                            name="cpfResponsavel"
                            value={this.state.cpfResponsavel}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nome do Pet" 
                            name="nomePet"
                            value={this.state.nomePet}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>                    
                    <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
                        <div className="col-12 col-md-4">
                            <div className="p-2">
                                <label className="form-label">Tipo do Pet</label>
                                <select 
                                    className="form-select" 
                                    aria-label="Tipo do Pet"
                                    name="tipo"
                                    value={this.state.tipo}
                                    onChange={this.handleInputChange}
                                    required
                                >
                                    <option value="">Selecione o tipo do pet</option>
                                    <option value="cachorro">Cachorro</option>
                                    <option value="gato">Gato</option>
                                    <option value="passaro">Pássarinho</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="p-2">
                                <label className="form-label">Gênero do Pet</label>
                                <div className="d-flex gap-4">
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="genero" 
                                            id="generoM" 
                                            value="M"
                                            checked={this.state.genero === 'M'}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="generoM">
                                            Masculino
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="genero" 
                                            id="generoF" 
                                            value="F"
                                            checked={this.state.genero === 'F'}
                                            onChange={this.handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="generoF">
                                            Feminino
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Raça do Pet" 
                            name="raca"
                            value={this.state.raca}
                            onChange={this.handleInputChange}
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
