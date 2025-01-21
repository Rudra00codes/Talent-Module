import express from 'express';
import multer from 'multer';
import { registerTalent } from '../controllers/talentController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('profilePhoto'), registerTalent);

export default router;
