import Cliente from "../../modelo/cliente"
import Produto from "../../modelo/produto"
import Listagem from "./listagem"

export default class ListagemProdutosMaisConsumidos extends Listagem {
    private clientes: Array<Cliente>
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listar(): void {
        console.log(`\nLista dos produtos mais consumidos:`)
        console.log(`--------------------------------------`)

        const produtosContagem = new Map<string, number>()

        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach((produto: Produto) => {
                const count = produtosContagem.get(produto.nome) || 0
                produtosContagem.set(produto.nome, count + 1)
            })
        })

        const produtosOrdenados = Array.from(produtosContagem.entries())
            .sort((a, b) => b[1] - a[1])

        if (produtosOrdenados.length > 0) {
            produtosOrdenados.forEach((produto, index) => {
                console.log((index + 1) + 'º lugar: ' + produto[0])
                console.log('Quantidade de consumos: ' + produto[1])
                console.log('--------------------------------------')
            })
        } else {
            console.log('Nenhum produto foi consumido ainda')
            console.log('--------------------------------------')
        }

        console.log('\n')
    }
}
