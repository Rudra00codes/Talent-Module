const Talent = require('../models/Talent');
const User = require('../models/User');
const EmailService = require('../services/emailService');

class AdminController {
  async approveTalent(req, res) {
    try {
      const { talentId } = req.params;
      const talent = await Talent.findById(talentId);
      
      if (!talent) {
        return res.status(404).json({ error: 'Talent not found' });
      }

      talent.status = 'approved';
      talent.isVisible = true;
      await talent.save();

      // Update user approval status
      await User.findByIdAndUpdate(talent.userId, { isApproved: true });

      // Notify talent via email
      await EmailService.sendTalentNotification({
        type: 'PROFILE_APPROVED',
        talent: talent
      });

      res.json({ message: 'Talent approved successfully', talent });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async rejectTalent(req, res) {
    try {
      const { talentId } = req.params;
      const { rejectionReason } = req.body;

      const talent = await Talent.findById(talentId);
      
      if (!talent) {
        return res.status(404).json({ error: 'Talent not found' });
      }

      talent.status = 'rejected';
      talent.rejectionReason = rejectionReason;
      talent.isVisible = false;
      await talent.save();

      // Notify talent via email
      await EmailService.sendTalentNotification({
        type: 'PROFILE_REJECTED',
        talent: talent,
        reason: rejectionReason
      });

      res.json({ message: 'Talent rejected successfully', talent });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();