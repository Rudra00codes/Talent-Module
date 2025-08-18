import express from 'express';
import { Router } from 'express';
import adminController from '../controllers/adminController';

const router: Router = express.Router();

// GET: Fetch pending talents
router.get('/pending-talents', adminController.getPendingTalents);

// GET: Fetch all talents
router.get('/talents', adminController.getAllTalents);

// GET: Get talent by ID for admin review
router.get('/talents/:id', adminController.getTalentById);

// PUT: Approve talent
router.put('/approve/:id', adminController.approveTalent);

// PUT: Reject talent
router.put('/reject/:id', adminController.rejectTalent);

export default router;
