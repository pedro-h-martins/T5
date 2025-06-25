import express from 'express';
import { ControlePet } from '../controllers/controlePet';

const router = express.Router();
const controlePet = new ControlePet();

router.get('/', controlePet.getAllPets);

router.get('/:id', controlePet.getPetById);

router.put('/:id', controlePet.updatePet);

router.delete('/:id', controlePet.deletePet);

export { router as rotasPet };
