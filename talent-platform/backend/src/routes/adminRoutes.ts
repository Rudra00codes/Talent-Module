import express from 'express';
import { Router } from 'express';

const router: Router = express.Router();

// GET: Fetch pending talents
router.get('/pending-talents', (req, res) => {
  res.json({ message: 'Fetch pending talents' });
});

// PUT: Approve talent
router.put('/approve/:id', (req, res) => {
  res.json({ message: 'Approve talent' });
});

export default router;
