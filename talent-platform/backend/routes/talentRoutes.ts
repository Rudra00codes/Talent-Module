import express from 'express';
const router = express.Router();
import * as TalentController from '../controllers/talentController';
import { upload } from '../services/fileUploadService';

router.post('/register', 
  upload.single('profilePhoto'), 
  TalentController.register
);

export default router;

