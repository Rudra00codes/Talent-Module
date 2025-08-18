const Talent = require('../models/Talent');
const User = require('../models/User');
const NotificationService = require('../services/notificationService');
const EmailService = require('../services/emailService');
import WhatsAppService from '../services/whatsappService';

class TalentController {
  async register(req, res) {
    try {
      const {
        name,
        email,
        phone,
        skills,
        description,
      } = req.body;

      // Validate input
      if (!req.file) {
        return res.status(400).json({ error: 'Profile photo is required' });
      }

      if (!skills || !Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({ error: 'At least one skill is required' });
      }

      // Create user account
      const user = new User({
        name,
        email,
        role: 'talent',
        isApproved: false
      });
      await user.save();

      // Create talent profile
      const talent = new Talent({
        userId: user._id,
        name,
        email,
        phone,
        skills: skills.map(skill => ({
          name: skill.name,
          yearsOfExperience: skill.yearsOfExperience
        })),
        description,
        profilePhoto: req.file.path,
        status: 'pending',
        isVisible: false
      });

      await talent.save();

      // Notify admin via WhatsApp
      await WhatsAppService.sendNotification({
        type: 'new_talent',
        data: {
          _id: talent._id,
          name: talent.name,
          email: talent.email,
          skills: talent.skills.map(skill => skill.name)
        }
      });

      // Send email notification to admin
      await EmailService.sendAdminNotification({
        type: 'NEW_TALENT_REGISTRATION',
        talent: talent
      });

      res.status(201).json({
        message: 'Registration successful! Your profile is pending admin approval.',
        talent: talent
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
}

module.exports = new TalentController();