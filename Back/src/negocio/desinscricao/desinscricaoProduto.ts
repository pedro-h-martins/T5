import Entrada from "../../io/entrada"
import Produto from "../../modelo/produto"
import Desinscricao from "./desinscricao"

export default class DesinscricaoProduto extends Desinscricao {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public desinscrever(): void {
        console.log(`\nInício da remoção do produto`)
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do produto: `)
        let index = this.produtos.findIndex(produto => produto.nome === nome)
        
        if (index !== -1) {
            this.produtos.splice(index, 1)
            console.log(`\nProduto removido com sucesso\n`)
        } else {
            console.log(`\nProduto não encontrado!\n`)
        }
    }
}