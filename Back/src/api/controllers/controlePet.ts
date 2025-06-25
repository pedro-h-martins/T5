import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Pet from '../../modelo/pet';
import Empresa from '../../modelo/empresa';
import Cliente from '../../modelo/cliente';

const empresa = new Empresa();

export class ControlePet {
    
    public getAllPets = (req: Request, res: Response) => {
        try {

            const allPets: Array<{ pet: Pet, clienteNome: string, clienteCpf: string }> = [];
            
            empresa.getClientes.forEach((cliente: Cliente) => {
                cliente.getPets.forEach((pet: Pet) => {
                    allPets.push({
                        pet,
                        clienteNome: cliente.nome,
                        clienteCpf: cliente.getCpf.getValor
                    });
                });
            });
            
            const petsDTO = allPets.map(item => ({
                nome: item.pet.getNome,
                tipo: item.pet.getTipo,
                raca: item.pet.getRaca,
                genero: item.pet.getGenero,
                clienteNome: item.clienteNome,
                clienteCpf: item.clienteCpf
            }));
            
            res.status(200).json(petsDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar pets', error });
        }
    };

    public getPetById = (req: Request, res: Response) => {
        try {
            const petNome = req.params.id;
            let foundPet: Pet | null = null;
            let clienteInfo = { nome: '', cpf: '' };
            
            empresa.getClientes.some((cliente: Cliente) => {
                const pet = cliente.getPets.find((p: Pet) => p.getNome === petNome);
                if (pet) {
                    foundPet = pet;
                    clienteInfo = {
                        nome: cliente.nome,
                        cpf: cliente.getCpf.getValor
                    };
                    return true;
                }
                return false;
            });
            
            if (!foundPet) {
                return res.status(404).json({ message: 'Pet não encontrado' });
            }
            
            const petCasted = foundPet as Pet;
            
            const petDTO = {
                nome: petCasted.getNome,
                tipo: petCasted.getTipo,
                raca: petCasted.getRaca,
                genero: petCasted.getGenero,
                clienteNome: clienteInfo.nome,
                clienteCpf: clienteInfo.cpf
            };
            
            res.status(200).json(petDTO);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar pet', error });
        }
    };

    public updatePet = (req: Request, res: Response) => {
        try {
            const petNome = req.params.id;
            const { tipo, raca, genero, nome } = req.body;
            
            let petFound = false;
            
            empresa.getClientes.forEach((cliente: Cliente) => {
                const petIndex = cliente.getPets.findIndex((p: Pet) => p.getNome === petNome);
                if (petIndex !== -1) {
                    const pet = cliente.getPets[petIndex];
            
                    petFound = true;
                }
            });
            
            if (!petFound) {
                return res.status(404).json({ message: 'Pet não encontrado' });
            }
            
            res.status(200).json({ 
                message: 'Pet atualizado com sucesso',
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar pet', error });
        }
    };

    public deletePet = (req: Request, res: Response) => {
        try {
            const petNome = req.params.id;
            let petFound = false;
            
            empresa.getClientes.forEach((cliente: Cliente) => {
                const petIndex = cliente.getPets.findIndex((p: Pet) => p.getNome === petNome);
                if (petIndex !== -1) {
                    cliente.getPets.splice(petIndex, 1);
                    petFound = true;
                }
            });
            
            if (!petFound) {
                return res.status(404).json({ message: 'Pet não encontrado' });
            }
            
            res.status(200).json({ message: 'Pet removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover pet', error });
        }
    };
}
