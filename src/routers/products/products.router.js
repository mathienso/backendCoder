import { Router } from 'express';
import ProductManager from '../../ProductManager.js';
import productModel from '../../models/product.model.js';
const router = Router();
const productManager = new ProductManager('./data/products.json');

export const getProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const filterOptions = {};
    if (req.query.stock) filterOptions.stock = req.query.stock;
    if (req.query.category) filterOptions.category = req.query.category;
    const paginateOptions = { lean: true, limit, page };
    if (req.query.sort === 'asc') paginateOptions.sort = { price: 1 };
    if (req.query.sort === 'desc') paginateOptions.sort = { price: -1 };
    const result = await productModel.paginate(filterOptions, paginateOptions);
    let prevLink;
    if (!req.query.page) {
      prevLink = `http://${req.hostname}:8080${req.originalUrl}&page=${result.prevPage}`;
    } else {
      const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${result.prevPage}`);
      prevLink = `http://${req.hostname}:8080${modifiedUrl}`;
    }
    let nextLink;
    if (!req.query.page) {
      nextLink = `http://${req.hostname}:8080${req.originalUrl}&page=${result.nextPage}`;
    } else {
      const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${result.nextPage}`);
      nextLink = `http://${req.hostname}:8080${modifiedUrl}`;
    }
    return {
      statusCode: 200,
      response: {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? prevLink : null,
        nextLink: result.hasNextPage ? nextLink : null,
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      response: { status: 'error', error: e.message },
    };
  }
};

router.get('/', async (req, res) => {
  const result = await getProducts(req, res);
  res.status(result.statusCode).json(result.response);
});

router.post('/', async (req, res) => {
  const prod = req.body;
  let productToAdd = new productModel(prod);
  try {
    await productToAdd.save();
    res.send({ message: 'Producto agregado correctamente', payload: productToAdd });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put('/:pid', async (req, res) => {
  const id = req.params.pid;
  const updatedProduct = req.body;
  try {
    const result = await productModel.updateOne({ _id: id }, { $set: updatedProduct });
    res.send({ message: 'Producto modificado correctamente', payload: result });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete('/:pid', async (req, res) => {
  const id = req.params.pid;
  try {
    await productModel.deleteOne({ _id: id });
    const products = await productModel.find().lean();
    res.send({ status: 'Success', message: 'Producto borrado', payload: products });
  } catch (e) {
    return res.send(e.message);
  }
});

export default router;
