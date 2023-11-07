import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import productRouter from './routers/products/products.router.js';
import cartRouter from './routers/carts/carts.router.js';
import productsViewRouter from './routers/products/productsView.router.js';
import cartsViewRouter from './routers/carts/cartsView.router.js';
import sessionRouter from './routers/sessions/session.router.js';
import sessionsViewRouter from './routers/sessions/sessionsView.router.js';
import initializePassport from './config/passport.config.js';
import config from './config/config.js';

/*
 * MongoDB
 *   User: mathienso
 *   Pss: c3HgLytuAIUc5Ebn
 * 
 * GithubApp
 *   App ID: 406900
 *   Client ID: Iv1.62d564f261133d94
 *   Client Secret: 486585253a04d3f98536371e284ce8c5bed35953
 */

//inicio app con express
const app = express();
//conecto Atlas con mongoose
try {
  await mongoose.connect(config.mongoUrl, {
    dbName: config.db,
  });
  console.log('DB Conected!');
  const httpServer = app.listen(config.port, () => {
    console.log('Servidor funcionando en el puerto: ' + config.port);
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

  //configuro session con mongo
  app.use(
    session({
      store: new MongoStore({
        mongoUrl: config.mongoUrl ,
        ttl: 3600,
      }),
      secret: config.secretSession,
      resave: false,
      saveUninitialized: false,
    })
  );
  //inicializo passport
  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());

  //configuro los routers (endpoints y views)
  app.use('/', sessionsViewRouter);
  app.use('/api/products', productRouter);
  app.use('/api/carts', cartRouter);
  app.use('/api/session', sessionRouter);
  app.use('/products', productsViewRouter);
  app.use('/carts', cartsViewRouter);

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
