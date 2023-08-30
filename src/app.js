import express from 'express';
import productRouter from '../api/products/products.router.js';
import cartRouter from '../api/carts/carts.router.js';
import productsViewRouter from '../api/products/productsView.router.js';
import handlebars from 'express-handlebars';

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.json());

app.use('/', productsViewRouter);

app.use('/products', productRouter);

app.use('/carts', cartRouter);

app.listen(8080, () => {
  console.log('Servidor funcionando en el puerto: ' + 8080);
});
