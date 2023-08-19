import express from 'express';
import productRouter from '../api/products/products.router.js';
import cartRouter from '../api/carts/carts.router.js';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use('/carts', cartRouter);

app.listen(8080, () => {
  console.log('Servidor funcionando en el puerto: ' + 8080);
});
