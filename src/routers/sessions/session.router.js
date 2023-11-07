import { Router } from 'express';
import passport from 'passport';
import { registerController, loginController, githubController, loguotController } from '../../controllers/session.controller.js';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failRegister' }), registerController);

router.get('/failRegister', (req, res) => res.send({ error: 'Passport register failed' }));

router.post('/login', passport.authenticate('login', { failureRedirect: '/session/failLogin' }), loginController);

router.get('/failLogin', (req, res) => res.send({ error: 'Passport login failed' }));

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), githubController);

router.get('/logout', loguotController);

export default router;
