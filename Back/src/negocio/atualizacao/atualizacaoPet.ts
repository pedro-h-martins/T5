import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import Pet from "../../modelo/pet"
import Atualizacao from "./atualizacao"

export default class AtualizacaoPet extends Atualizacao {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public atualizar(): void {
        console.log(`\nAtualização pet`)
        let cpf = this.entrada.receberTexto(`Por favor, digite o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        
        if (!cliente) {
            console.log(`\nCliente não é valido!`)
            return
        }

        let nomePet = this.entrada.receberTexto(`Por favor, informe o nome do pet: `)
        let pet = cliente.getPets.find(pet => pet.getNome === nomePet)
        
        if (!pet) {
            console.log(`\nPet não é valido!`)
            return
        }

        let novoNome = this.entrada.receberTexto(`Por favor, informe o novo nome do pet: `)
        let tipo = this.entrada.receberTexto(`Digite, informe o novo tipo do pet: `)
        let raca = this.entrada.receberTexto(`Digite, informe a nova raça do pet: `)
        let genero = this.entrada.receberTexto(`Digite, informe o novo gênero do pet: `)

        let petAtualizado = new Pet(novoNome, raca, genero, tipo)
        
        const index = cliente.getPets.indexOf(pet)
        cliente.getPets[index] = petAtualizado

        console.log(`\nAtualização foi realizada\n`)
    }
}
