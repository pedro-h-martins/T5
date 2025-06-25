import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import Produto from "../../modelo/produto"
import Cadastro from "./cadastro"

export default class CadastroConsumoProduto extends Cadastro {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>) {
        super()
        this.clientes = clientes
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro de consumo de produto`)
        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        
        if (cliente) {
            let nomeProduto = this.entrada.receberTexto(`Por favor, informe o nome do produto consumido: `)
            let produto = this.produtos.find(produto => produto.nome === nomeProduto)
            
            if (produto) {
                cliente.getProdutosConsumidos.push(produto)
                console.log(`\nConsumo de produto registrado com sucesso\n`)
            } else {
                console.log(`\nProduto não encontrado\n`)
            }
        } else {
            console.log(`\nCliente não encontrado\n`)
        }
    }
}
