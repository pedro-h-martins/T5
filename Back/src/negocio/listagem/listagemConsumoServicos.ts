import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import Servico from "../../modelo/servico"
import Listagem from "./listagem"

export default class ListagemConsumoServicos extends Listagem {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public listar(): void {
        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        
        if (cliente) {
            console.log(`\nLista de serviços consumidos:`)
            console.log(`\nCliente: ${cliente.nome}`)
            console.log(`CPF: ${cliente.getCpf.getValor}`)
            if (cliente.getServicosConsumidos.length > 0) {
                console.log(`Serviços utilizados:`)
                cliente.getServicosConsumidos.forEach((servico: Servico) => {
                    console.log(`- ${servico.nome}`)
                })
            } else {
                console.log(`Nenhum serviço utilizado`)
            }
            console.log(`--------------------------------------`)
        } else {
            console.log(`\nCliente não encontrado\n`)
        }
        console.log(`\n`)
    }
}
