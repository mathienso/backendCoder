import { Router } from 'express';
import userModel from '../../models/user.model.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failRegister' }), async (req, res) => {
  res.redirect('/login');
});

router.get('/failRegister', (req, res) => res.send({ error: 'Passport register failed' }));

router.post('/login', passport.authenticate('login', { failureRedirect: '/session/failLogin' }), async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
  }
  if (req.user.rol == 'Admin') {
    req.session.user = {
      name: req.user.name,
      email: req.user.email,
      age: 0,
      rol: req.user.rol,
    };
  } else {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      rol: 'User',
    };
  }
  console.log(req.user);
  res.redirect('/products');
});

router.get('/failLogin', (req, res) => res.send({ error: 'Passport login failed' }));

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), async (req, res) => {
  req.session.user = req.user;
  res.redirect('/products');
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ status: 'error', error: 'No pudo cerrar sesion' });
    res.redirect('/');
  });
});

export default router;
