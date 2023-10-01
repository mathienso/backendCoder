import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './routers/products/products.router.js';
import cartRouter from './routers/carts/carts.router.js';
import productsViewRouter from './routers/products/productsView.router.js';

/*
 * MongoDB
 *   User: mathienso
 *   Pss: c3HgLytuAIUc5Ebn
 */

//inicio app con express
const app = express();
//conecto Atlas con mongoose
try {
  await mongoose.connect('mongodb+srv://mathienso:c3HgLytuAIUc5Ebn@clustertest.riwkwij.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'coder',
  });
  console.log('DB Conected!');
  const httpServer = app.listen(8080, () => {
    console.log('Servidor funcionando en el puerto: ' + 8080);
  });
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
  app.use('/api/products', productRouter);
  app.use('/api/carts', cartRouter);

  io.on('connection', (socket) => {
    console.log('nuevo cliente');
    socket.on('productList', (data) => {
      console.log('updatedProducts');
      console.log(data);
      io.emit('updatedProducts', data);
    });
    socket.on('message', (body) => {
      console.log(body);
    });
  });
} catch (e) {
  console.log(e.message);
  process.exit(-1);
}
