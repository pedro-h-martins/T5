import Entrada from "../../io/entrada"
import Produto from "../../modelo/produto"
import Atualizacao from "./atualizacao"

export default class AtualizacaoProduto extends Atualizacao {
    private produtos: Array<Produto>
    private entrada: Entrada

    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }

    public atualizar(): void {
        console.log(`\nAtualização de produto`)
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do produto a ser atualizado: `)
        let produto = this.produtos.find(produto => produto.nome === nome)

        if (produto) {
            let novoNome = this.entrada.receberTexto(`Por favor, informe o novo nome do produto: `)
            produto.nome = novoNome
            console.log(`\nAtualização realizada com sucesso\n`)
        } else {
            console.log(`\nProduto não encontrado!\n`)
        }
    }
}