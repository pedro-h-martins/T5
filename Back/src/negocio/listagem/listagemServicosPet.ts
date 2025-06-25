import Cliente from "../../modelo/cliente"
import Listagem from "./listagem"

export default class ListagemServicosPet extends Listagem {
    private clientes: Array<Cliente>
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listar(): void {
        console.log('\nLista dos serviços consumidos por tipo e raça de pet:')
        console.log('--------------------------------------')

        const consumosPorPet = new Map<string, Map<string, number>>()

        this.clientes.forEach(cliente => {
            cliente.getPets.forEach(pet => {
                const petKey = pet.getTipo + '-' + pet.getRaca
                
                cliente.getServicosConsumidos.forEach(servico => {
                    if (!consumosPorPet.has(petKey)) {
                        consumosPorPet.set(petKey, new Map<string, number>())
                    }
                    
                    const servicosMap = consumosPorPet.get(petKey)!
                    const count = servicosMap.get(servico.nome) || 0
                    servicosMap.set(servico.nome, count + 1)
                })
            })
        })

        if (consumosPorPet.size > 0) {
            consumosPorPet.forEach((servicosMap, petKey) => {
                const [tipo, raca] = petKey.split('-')
                console.log('\nPet Tipo: ' + tipo + ', Raça: ' + raca)
                console.log('--------------------------------------')

                const servicosOrdenados = Array.from(servicosMap.entries())
                    .sort((a, b) => b[1] - a[1])

                if (servicosOrdenados.length > 0) {
                    servicosOrdenados.forEach((servico, index) => {
                        console.log((index + 1) + 'º lugar: ' + servico[0])
                        console.log('Quantidade de consumos: ' + servico[1])
                    })
                } else {
                    console.log('Nenhum serviço consumido para este tipo/raça de pet')
                }
            })
        } else {
            console.log('Nenhum consumo de serviços registrado para pets')
        }

        console.log('\n')
    }
}
