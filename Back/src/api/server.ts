import express from 'express';
import cors from 'cors';
import { rotasCliente } from './routes/rotaCliente';
import { rotasPet } from './routes/rotaPet';
import { rotasProduto } from './routes/rotaProduto';
import { rotasServico } from './routes/rotaServico';
import Empresa from '../modelo/empresa';

const app = express();
const port = 3001;

export const empresa = new Empresa();


app.use(cors());
app.use(express.json());

app.use('/api/clientes', rotasCliente);
app.use('/api/pets', rotasPet);
app.use('/api/produtos', rotasProduto);
app.use('/api/servicos', rotasServico);

app.get('/api/relatorios/top-clientes-produtos', (req, res) => {
  const clientes = empresa.getClientes;
  
  const clientesProdutos = clientes.map(cliente => {
    const produtosConsumidos = cliente.getProdutosConsumidos;
    const totalGasto = produtosConsumidos.reduce((total, produto) => total + produto.valor, 0);
    return {
      nome: cliente.nome,
      cpf: cliente.getCpf.getValor,
      quantidadeProdutos: produtosConsumidos.length,
      valorTotal: totalGasto
    };
  }).sort((a, b) => b.quantidadeProdutos - a.quantidadeProdutos || b.valorTotal - a.valorTotal).slice(0, 10);
  
  res.status(200).json(clientesProdutos);
});

app.get('/api/relatorios/top-clientes-servicos', (req, res) => {
  const clientes = empresa.getClientes;
  
  const clientesServicos = clientes.map(cliente => {
    const servicosConsumidos = cliente.getServicosConsumidos;
    const totalGasto = servicosConsumidos.reduce((total, servico) => total + servico.preco, 0);
    return {
      nome: cliente.nome,
      cpf: cliente.getCpf.getValor,
      quantidadeServicos: servicosConsumidos.length,
      valorTotal: totalGasto
    };
  }).sort((a, b) => b.quantidadeServicos - a.quantidadeServicos || b.valorTotal - a.valorTotal).slice(0, 10);
  
  res.status(200).json(clientesServicos);
});

app.get('/api/relatorios/top-produtos', (req, res) => {
  const clientes = empresa.getClientes;
  const produtosContagem = new Map();
  
  clientes.forEach(cliente => {
    cliente.getProdutosConsumidos.forEach(produto => {
      const contador = produtosContagem.get(produto.getId) || { id: produto.getId, nome: produto.nome, quantidade: 0, valorTotal: 0 };
      contador.quantidade += 1;
      contador.valorTotal += produto.valor;
      produtosContagem.set(produto.getId, contador);
    });
  });
  
  const topProdutos = Array.from(produtosContagem.values())
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 10);
  
  res.status(200).json(topProdutos);
});

app.get('/api/relatorios/top-servicos', (req, res) => {
  const clientes = empresa.getClientes;
  const servicosContagem = new Map();
  
  clientes.forEach(cliente => {
    cliente.getServicosConsumidos.forEach(servico => {
      const contador = servicosContagem.get(servico.getId) || { id: servico.getId, nome: servico.nome, quantidade: 0, valorTotal: 0 };
      contador.quantidade += 1;
      contador.valorTotal += servico.preco;
      servicosContagem.set(servico.getId, contador);
    });
  });
  
  const topServicos = Array.from(servicosContagem.values())
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 10);
  
  res.status(200).json(topServicos);
});

app.get('/api/relatorios/top5-clientes-valor', (req, res) => {
  const clientes = empresa.getClientes;
  
  const clientesGasto = clientes.map(cliente => {
    const gastoProdutos = cliente.getProdutosConsumidos.reduce((total, produto) => total + produto.valor, 0);
    const gastoServicos = cliente.getServicosConsumidos.reduce((total, servico) => total + servico.preco, 0);
    const gastoTotal = gastoProdutos + gastoServicos;
    
    return {
      nome: cliente.nome,
      cpf: cliente.getCpf.getValor,
      quantidadePets: cliente.getPets.length,
      gastoTotal: gastoTotal,
      gastoProdutos: gastoProdutos,
      gastoServicos: gastoServicos
    };
  }).sort((a, b) => b.gastoTotal - a.gastoTotal).slice(0, 5);
  
  res.status(200).json(clientesGasto);
});

app.get('/api/relatorios/produtos-por-pet', (req, res) => {
  const clientes = empresa.getClientes;
  
  const consumosPorPet = new Map<string, Map<string, number>>();

  clientes.forEach(cliente => {
    cliente.getPets.forEach(pet => {
      const petKey = `${pet.getTipo}-${pet.getRaca}`;
      
      cliente.getProdutosConsumidos.forEach(produto => {
        if (!consumosPorPet.has(petKey)) {
          consumosPorPet.set(petKey, new Map<string, number>());
        }
        
        const produtosMap = consumosPorPet.get(petKey)!;
        const count = produtosMap.get(produto.nome) || 0;
        produtosMap.set(produto.nome, count + 1);
      });
    });
  });

  const resultado: Array<{tipo: string, raca: string, produto: string}> = [];

  consumosPorPet.forEach((produtosMap, petKey) => {
    const [tipo, raca] = petKey.split('-');
    
    if (produtosMap.size > 0) {

      const produtoMaisConsumido = Array.from(produtosMap.entries())
        .sort((a, b) => b[1] - a[1])[0];
      
      resultado.push({
        tipo,
        raca,
        produto: produtoMaisConsumido[0]
      });
    }
  });
  
  res.status(200).json(resultado);
});

app.get('/api/relatorios/servicos-por-pet', (req, res) => {
  const clientes = empresa.getClientes;

  const consumosPorPet = new Map<string, Map<string, number>>();

  clientes.forEach(cliente => {

    cliente.getPets.forEach(pet => {
      const petKey = `${pet.getTipo}-${pet.getRaca}`;
      
      cliente.getServicosConsumidos.forEach(servico => {
        if (!consumosPorPet.has(petKey)) {
          consumosPorPet.set(petKey, new Map<string, number>());
        }
        
        const servicosMap = consumosPorPet.get(petKey)!;
        const count = servicosMap.get(servico.nome) || 0;
        servicosMap.set(servico.nome, count + 1);
      });
    });
  });

  const resultado: Array<{tipo: string, raca: string, servico: string}> = [];

  consumosPorPet.forEach((servicosMap, petKey) => {
    const [tipo, raca] = petKey.split('-');
    
    if (servicosMap.size > 0) {
    
      const servicoMaisConsumido = Array.from(servicosMap.entries())
        .sort((a, b) => b[1] - a[1])[0];
      
      resultado.push({
        tipo,
        raca,
        servico: servicoMaisConsumido[0]
      });
    }
  });
  
  res.status(200).json(resultado);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

app.listen(port, () => {
  console.log(`C4P API Server running at http://localhost:${port}`);
});
