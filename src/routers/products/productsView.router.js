import { Router } from 'express';
import ProductManager from '../../ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
