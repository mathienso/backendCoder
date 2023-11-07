import { Router } from 'express';
import { getCartsController, createCartController, getCartByIdController, addProductToCartController, updateCartController, updateProductFromCartController, deleteCartController, deleteProductFromCartController } from '../../controllers/cart.controllers.js';

const router = Router();

router.get('/', getCartsController);

router.post('/', createCartController);

router.get('/:cid', getCartByIdController);

router.post('/:cid/products/:pid', addProductToCartController);

router.put('/:cid', updateCartController);

router.put('/:cid/products/:pid', updateProductFromCartController);

router.delete('/:cid', deleteCartController);

router.delete('/:cid/products/:pid', deleteProductFromCartController);

export default router;
