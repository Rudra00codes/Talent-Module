import { Request, Response } from 'express';
import Talent from '../models/Talent';
import { sendEmail } from '../services/emailServices';
import { sendWhatsAppMessage } from '../config/whatsapp';

export class TalentController {
  // Get all talents
  async getAllTalents(req: Request, res: Response) {
    try {
      const talents = await Talent.find({ status: 'approved' });
      res.json(talents);
    } catch (error) {
      console.error('Error fetching talents:', error);
      res.status(500).json({ error: 'Failed to fetch talents' });
    }
  }

  // Register new talent
  async register(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        phone,
        skills,
        description,
      } = req.body;

      // Validate input
      if (!name || !email || !phone || !skills || !description) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({ error: 'At least one skill is required' });
      }

      // Create talent profile
      const talent = new Talent({
        name,
        email,
        phone,
        skills: skills.map((skill: any) => ({
          name: skill.name,
          expertiseLevel: skill.expertiseLevel
        })),
        description,
        profilePhoto: req.file ? req.file.path : undefined,
        status: 'pending'
      });

      await talent.save();

      // Send notification to admin (placeholder)
      console.log(`New talent registration: ${name} (${email})`);

      res.status(201).json({
        message: 'Registration successful! Your profile is pending admin approval.',
        talent: {
          id: talent._id,
          name: talent.name,
          email: talent.email,
          status: talent.status
        }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 11000) {
        res.status(400).json({ error: 'Email already registered' });
      } else {
        res.status(400).json({ error: 'Registration failed' });
      }
    }
  }

  // Get talent by ID
  async getTalentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const talent = await Talent.findById(id);
      
      if (!talent) {
        return res.status(404).json({ error: 'Talent not found' });
      }

      res.json(talent);
    } catch (error) {
      console.error('Error fetching talent:', error);
      res.status(500).json({ error: 'Failed to fetch talent' });
    }
  }
}

export default new TalentController();