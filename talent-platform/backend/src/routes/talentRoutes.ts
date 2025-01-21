import express from 'express';
import { Router } from 'express';

const router: Router = express.Router();

// GET: Fetch all talents
router.get('/', (req, res) => {
  res.json({ message: 'Fetch all talents' });
});

// POST: Register new talent
router.post('/register', (req, res) => {
  res.json({ message: 'Register new talent' });
});

export default router;
