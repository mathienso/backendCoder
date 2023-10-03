import { Router } from 'express';
import { getProducts } from './products.router.js';

const router = Router();

router.get('/', async (req, res) => {
  const result = await getProducts(req, res);
  if (result.statusCode === 200) {
    const totalPages = [];
    let link;
    for (let index = 1; index <= result.response.totalPages; index++) {
      if (!req.query.page) {
        link = `http://${req.hostname}:8080${req.originalUrl}?&page=${index}`;
      } else {
        const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${index}`);
        link = `http://${req.hostname}:8080${modifiedUrl}`;
      }
      totalPages.push({ page: index, link });
    }
    res.render('home', {
      products: result.response.payload,
      paginateInfo: {
        hasPrevPage: result.response.hasPrevPage,
        hasNextPage: result.response.hasNextPage,
        prevLink: result.response.prevLink,
        nextLink: result.response.nextLink,
        totalPages,
      },
    });
  } else {
    res.status(result.statusCode).json({ status: 'error', error: result.response.error });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await getProducts(req, res);
    console.log(products);
    res.render('realTimeProducts', { products: products.response.payload });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
