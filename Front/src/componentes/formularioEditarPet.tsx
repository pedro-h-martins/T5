import { Component, FormEvent, createRef, ChangeEvent } from "react";
import api from "../services/api";
import { Pet } from "../services/types";
import Notificacao from "./notificacao";

type props = {
    tema: string
}

type state = {
    cpfResponsavel: string;
    petSelecionado: Pet | null;
    petsDisponiveis: Pet[];
    nomePet: string;
    tipo: string;
    genero: string;
    raca: string;
    loading: boolean;
    buscando: boolean;
    error: string | null;
    success: string | null;
}

export default class FormularioEditaPet extends Component<props, state> {
    private formRef: React.RefObject<HTMLFormElement>;

    constructor(props: props) {
        super(props);
        this.formRef = createRef();
        this.state = {
            cpfResponsavel: '',
            petSelecionado: null,
            petsDisponiveis: [],
            nomePet: '',
            tipo: '',
            genero: '',
            raca: '',
            loading: false,
            buscando: false,
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
            petSelecionado: null,
            petsDisponiveis: [],
            nomePet: '',
            tipo: '',
            genero: '',
            raca: '',
            error: null,
            success: null
        });
    }

    buscarPets = async (e: FormEvent) => {
        e.preventDefault();
        const { cpfResponsavel } = this.state;

        if (!cpfResponsavel) {
            this.setState({ error: "CPF é obrigatório" });
            return;
        }

        this.setState({ buscando: true, error: null, success: null });

        try {

            const pets = await api.cliente.getClientePets(cpfResponsavel);
            
            if (pets && pets.length > 0) {
                this.setState({ 
                    petsDisponiveis: pets,
                    buscando: false
                });
            } else {
                this.setState({ 
                    error: "Nenhum pet encontrado para este cliente",
                    buscando: false,
                    petsDisponiveis: []
                });
            }
        } catch (error) {
            console.error("Erro ao buscar pets:", error);
            this.setState({
                error: error instanceof Error ? error.message : "Erro ao buscar pets. Verifique o CPF e tente novamente.",
                buscando: false,
                petsDisponiveis: []
            });
        }
    }

    selecionarPet = (pet: Pet) => {
        this.setState({
            petSelecionado: pet,
            nomePet: pet.nome,
            tipo: pet.tipo,
            genero: pet.genero,
            raca: pet.raca || ''
        });
    }

    atualizarPet = async (e: FormEvent) => {
        e.preventDefault();
        const { petSelecionado, nomePet, tipo, genero, raca } = this.state;

        if (!petSelecionado) {
            this.setState({ error: "Selecione um pet para atualizar" });
            return;
        }

        if (!nomePet || !tipo || !genero) {
            this.setState({ error: "Preencha todos os campos obrigatórios" });
            return;
        }

        this.setState({ loading: true, error: null, success: null });

        try {
    
            const petData = {
                nome: nomePet,
                tipo: tipo,
                raca: raca,
                genero: genero
            };

            await api.pet.updatePet(petSelecionado.nome, petData);

            this.setState({
                loading: false,
                success: "Pet atualizado com sucesso!"
            });
        } catch (error) {
            console.error("Erro ao atualizar pet:", error);
            this.setState({
                loading: false,
                error: error instanceof Error ? error.message : "Erro ao atualizar pet. Verifique os dados e tente novamente."
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
        const { error, success, loading, buscando, petsDisponiveis, petSelecionado } = this.state;

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

                {!petSelecionado ? (
                    <>
                        <form ref={this.formRef} onSubmit={this.buscarPets}>
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
                                        name="cpfResponsavel"
                                        value={this.state.cpfResponsavel}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <button
                                    className="btn btn-outline-secondary"
                                    type="submit"
                                    style={{ background: tema }}
                                    disabled={buscando}
                                >
                                    {buscando ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Buscando...
                                        </>
                                    ) : "Buscar"}
                                </button>
                            </div>
                        </form>

                        {petsDisponiveis.length > 0 && (
                            <div className="mt-4">
                                <h5 className="text-center mb-3">Pets encontrados:</h5>
                                <div className="list-group">
                                    {petsDisponiveis.map((pet, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => this.selecionarPet(pet)}
                                        >
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{pet.nome}</h5>
                                                <small>{pet.tipo}</small>
                                            </div>
                                            <p className="mb-1">Raça: {pet.raca || 'Não especificada'}</p>
                                            <small>Gênero: {pet.genero === 'M' ? 'Masculino' : 'Feminino'}</small>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4>Editar Pet: {petSelecionado.nome}</h4>
                            <button 
                                className="btn btn-outline-secondary"
                                onClick={() => this.setState({ petSelecionado: null })}
                            >
                                Voltar
                            </button>
                        </div>
                        
                        <form onSubmit={this.atualizarPet}>
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

                            <div className="d-flex gap-2 mb-3">
                                <button 
                                    className="btn btn-primary" 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Processando...
                                        </>
                                    ) : "Atualizar Pet"}
                                </button>
                                <button 
                                    className="btn btn-secondary" 
                                    type="button" 
                                    onClick={() => this.setState({ petSelecionado: null })}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
