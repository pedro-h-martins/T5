import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Cliente from '../../modelo/cliente';
import CPF from '../../modelo/cpf';
import Pet from '../../modelo/pet';
import Empresa from '../../modelo/empresa';
import Produto from '../../modelo/produto';
import Servico from '../../modelo/servico';

const empresa = new Empresa();

export class ControleCliente {
    
    public getAllClientes = (req: Request, res: Response) => {
        try {
            const clientes = empresa.getClientes;
            const clientesDTO = clientes.map((cliente: Cliente) => ({
                nome: cliente.nome,
                nomeSocial: cliente.nomeSocial,
                cpf: cliente.getCpf.getValor,
                dataCadastro: cliente.getDataCadastro,
                pets: cliente.getPets.map((pet: Pet) => ({
                    nome: pet.getNome,
                    tipo: pet.getTipo,
                    raca: pet.getRaca,
                    genero: pet.getGenero
                }))
            }));
            res.status(200).json(clientesDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar clientes', error });
        }
    };

    public getClienteByCpf = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const cliente = empresa.getClientes.find((c: Cliente) => c.getCpf.getValor === cpfValor);
            
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const clienteDTO = {
                nome: cliente.nome,
                nomeSocial: cliente.nomeSocial,
                cpf: cliente.getCpf.getValor,
                dataCadastro: cliente.getDataCadastro,
                pets: cliente.getPets.map((pet: Pet) => ({
                    nome: pet.getNome,
                    tipo: pet.getTipo,
                    raca: pet.getRaca,
                    genero: pet.getGenero
                }))
            };
            
            res.status(200).json(clienteDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar cliente', error });
        }
    };

    public createCliente = (req: Request, res: Response) => {
        try {
            const { nome, nomeSocial, cpf, dataEmissao } = req.body;
            
            if (!nome || !cpf) {
                return res.status(400).json({ message: 'Nome e CPF são obrigatórios' });
            }
            
            const clienteExists = empresa.getClientes.some((c: Cliente) => c.getCpf.getValor === cpf);
            if (clienteExists) {
                return res.status(409).json({ message: 'Cliente com este CPF já existe' });
            }
            
            let dataCPF = new Date();
            if (dataEmissao) {
                dataCPF = new Date(dataEmissao);
            }
            
            const novoCpf = new CPF(cpf, dataCPF);
            const novoCliente = new Cliente(nome, nomeSocial || nome, novoCpf);
            
            empresa.getClientes.push(novoCliente);
            
            res.status(201).json({
                message: 'Cliente cadastrado com sucesso',
                cliente: {
                    nome: novoCliente.nome,
                    nomeSocial: novoCliente.nomeSocial,
                    cpf: novoCliente.getCpf.getValor
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar cliente', error });
        }
    };

    public updateCliente = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const { nome, nomeSocial } = req.body;
            
            const clienteIndex = empresa.getClientes.findIndex((c: Cliente) => c.getCpf.getValor === cpfValor);
            if (clienteIndex === -1) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const cliente = empresa.getClientes[clienteIndex];  
            
            if (nome) cliente.nome = nome;
            if (nomeSocial) cliente.nomeSocial = nomeSocial;
            
            res.status(200).json({
                message: 'Cliente atualizado com sucesso',
                cliente: {
                    nome: cliente.nome,
                    nomeSocial: cliente.nomeSocial,
                    cpf: cliente.getCpf.getValor
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar cliente', error });
        }
    };
    public deleteCliente = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            
            const clienteIndex = empresa.getClientes.findIndex((c: Cliente) => c.getCpf.getValor === cpfValor);
            if (clienteIndex === -1) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            empresa.getClientes.splice(clienteIndex, 1);        
            
            res.status(200).json({ message: 'Cliente removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover cliente', error });
        }
    };

    public getClientePets = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const cliente = empresa.getClientes.find((c: Cliente) => c.getCpf.getValor === cpfValor);
            
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const pets = cliente.getPets.map((pet: Pet) => ({
                nome: pet.getNome,
                tipo: pet.getTipo,
                raca: pet.getRaca,
                genero: pet.getGenero
            }));
            
            res.status(200).json(pets);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar pets do cliente', error });
        }
    };

    public getClienteProdutos = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const cliente = empresa.getClientes.find((c: Cliente) => c.getCpf.getValor === cpfValor);
            
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const produtos = cliente.getProdutosConsumidos.map((produto: Produto) => ({
                id: produto.getId,
                nome: produto.nome,
                valor: produto.valor
            }));
            
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar produtos do cliente', error });
        }
    };

    public addProdutoToCliente = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const produtoId = req.params.id;
            
            const cliente = empresa.getClientes.find((c: Cliente) => c.getCpf.getValor === cpfValor);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const produto = empresa.getProdutos.find((p: Produto) => p.getId === produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            
            cliente.getProdutosConsumidos.push(produto);
            
            res.status(201).json({
                message: 'Produto adicionado ao cliente com sucesso',
                produto: {
                    id: produto.getId,
                    nome: produto.nome,
                    valor: produto.valor
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar produto ao cliente', error });
        }
    };

    public getClienteServicos = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const cliente = empresa.getClientes.find((c: Cliente) => c.getCpf.getValor === cpfValor);
            
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const servicos = cliente.getServicosConsumidos.map((servico: Servico) => ({
                id: servico.getId,
                nome: servico.nome,
                preco: servico.preco
            }));
            
            res.status(200).json(servicos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar serviços do cliente', error });
        }
    };

    public addServicoToCliente = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const servicoId = req.params.id;
            
            const cliente = empresa.getClientes.find((c: Cliente) => c.getCpf.getValor === cpfValor);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const servico = empresa.getServicos.find((s: Servico) => s.getId === servicoId);
            if (!servico) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }
            
            cliente.getServicosConsumidos.push(servico);
            
            res.status(201).json({
                message: 'Serviço adicionado ao cliente com sucesso',
                servico: {
                    id: servico.getId,
                    nome: servico.nome,
                    preco: servico.preco
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar serviço ao cliente', error });
        }
    };

    public addPetToCliente = (req: Request, res: Response) => {
        try {
            const cpfValor = req.params.cpf;
            const { nome, tipo, raca, genero } = req.body;
            
            if (!nome || !tipo || !raca || !genero) {
                return res.status(400).json({ message: 'Nome, tipo, raça e gênero são obrigatórios' });
            }
            
            const cliente = empresa.getClientes.find((c: Cliente) => c.getCpf.getValor === cpfValor);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const novoPet = new Pet(nome, raca, genero, tipo);
            cliente.getPets.push(novoPet);
            
            res.status(201).json({
                message: 'Pet adicionado ao cliente com sucesso',
                pet: {
                    nome: novoPet.getNome,
                    tipo: novoPet.getTipo,
                    raca: novoPet.getRaca,
                    genero: novoPet.getGenero
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar pet ao cliente', error });
        }
    };
}
