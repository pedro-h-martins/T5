import Entrada from "../../io/entrada"
import Servico from "../../modelo/servico"
import Desinscricao from "./desinscricao"

export default class DesinscricaoServico extends Desinscricao {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public desinscrever(): void {
        console.log(`\nInício da remoção do serviço`)
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do serviço: `)
        let index = this.servicos.findIndex(servico => servico.nome === nome)
        
        if (index !== -1) {
            this.servicos.splice(index, 1)
            console.log(`\nServiço removido com sucesso\n`)
        } else {
            console.log(`\nServiço não encontrado!\n`)
        }
    }
}