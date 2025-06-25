import Cliente from "../../modelo/cliente"
import Pet from "../../modelo/pet"
import Produto from "../../modelo/produto"
import Listagem from "./listagem"

export default class ListagemProdutosPet extends Listagem {
    private clientes: Array<Cliente>
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listar(): void {
        console.log('\nLista dos produtos consumidos por tipo e raça de pet:')
        console.log('--------------------------------------')

        const consumosPorPet = new Map<string, Map<string, number>>()

        this.clientes.forEach(cliente => {
            cliente.getPets.forEach((pet: Pet) => {
                const petKey = pet.getTipo + '-' + pet.getRaca
                
                cliente.getProdutosConsumidos.forEach((produto: Produto) => {
                    if (!consumosPorPet.has(petKey)) {
                        consumosPorPet.set(petKey, new Map<string, number>())
                    }
                    
                    const produtosMap = consumosPorPet.get(petKey)!
                    const count = produtosMap.get(produto.nome) || 0
                    produtosMap.set(produto.nome, count + 1)
                })
            })
        })

        if (consumosPorPet.size > 0) {
            consumosPorPet.forEach((produtosMap, petKey) => {
                const [tipo, raca] = petKey.split('-')
                console.log('\nPet Tipo: ' + tipo + ', Raça: ' + raca)
                console.log('--------------------------------------')

                const produtosOrdenados = Array.from(produtosMap.entries())
                    .sort((a, b) => b[1] - a[1])

                if (produtosOrdenados.length > 0) {
                    produtosOrdenados.forEach((produto, index) => {
                        console.log((index + 1) + 'º lugar: ' + produto[0])
                        console.log('Quantidade de consumos: ' + produto[1])
                    })
                } else {
                    console.log('Nenhum produto consumido para este tipo/raça de pet')
                }
            })
        } else {
            console.log('Nenhum consumo de produtos registrado para pets')
        }

        console.log('\n')
    }
}
