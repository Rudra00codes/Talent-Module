import { Router } from 'express';
import talentController from '../controllers/talentController';
import { upload } from '../services/fileUploadService';

const router: Router = express.Router();

// GET: Fetch all approved talents
router.get('/', talentController.getAllTalents);

// POST: Register new talent
router.post('/register', upload.single('profilePhoto'), talentController.register);

// GET: Get talent by ID
router.get('/:id', talentController.getTalentById);

export default router;
