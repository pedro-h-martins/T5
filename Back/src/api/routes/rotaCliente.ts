import express from 'express';
import { ControleCliente } from '../controllers/controleCliente';

const router = express.Router();
const controleCliente = new ControleCliente();

router.get('/', controleCliente.getAllClientes);

router.get('/:cpf', controleCliente.getClienteByCpf);

router.post('/', controleCliente.createCliente);

router.put('/:cpf', controleCliente.updateCliente);

router.delete('/:cpf', controleCliente.deleteCliente);

router.get('/:cpf/pets', controleCliente.getClientePets);

router.post('/:cpf/pets', controleCliente.addPetToCliente);

router.get('/:cpf/produtos', controleCliente.getClienteProdutos);

router.post('/:cpf/produtos/:id', controleCliente.addProdutoToCliente);

router.get('/:cpf/servicos', controleCliente.getClienteServicos);

router.post('/:cpf/servicos/:id', controleCliente.addServicoToCliente);

export { router as rotasCliente };
