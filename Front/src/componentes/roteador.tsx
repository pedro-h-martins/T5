import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroPet from "./formularioCadastroPet";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import FormularioCadastroServico from "./formularioCadastroServico";
import FormularioEditaPet from "./formularioEditarPet";
import TabelaProdutosServicosMaisConsumidos from "./tabelaProdutosServicosMaisConsumidos";
import TabelaPagamentoCliente from "./tabelaPagamentoCliente";
import ListaProdutos from "./listaProdutos";
import ListaServico from "./listaServicos";
import BotoesCadastro from "./botoesCadastro";
import ListaTopClientes from "./listaTopClientes";
import BotaoTopClientes from "./botaoTopClientes";

type state = {
    tela: string,
    clienteSelecionadoCpf: string | null
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes',
            clienteSelecionadoCpf: null
        }
        this.selecionarView = this.selecionarView.bind(this)
        this.selecionarCliente = this.selecionarCliente.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    selecionarCliente(cpf: string) {
        this.setState({
            clienteSelecionadoCpf: cpf
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" botoes={['Clientes', 'Produtos', 'Serviços', 'Cadastros']} />
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente 
                        tema="#e3f2fd" 
                        seletorView={this.selecionarView}
                        seletorCliente={this.selecionarCliente} 
                    />
                </>
            )
        } else if (this.state.tela === 'Editar Pet') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioEditaPet tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Produtos e Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <TabelaProdutosServicosMaisConsumidos tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Pagamento do Cliente') {
            if (!this.state.clienteSelecionadoCpf) {
                return (
                    <>
                        {barraNavegacao}
                        <div className="container mt-4 text-center">
                            <div className="alert alert-warning">
                                <h4>Nenhum cliente selecionado</h4>
                                <p>Por favor, selecione um cliente para visualizar seus pagamentos.</p>
                            </div>
                            <button 
                                className="btn btn-primary mt-2" 
                                onClick={(e) => this.selecionarView('Clientes', e as unknown as Event)}
                            >
                                Voltar para Lista de Clientes
                            </button>
                        </div>
                    </>
                )
            }
            
            return (
                <>
                    {barraNavegacao}
                    <TabelaPagamentoCliente 
                        tema="#e3f2fd" 
                        clienteCpf={this.state.clienteSelecionadoCpf} 
                    />
                </>
            )
        } else if (this.state.tela === 'Top Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <BotaoTopClientes seletorView={this.selecionarView} viewAtual="Top Clientes" />
                    <ListaTopClientes tema="#e3f2fd" seletorView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutos tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaServico tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Cadastros' || this.state.tela === 'Cadastrar Cliente') {
            return (
                <>
                    {barraNavegacao}
                    <BotoesCadastro tema="#e3f2fd" seletorView={this.selecionarView} telaAtiva={this.state.tela === 'Cadastros' ? 'Cadastrar Cliente' : this.state.tela} />
                    <FormularioCadastroCliente tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Pet') {
            return (
                <>
                    {barraNavegacao}
                    <BotoesCadastro tema="#e3f2fd" seletorView={this.selecionarView} telaAtiva={this.state.tela} />
                    <FormularioCadastroPet tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Produto') {
            return (
                <>
                    {barraNavegacao}
                    <BotoesCadastro tema="#e3f2fd" seletorView={this.selecionarView} telaAtiva={this.state.tela} />
                    <FormularioCadastroProduto tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Serviço') {
            return (
                <>
                    {barraNavegacao}
                    <BotoesCadastro tema="#e3f2fd" seletorView={this.selecionarView} telaAtiva={this.state.tela} />
                    <FormularioCadastroServico tema="#e3f2fd" />
                </>
            )
        } else {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="#e3f2fd" />
                </>
            )
        }
    }
}