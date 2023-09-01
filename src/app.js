import express from 'express';
import productRouter from './routes/products/products.router.js';
import cartRouter from './routes/carts/carts.router.js';
import productsViewRouter from './routes/products/productsView.router.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

//inicio app con express
const app = express();
const httpServer = app.listen(8080, () => {console.log('Servidor funcionando en el puerto: ' + 8080);});
//inicio websockets
const io = new Server(httpServer);

//configuro handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
//configuro carpeta public
app.use(express.static('./src/public'));

//uso express json para poder hacer las peticiones correctamente
app.use(express.json());

//configuro los routers
app.use('/', productsViewRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

io.on('connection', socket => {
  console.log('nuevo cliente');
})

