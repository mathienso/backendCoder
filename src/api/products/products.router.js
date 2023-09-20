import { Router } from 'express';
import ProductManager from '../../ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    if (!limit || limit > products.length) {
      res.send({ payload: products });
      return;
    }
    let productsLimit = [];
    for (let index = 0; index < limit; index++) {
      productsLimit.push(products[index]);
    }
    res.send({ payload: productsLimit });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    let product = await productManager.getProductById(parseInt(pid));
    res.send({ payload: product });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const prod = req.body;
    let productToAdd = await productManager.addProduct(prod);
    res.send({ message: 'Producto agregado correctamente', payload: productToAdd });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    if (req.body.id) {
      throw new Error('No se puede modificar el ID de un producto');
    }
    let updatedProduct = await productManager.updateProduct(pid, req.body);
    res.send({ message: 'Producto modificado correctamente', payload: updatedProduct });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    let products = await productManager.deleteProduct(pid);
    res.send({ message: 'Producto eliminado correctamente', payload: products });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
/* 
try {
  
  res.send({ payload: products });
} catch (e) {
  res.status(500).send(e.message);
}
 */
