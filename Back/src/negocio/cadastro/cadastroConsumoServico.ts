import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import Servico from "../../modelo/servico"
import Cadastro from "./cadastro"

export default class CadastroConsumoServico extends Cadastro {
    private clientes: Array<Cliente>
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>, servicos: Array<Servico>) {
        super()
        this.clientes = clientes
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro de consumo de serviço`)
        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        
        if (cliente) {
            let nomeServico = this.entrada.receberTexto(`Por favor, informe o nome do serviço utilizado: `)
            let servico = this.servicos.find(servico => servico.nome === nomeServico)
            
            if (servico) {
                cliente.getServicosConsumidos.push(servico)
                console.log(`\nConsumo de serviço registrado com sucesso\n`)
            } else {
                console.log(`\nServiço não encontrado\n`)
            }
        } else {
            console.log(`\nCliente não encontrado\n`)
        }
    }
}
