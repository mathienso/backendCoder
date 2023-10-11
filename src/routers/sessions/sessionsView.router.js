import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/register', (req, res) => {
  res.render('sessions/register');
});

router.get('/', (req, res) => {
  res.render('sessions/login');
});

router.get('/github', passport.authenticate('github'), async (req, res) => {});

export default router;
