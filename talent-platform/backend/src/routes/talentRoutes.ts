import { Router } from 'express';
import Talent from '../models/Talent';
import { upload } from '../services/fileUploadService';
import { sendAdminNotification } from '../services/notificationService';

const router: Router = Router();

// GET: Public directory of approved talents
router.get('/', async (_req, res) => {
  try {
    const talents = await Talent.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(talents);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch talents', details: error.message });
  }
});

// POST: Register new talent (multipart/form-data)
router.post('/register', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { name, email, phone, skills, description } = req.body as any;

    if (!name || !email || !phone || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Profile photo is required' });
    }

    let parsedSkills: Array<{ name: string; expertiseLevel: string }> = [];
    if (typeof skills === 'string') {
      try {
        const parsed = JSON.parse(skills);
        if (Array.isArray(parsed)) {
          parsedSkills = parsed.map((s: any) =>
            typeof s === 'string' ? { name: s, expertiseLevel: 'Intermediate' } : s
          );
        }
      } catch {
        return res.status(400).json({ error: 'Invalid skills format' });
      }
    } else if (Array.isArray(skills)) {
      parsedSkills = (skills as any[]).map((s: any) =>
        typeof s === 'string' ? { name: s, expertiseLevel: 'Intermediate' } : s
      );
    }

    if (!parsedSkills.length) {
      return res.status(400).json({ error: 'At least one skill is required' });
    }

    const talent = await Talent.create({
      name,
      email,
      phone,
      description,
      skills: parsedSkills,
      profilePhoto: req.file.path,
      status: 'pending',
    });

    // Best-effort admin notification (optional)
    try {
      if (process.env.ADMIN_EMAIL) {
        await sendAdminNotification(String(talent._id), 'email');
      }
    } catch (notifyErr) {
      // log only, don't block response
      console.warn('Admin notification failed:', notifyErr);
    }

    res.status(201).json({
      message: 'Registration successful! Your profile is pending admin approval.',
      talent,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

export default router;
