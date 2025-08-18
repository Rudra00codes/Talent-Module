import { Request, Response } from 'express';
import Talent from '../models/Talent';
import { sendEmail } from '../services/emailServices';

export class AdminController {
  // Get all pending talents
  async getPendingTalents(req: Request, res: Response) {
    try {
      const pendingTalents = await Talent.find({ status: 'pending' });
      res.json(pendingTalents);
    } catch (error) {
      console.error('Error fetching pending talents:', error);
      res.status(500).json({ error: 'Failed to fetch pending talents' });
    }
  }

  // Get all talents (approved, pending, rejected)
  async getAllTalents(req: Request, res: Response) {
    try {
      const talents = await Talent.find({});
      res.json(talents);
    } catch (error) {
      console.error('Error fetching all talents:', error);
      res.status(500).json({ error: 'Failed to fetch talents' });
    }
  }

  // Approve talent
  async approveTalent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const talent = await Talent.findById(id);
      
      if (!talent) {
        return res.status(404).json({ error: 'Talent not found' });
      }

      talent.status = 'approved';
      await talent.save();

      // Send approval notification to talent
      try {
        await sendEmail({
          to: talent.email,
          subject: 'Profile Approved - Welcome to Talent Platform!',
          message: `Dear ${talent.name},\n\nCongratulations! Your profile has been approved and is now visible to potential clients.\n\nBest regards,\nTalent Platform Team`
        });
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
      }

      res.json({ 
        message: 'Talent approved successfully', 
        talent: {
          id: talent._id,
          name: talent.name,
          email: talent.email,
          status: talent.status
        }
      });
    } catch (error) {
      console.error('Error approving talent:', error);
      res.status(400).json({ error: 'Failed to approve talent' });
    }
  }

  // Reject talent
  async rejectTalent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rejectionReason } = req.body;
      const talent = await Talent.findById(id);
      
      if (!talent) {
        return res.status(404).json({ error: 'Talent not found' });
      }

      talent.status = 'rejected';
      await talent.save();

      // Send rejection notification to talent
      try {
        await sendEmail({
          to: talent.email,
          subject: 'Profile Update - Talent Platform',
          message: `Dear ${talent.name},\n\nThank you for your interest in our platform. Unfortunately, we cannot approve your profile at this time.\n\n${rejectionReason ? `Reason: ${rejectionReason}` : ''}\n\nYou may reapply after addressing any concerns.\n\nBest regards,\nTalent Platform Team`
        });
      } catch (emailError) {
        console.error('Failed to send rejection email:', emailError);
      }

      res.json({ 
        message: 'Talent rejected successfully', 
        talent: {
          id: talent._id,
          name: talent.name,
          email: talent.email,
          status: talent.status
        }
      });
    } catch (error) {
      console.error('Error rejecting talent:', error);
      res.status(400).json({ error: 'Failed to reject talent' });
    }
  }

  // Get talent by ID for admin review
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

export default new AdminController();