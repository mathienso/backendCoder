import { Router } from 'express';
import { getProductsFromCart } from './carts.router.js';

const router = Router();

router.get('/:cid', async (req, res) => {
  const result = await getProductsFromCart(req, res);
  if (result.statusCode === 200) {
    console.log(result.response.payload);
    res.render('cart', { cart: result.response.payload[0] });
  } else {
    res.status(result.statusCode).json({ status: 'error', error: result.response.error });
  }
});

export default router;
