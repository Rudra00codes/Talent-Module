import { Request, Response } from 'express';
import HireRequest from '../models/HireRequest';
import Talent from '../models/Talent';
import WhatsAppService from '../services/whatsappService';

class HireRequestController {
  async createRequest(req: Request, res: Response) {
    try {
      const { clientId, talentId, projectDescription } = req.body;

      // Validate input
      if (!clientId || !talentId || !projectDescription) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Get talent details
      const talent = await Talent.findById(talentId);
      if (!talent) {
        return res.status(404).json({ error: 'Talent not found' });
      }

      // Create hire request
      const hireRequest = new HireRequest({
        clientId,
        talentId,
        projectDescription,
        status: 'pending'
      });
      await hireRequest.save();

      // Send WhatsApp notification
      await WhatsAppService.sendNotification({
        type: 'hire_request',
        data: {
          _id: hireRequest._id,
          clientName: req.body.clientName,
          clientEmail: req.body.clientEmail,
          talentName: talent.name,
          projectDescription
        }
      });

      res.status(201).json({
        message: 'Hire request created successfully',
        request: hireRequest
      });
    } catch (error) {
      console.error('Hire request error:', error);
      res.status(500).json({ error: 'Failed to create hire request' });
    }
  }
}

export default new HireRequestController(); 