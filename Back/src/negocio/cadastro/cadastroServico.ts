import Entrada from "../../io/entrada"
import Servico from "../../modelo/servico"
import Cadastro from "./cadastro"

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do serviço`)
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do serviço: `)
        let preco = this.entrada.receberNumero(`Por favor, informe o preço do serviço (R$): `)
        let servico = new Servico()
        servico.nome = nome
        servico.valor = preco
        this.servicos.push(servico)
        console.log(`\nCadastro concluído :)\n`)
    }
}