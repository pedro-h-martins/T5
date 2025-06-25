import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cadastro/cadastroCliente";
import ListagemClientes from "../negocio/listagem/listagemClientes";
import AtualizacaoCliente from "../negocio/atualizacao/atualizacaoCliente";
import DesinscricaoCliente from "../negocio/desinscricao/desinscricaoCliente";
import CadastroPet from "../negocio/cadastro/cadastroPet";
import ListagemPets from "../negocio/listagem/listagemPets";
import AtualizacaoPets from "../negocio/atualizacao/atualizacaoPet";
import DesinscricaoPet from "../negocio/desinscricao/desinscricaoPet";
import CadastroProduto from "../negocio/cadastro/cadastroProduto";
import ListagemProdutos from "../negocio/listagem/listagemProdutos";
import AtualizacaoProduto from "../negocio/atualizacao/atualizacaoProduto";
import DesinscricaoProduto from "../negocio/desinscricao/desinscricaoProduto";
import CadastroServico from "../negocio/cadastro/cadastroServico";
import ListagemServicos from "../negocio/listagem/listagemServicos";
import AtualizacaoServico from "../negocio/atualizacao/atualizacaoServico";
import DesinscricaoServico from "../negocio/desinscricao/desinscricaoServico";
import CadastroConsumoProduto from "../negocio/cadastro/cadastroConsumoProduto";
import CadastroConsumoServico from "../negocio/cadastro/cadastroConsumoServico";
import ListagemConsumoProdutos from "../negocio/listagem/listagemConsumoProdutos";
import ListagemConsumoServicos from "../negocio/listagem/listagemConsumoServicos";
import ListagemTop10ClientesProdutos from "../negocio/listagem/listagemTop10ClientesProdutos";
import ListagemTop10ClientesServicos from "../negocio/listagem/listagemTop10ClientesServicos";
import ListagemProdutosMaisConsumidos from "../negocio/listagem/listagemProdutosMaisConsumidos";
import ListagemServicosMaisConsumidos from "../negocio/listagem/listagemServicosMaisConsumidos";
import ListagemProdutosPet from "../negocio/listagem/listagemProdutosPet";
import ListagemServicosPet from "../negocio/listagem/listagemServicosPet";
import ListagemTop5ClientesValor from "../negocio/listagem/listagemTop5ClientesValor";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinárias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`\nCliente:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Atualizar cliente`);
    console.log(`4 - Desinscrever cliente`);
    console.log(`--------------------------------------`);
    console.log(`Pet:`);
    console.log(`5 - Cadastrar pet`);
    console.log(`6 - Listar todos os pets`);
    console.log(`7 - Atualizar pet`);
    console.log(`8 - Desinscrever pet`);
    console.log(`--------------------------------------`);
    console.log(`Produto:`);
    console.log(`9 - Cadastrar produto`);
    console.log(`10 - Listar todos os produtos`);
    console.log(`11 - Atualizar produto`);
    console.log(`12 - Remover produto`);
    console.log(`13 - Listar produtos mais consumidos`);
    console.log(`--------------------------------------`);
    console.log(`Serviço:`);
    console.log(`14 - Cadastrar serviço`);
    console.log(`15 - Listar todos os serviços`);
    console.log(`16 - Atualizar serviço`);
    console.log(`17 - Remover serviço`);
    console.log(`18 - Listar serviços mais consumidos`);
    console.log(`--------------------------------------`);
    console.log(`Consumo Produto ou Serviço:`);
    console.log(`19 - Registrar consumo de produto`);
    console.log(`20 - Registrar consumo de serviço`);
    console.log(`21 - Listar consumo de produtos`);
    console.log(`22 - Listar consumo de serviços`);
    console.log(`23 - Top 10 clientes por consumo de produtos`);
    console.log(`24 - Top 10 clientes por consumo de serviços`);
    console.log(`25 - Listar produtos mais consumidos por tipo e raça do pet`);
    console.log(`26 - Listar serviços mais consumidos por tipo e raça do pet`);
    console.log(`27 - Top 5 clientes por valor consumido`);
    console.log(`\n`);
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastroC = new CadastroCliente(empresa.getClientes)
            cadastroC.cadastrar()
            break;
        case 2:
            let listagemC = new ListagemClientes(empresa.getClientes)
            listagemC.listar()
            break;
        case 3:
            let atualizacaoC = new AtualizacaoCliente(empresa.getClientes)
            atualizacaoC.atualizar()
            break;
        case 4:
            let desinscricaoC = new DesinscricaoCliente(empresa.getClientes)
            desinscricaoC.desinscrever()
            break;
        case 5:
            let cadastroP = new CadastroPet(empresa.getClientes)
            cadastroP.cadastrar()
            break;
        case 6:
            let listagemP = new ListagemPets(empresa.getClientes)
            listagemP.listar()
            break;
        case 7:
            let atualizacaoP = new AtualizacaoPets(empresa.getClientes)
            atualizacaoP.atualizar()
            break;
        case 8:
            let desinscricaoP = new DesinscricaoPet(empresa.getClientes)
            desinscricaoP.desinscrever()
            break;
        case 9:
            let cadastroPr = new CadastroProduto(empresa.getProdutos)
            cadastroPr.cadastrar()
            break;
        case 10:
            let listagemPr = new ListagemProdutos(empresa.getProdutos)
            listagemPr.listar()
            break;
        case 11:
            let atualizacaoPr = new AtualizacaoProduto(empresa.getProdutos)
            atualizacaoPr.atualizar()
            break;
        case 12:
            let desinscricaoPr = new DesinscricaoProduto(empresa.getProdutos)
            desinscricaoPr.desinscrever()
            break;
        case 13:
            let listagemPrC = new ListagemProdutosMaisConsumidos(empresa.getClientes)
            listagemPrC.listar()
            break;
        case 14:
            let cadastroS = new CadastroServico(empresa.getServicos)
            cadastroS.cadastrar()
            break;
        case 15:
            let listagemS = new ListagemServicos(empresa.getServicos)
            listagemS.listar()
            break;
        case 16:
            let atualizacaoS = new AtualizacaoServico(empresa.getServicos)
            atualizacaoS.atualizar()
            break;
        case 17:
            let desinscricaoS = new DesinscricaoServico(empresa.getServicos)
            desinscricaoS.desinscrever()
            break;
        case 18:
            let listagemSC = new ListagemServicosMaisConsumidos(empresa.getClientes)
            listagemSC.listar()
            break;
        case 19:
            let cadastroConsumoP = new CadastroConsumoProduto(empresa.getClientes, empresa.getProdutos)
            cadastroConsumoP.cadastrar()
            break;
        case 20:
            let cadastroConsumoS = new CadastroConsumoServico(empresa.getClientes, empresa.getServicos)
            cadastroConsumoS.cadastrar()
            break;
        case 21:
            let listagemConsumoP = new ListagemConsumoProdutos(empresa.getClientes)
            listagemConsumoP.listar()
            break;
        case 22:
            let listagemConsumoS = new ListagemConsumoServicos(empresa.getClientes)
            listagemConsumoS.listar()
            break;
        case 23:
            let listagemCTop10P = new ListagemTop10ClientesProdutos(empresa.getClientes)
            listagemCTop10P.listar()
            break;
        case 24:
            let listagemCTop10S = new ListagemTop10ClientesServicos(empresa.getClientes)
            listagemCTop10S.listar()
            break;
        case 25:
            let listagemProdutosPorPet = new ListagemProdutosPet(empresa.getClientes)
            listagemProdutosPorPet.listar()
            break;
        case 26:
            let listagemServicosPorPet = new ListagemServicosPet(empresa.getClientes)
            listagemServicosPorPet.listar()
            break;
        case 27:
            let listagemT5CV = new ListagemTop5ClientesValor(empresa.getClientes)
            listagemT5CV.listar()
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida!`)
    }
}