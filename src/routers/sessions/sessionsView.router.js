import { Router } from 'express';

const router = Router();

router.get('/register', (req, res) => {
  res.render('sessions/register');
});

router.get('/', (req, res) => {
  res.render('sessions/login');
});

export default router;
