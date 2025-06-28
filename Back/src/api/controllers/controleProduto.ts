import { Request, Response } from 'express';
import Produto from '../../modelo/produto';
import { empresa } from '../server';

export class ControleProduto {
    
    public getAllProdutos = (req: Request, res: Response) => {
        try {
            const produtos = empresa.getProdutos;
            
            const produtosDTO = produtos.map(produto => ({
                id: produto.getId,
                nome: produto.nome,
                valor: produto.valor
            }));
            
            res.status(200).json(produtosDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar produtos', error });
        }
    };

    public getProdutoById = (req: Request, res: Response) => {
        try {
            const produtoId = req.params.id;
            const produto = empresa.getProdutos.find(p => p.getId === produtoId);
            
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            
            const produtoDTO = {
                id: produto.getId,
                nome: produto.nome,
                valor: produto.valor
            };
            
            res.status(200).json(produtoDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar produto', error });
        }
    };

    public createProduto = (req: Request, res: Response) => {
        try {
            const { nome, valor } = req.body;
            
            if (!nome || valor === undefined) {
                return res.status(400).json({ message: 'Nome e valor são obrigatórios' });
            }
            
            if (typeof valor !== 'number' || valor <= 0) {
                return res.status(400).json({ message: 'Valor deve ser um número positivo' });
            }
            
            const novoProduto = new Produto(nome, valor);
            empresa.getProdutos.push(novoProduto);
            
            res.status(201).json({
                message: 'Produto cadastrado com sucesso',
                produto: {
                    id: novoProduto.getId,
                    nome: novoProduto.nome,
                    valor: novoProduto.valor
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar produto', error });
        }
    };

    public updateProduto = (req: Request, res: Response) => {
        try {
            const produtoId = req.params.id;
            const { nome, valor } = req.body;
            
            const produtoIndex = empresa.getProdutos.findIndex(p => p.getId === produtoId);
            
            if (produtoIndex === -1) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            
            const produto = empresa.getProdutos[produtoIndex];
            
            if (nome) {
                produto.nome = nome;
            }
            
            if (valor !== undefined && typeof valor === 'number' && valor > 0) {
                produto.valor = valor;
            }
            
            res.status(200).json({
                message: 'Produto atualizado com sucesso',
                produto: {
                    id: produto.getId,
                    nome: produto.nome,
                    valor: produto.valor
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar produto', error });
        }
    };
    
    public deleteProduto = (req: Request, res: Response) => {
        try {
            const produtoId = req.params.id;
            const produtoIndex = empresa.getProdutos.findIndex(p => p.getId === produtoId);
            
            if (produtoIndex === -1) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
        
            empresa.getProdutos.splice(produtoIndex, 1);
            
            empresa.getClientes.forEach(cliente => {
                const consumidosIndex = cliente.getProdutosConsumidos.findIndex(p => p.getId === produtoId);
                if (consumidosIndex !== -1) {
                    cliente.getProdutosConsumidos.splice(consumidosIndex, 1);
                }
            });
            
            res.status(200).json({ message: 'Produto removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover produto', error });
        }
    };
}
