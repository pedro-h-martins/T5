import Entrada from "../../io/entrada"
import Servico from "../../modelo/servico"
import Atualizacao from "./atualizacao"

export default class AtualizacaoServico extends Atualizacao {
    private servicos: Array<Servico>
    private entrada: Entrada

    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }

    public atualizar(): void {
        console.log(`\nAtualização de serviço`)
        let nome = this.entrada.receberTexto(`Por favor, insira o nome do serviço a ser atualizado: `)
        let servico = this.servicos.find(servico => servico.nome === nome)

        if (servico) {
            let novoNome = this.entrada.receberTexto(`Por favor, insira o novo nome do serviço: `)
            servico.nome = novoNome
            console.log(`\nAtualização realizada com sucesso\n`)
        } else {
            console.log(`\nServiço não encontrado!\n`)
        }
    }
}