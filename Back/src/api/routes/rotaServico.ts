import express from 'express';
import { ControleServico } from '../controllers/controleServico';

const router = express.Router();
const controleServico = new ControleServico();

router.get('/', controleServico.getAllServicos);

router.get('/:id', controleServico.getServicoById);

router.post('/', controleServico.createServico);

router.put('/:id', controleServico.updateServico);

router.delete('/:id', controleServico.deleteServico);

export { router as rotasServico };
