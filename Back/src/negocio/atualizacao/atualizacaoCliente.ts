import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Atualizacao from "./atualizacao";

export default class AtualizacaoCliente extends Atualizacao {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nAtualizar cliente`);
        let cpf = this.entrada.receberTexto(`Por favor, digite o CPF do cliente: `);
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);

        if (cliente) {
            let nome = this.entrada.receberTexto(`Por favor, digite o novo nome do cliente: `);
            let nomeSocial = this.entrada.receberTexto(`Por favor, digite o novo nome social: `);
            
            cliente.nome = nome;
            cliente.nomeSocial = nomeSocial;
            console.log(`\nAtualização foi realizada\n`);
        } else {
            console.log(`\nCliente não é valido!\n`);
        }
    }
}
