import Cliente from "../../modelo/cliente"
import Listagem from "./listagem"

export default class ListagemTop10ClientesProdutos extends Listagem {
    private clientes: Array<Cliente>
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listar(): void {
        console.log('\nLista dos 10 clientes que mais consumiram produtos:')
        console.log('--------------------------------------')

        const clientesComConsumo = this.clientes.map(cliente => ({
            nome: cliente.nome,
            cpf: cliente.getCpf.getValor,
            quantidade: cliente.getProdutosConsumidos.length
        }))

        clientesComConsumo.sort((a, b) => b.quantidade - a.quantidade)

        const top10 = clientesComConsumo.slice(0, 10)

        top10.forEach((cliente, index) => {
            console.log((index + 1) + 'º lugar:')
            console.log('Nome: ' + cliente.nome)
            console.log('CPF: ' + cliente.cpf)
            console.log('Quantidade de produtos consumidos: ' + cliente.quantidade)
            console.log('--------------------------------------')
        })

        console.log('\n')
    }
}
