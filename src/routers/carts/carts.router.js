import { Router } from 'express';
import CartManager from '../../CartsManager.js';
import cartModel from '../../models/cart.model.js';
import productModel from '../../models/product.model.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

router.get('/', async (req, res) => {
  try {
    const result = await cartModel.find();
    res.send({ status: 'success', payload: result });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

router.post('/', async (req, res) => {
  const cart = req.body;
  try {
    await cartModel.create(cart);
    res.send({ status: 'success', payload: cart });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

router.get('/:cid', async (req, res) => {
  const id = req.params.cid;
  try {
    const result = await cartModel.find({ _id: id }).populate('products.product');
    res.send({ status: 'sucess', payload: result });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const cart = await cartModel.findOne({ _id: cid });
    const productIndex = cart.products.findIndex((cprod) => cprod.product == pid);

    if (productIndex === -1) {
      const product = {
        product: pid,
        quantity: 1,
      };
      cart.products.push(product);
    } else {
      let total = cart.products[productIndex].quantity;
      cart.products[productIndex].quantity = total + 1;
    }
    await cartModel.updateOne({ _id: cid }, { $set: cart });
    res.send({ status: 'sucess', payload: cart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

router.put('/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    updatedCart.products = req.body;
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    const productIndex = updatedCart.products.findIndex((cprod) => cprod.product == pid);
    if (productIndex != -1 && !isNaN(req.body.quantity)) {
      updatedCart.products[productIndex].quantity = req.body.quantity;
    }
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

router.delete('/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    updatedCart.products = [];
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    const productIndex = updatedCart.products.findIndex((cprod) => cprod.product == pid);
    if (productIndex != -1) {
      updatedCart.products.splice(productIndex, 1);
    }
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
});

export default router;
