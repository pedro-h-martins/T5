import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Desinscricao from "./desinscricao";

export default class DesinscricaoCliente extends Desinscricao {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public desinscrever(): void {
        console.log(`\nInício da desinscrição do cliente`)
        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        let index = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpf)
        if (index !== -1) {
            this.clientes.splice(index, 1);
            console.log(`\nCliente removido com sucesso\n`);
        } else {
            console.log(`\nCliente não é válido!\n`);
        }
    }
}
