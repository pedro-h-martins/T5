import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import Pet from "../../modelo/pet"
import Cadastro from "./cadastro"

export default class CadastroPet extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada;
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do pet`)
        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        if (cliente) {
            let nome = this.entrada.receberTexto(`Por favor, informe o nome do pet: `)
            let tipo = this.entrada.receberTexto(`Digite, o tipo do pet: `)
            let raca = this.entrada.receberTexto(`Digite, a raça do pet: `)
            let genero = this.entrada.receberTexto(`Digite, o gênero do pet (M/F): `)
            let pet = new Pet(nome, raca, genero, tipo);
            cliente.getPets.push(pet);
            console.log(`\nPet cadastrado com sucesso\n`);
        } else {
            console.log(`\nCliente não encontrado\n`);
        }
    }
}
