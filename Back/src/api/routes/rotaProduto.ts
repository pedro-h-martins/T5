import express from 'express';
import { ControleProduto } from '../controllers/controleProduto';

const router = express.Router();
const controleProduto = new ControleProduto();

router.get('/', controleProduto.getAllProdutos);

router.get('/:id', controleProduto.getProdutoById);

router.post('/', controleProduto.createProduto);

router.put('/:id', controleProduto.updateProduto);

router.delete('/:id', controleProduto.deleteProduto);

export { router as rotasProduto };
