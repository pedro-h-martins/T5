import Cliente from "../../modelo/cliente"
import Servico from "../../modelo/servico"
import Listagem from "./listagem"

export default class ListagemServicosMaisConsumidos extends Listagem {
    private clientes: Array<Cliente>
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listar(): void {
        console.log('\nLista dos serviços mais consumidos:')
        console.log('--------------------------------------')

        const servicosContagem = new Map<string, number>()

        this.clientes.forEach(cliente => {
            cliente.getServicosConsumidos.forEach((servico: Servico) => {
                const count = servicosContagem.get(servico.nome) || 0
                servicosContagem.set(servico.nome, count + 1)
            })
        })

        const servicosOrdenados = Array.from(servicosContagem.entries())
            .sort((a, b) => b[1] - a[1])

        if (servicosOrdenados.length > 0) {
            servicosOrdenados.forEach((servico, index) => {
                console.log((index + 1) + 'º lugar: ' + servico[0])
                console.log('Quantidade de consumos: ' + servico[1])
                console.log('--------------------------------------')
            })
        } else {
            console.log('Nenhum serviço foi consumido ainda')
            console.log('--------------------------------------')
        }

        console.log('\n')
    }
}
