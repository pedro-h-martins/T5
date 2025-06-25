import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Pet from "../../modelo/pet";
import Desinscricao from "./desinscricao";

export default class DesinscricaoPet extends Desinscricao {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public desinscrever(): void {
        console.log(`\nInício da desinscrição do pet`)
        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        
        if (cliente) {
            let nomePet = this.entrada.receberTexto(`Por favor, informe o nome do pet: `)
            let pets = cliente.getPets
            let index = pets.findIndex((pet: Pet) => pet.getNome === nomePet)
            
            if (index !== -1) {
                pets.splice(index, 1)
                console.log(`\nPet removido com sucesso\n`)
            } else {
                console.log(`\nPet não é valido!\n`)
            }
        } else {
            console.log(`\nCliente não é valido!\n`)
        }
    }
}
