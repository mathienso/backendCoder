import { Router } from 'express';
import { getProductsController,addProductController, updateProductController, deleteProductController } from '../../controllers/product.controller.js'; 

const router = Router();


router.get('/', getProductsController);

router.post('/', addProductController);

router.put('/:pid', updateProductController);

router.delete('/:pid', deleteProductController);

export default router;
