import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import Produto from "../../modelo/produto"
import Listagem from "./listagem"

export default class ListagemConsumoProdutos extends Listagem {
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
            console.log(`\nLista de produtos consumidos:`)
            console.log(`\nCliente: ${cliente.nome}`)
            console.log(`CPF: ${cliente.getCpf.getValor}`)
            if (cliente.getProdutosConsumidos.length > 0) {
                console.log(`Produtos consumidos:`)
                cliente.getProdutosConsumidos.forEach((produto: Produto) => {
                    console.log(`- ${produto.nome}`)
                })
            } else {
                console.log(`Nenhum produto consumido`)
            }
            console.log(`--------------------------------------`)
        } else {
            console.log(`\nCliente não encontrado\n`)
        }
        console.log(`\n`)
    }
}
