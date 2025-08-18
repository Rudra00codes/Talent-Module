import { Router } from 'express';
import Talent from '../models/Talent';
import { adminApiKeyAuth } from '../middleware/auth';

const router: Router = Router();

// GET: Fetch pending talents (basic, unauthenticated for now)
router.get('/pending-talents', adminApiKeyAuth, async (_req, res) => {
  try {
    const talents = await Talent.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(talents);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch pending talents', details: error.message });
  }
});

// PUT: Approve talent
router.put('/approve/:id', adminApiKeyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Talent.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Talent not found' });
    res.json({ message: 'Talent approved successfully', talent: updated });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to approve talent', details: error.message });
  }
});

// PUT: Reject talent
router.put('/reject/:id', adminApiKeyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body as any;
    const updated = await Talent.findByIdAndUpdate(
      id,
      { status: 'rejected', rejectionReason: reason },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Talent not found' });
    res.json({ message: 'Talent rejected successfully', talent: updated });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to reject talent', details: error.message });
  }
});

export default router;
