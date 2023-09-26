import { Router } from 'express';
import CartManager from '../../CartsManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

router.get('/:cid', async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    let cart = await cartManager.getCartById(cid);
    res.send({ payload: cart.products });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const cart = req.body;
    let cartToAdd = await cartManager.addCart(cart);
    res.send({ message: 'Carrito agregado correctamente', payload: cartToAdd });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    let updatedCart = await cartManager.addProductToCart(cid, pid);
    res.send({ message: 'Carrito agregado correctamente', payload: updatedCart });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    let updatedProduct = await productManager.updateProduct(pid, req.body);
    res.send({ message: 'Producto modificado correctamente', payload: updatedProduct });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
