import Cliente from "../../modelo/cliente"
import Produto from "../../modelo/produto"
import Servico from "../../modelo/servico"
import Listagem from "./listagem"

export default class ListagemTop5ClientesValor extends Listagem {
    private clientes: Array<Cliente>
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listar(): void {
        console.log(`\nLista dos 5 clientes que mais consumiram em valor (R$):`)
        console.log(`--------------------------------------`)

        const clientesComValor = this.clientes.map(cliente => {
            const valorProdutos = cliente.getProdutosConsumidos.reduce((total: number, produto: Produto) => total + produto.valor, 0)
            const valorServicos = cliente.getServicosConsumidos.reduce((total: number, servico: Servico) => total + servico.preco, 0)
            const valorTotal = valorProdutos + valorServicos

            return {
                nome: cliente.nome,
                cpf: cliente.getCpf.getValor,
                valorTotal: valorTotal,
                valorProdutos: valorProdutos,
                valorServicos: valorServicos
            }
        })

        clientesComValor.sort((a, b) => b.valorTotal - a.valorTotal)

        const top5 = clientesComValor.slice(0, 5)

        top5.forEach((cliente, index) => {
            console.log((index + 1) + 'º lugar:')
            console.log('Nome: ' + cliente.nome)
            console.log('CPF: ' + cliente.cpf)
            console.log('Valor total consumido: R$ ' + cliente.valorTotal.toFixed(2))
            console.log('Valor em produtos: R$ ' + cliente.valorProdutos.toFixed(2))
            console.log('Valor em serviços: R$ ' + cliente.valorServicos.toFixed(2))
            console.log('--------------------------------------')
        })

        console.log('\n')
    }
}
