import express from 'express';
import { Router } from 'express';
import authController from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router: Router = express.Router();

// POST: Register user
router.post('/register', authController.register);

// POST: Login user
router.post('/login', authController.login);

// GET: Get user profile (protected)
router.get('/profile', authenticate, authController.getProfile);

export default router;