import Cliente from "../../modelo/cliente"
import Pet from "../../modelo/pet"
import Listagem from "./listagem"

export default class ListagemPets extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log('\nLista de todos os pets:')
        this.clientes.forEach(cliente => {
            console.log('Cliente: ' + cliente.nome)
            if (cliente.getPets.length > 0) {
                cliente.getPets.forEach((pet: Pet) => {
                    console.log('\tNome do pet: ' + pet.getNome)
                    console.log('\tTipo: ' + pet.getTipo)
                    console.log('\tRaça: ' + pet.getRaca)
                    console.log('\tGênero: ' + pet.getGenero)
                    console.log('\t--------------------------------------')
                });
            } else {
                console.log('\tNenhum pet cadastrado')
                console.log('\t--------------------------------------')
            }
        });
        console.log('\n')
    }
}
