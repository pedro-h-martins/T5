import { Request, Response } from 'express';
import Servico from '../../modelo/servico';
import { empresa } from '../server';

export class ControleServico {
    
    public getAllServicos = (req: Request, res: Response) => {
        try {
            const servicos = empresa.getServicos;
            
            const servicosDTO = servicos.map(servico => ({
                id: servico.getId,
                nome: servico.nome,
                preco: servico.preco
            }));
            
            res.status(200).json(servicosDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar serviços', error });
        }
    };

    public getServicoById = (req: Request, res: Response) => {
        try {
            const servicoId = req.params.id;
            const servico = empresa.getServicos.find(s => s.getId === servicoId);
            
            if (!servico) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }
            
            const servicoDTO = {
                id: servico.getId,
                nome: servico.nome,
                preco: servico.preco
            };
            
            res.status(200).json(servicoDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar serviço', error });
        }
    };

    public createServico = (req: Request, res: Response) => {
        try {
            const { nome, preco } = req.body;
            
            if (!nome || preco === undefined) {
                return res.status(400).json({ message: 'Nome e preço são obrigatórios' });
            }
            
            if (typeof preco !== 'number' || preco <= 0) {
                return res.status(400).json({ message: 'Preço deve ser um número positivo' });
            }
            
            const novoServico = new Servico(nome, preco);
            empresa.getServicos.push(novoServico);
            
            res.status(201).json({
                message: 'Serviço cadastrado com sucesso',
                servico: {
                    id: novoServico.getId,
                    nome: novoServico.nome,
                    preco: novoServico.preco
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar serviço', error });
        }
    };

    public updateServico = (req: Request, res: Response) => {
        try {
            const servicoId = req.params.id;
            const { nome, preco } = req.body;
            
            const servicoIndex = empresa.getServicos.findIndex(s => s.getId === servicoId);
            
            if (servicoIndex === -1) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }
            
            const servico = empresa.getServicos[servicoIndex];
            
            if (nome) {
                servico.nome = nome;
            }
            
            if (preco !== undefined && typeof preco === 'number' && preco > 0) {
                servico.preco = preco;
            }
            
            res.status(200).json({
                message: 'Serviço atualizado com sucesso',
                servico: {
                    id: servico.getId,
                    nome: servico.nome,
                    preco: servico.preco
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar serviço', error });
        }
    };

    public deleteServico = (req: Request, res: Response) => {
        try {
            const servicoId = req.params.id;
            const servicoIndex = empresa.getServicos.findIndex(s => s.getId === servicoId);
            
            if (servicoIndex === -1) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }
        
            empresa.getServicos.splice(servicoIndex, 1);
            
            empresa.getClientes.forEach(cliente => {
                const consumidosIndex = cliente.getServicosConsumidos.findIndex(s => s.getId === servicoId);
                if (consumidosIndex !== -1) {
                    cliente.getServicosConsumidos.splice(consumidosIndex, 1);
                }
            });
            
            res.status(200).json({ message: 'Serviço removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover serviço', error });
        }
    };
}
