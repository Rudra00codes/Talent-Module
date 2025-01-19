class TalentController {
    async register(req, res) {
      try {
        const { 
          name, 
          email, 
          skills, 
          description, 
          profilePhoto 
        } = req.body;
  
        // Validate input
        const talent = new Talent({
          name,
          email,
          skills,
          description,
          profilePhoto,
          status: 'pending'
        });
  
        await talent.save();
  
        // Trigger WhatsApp notification
        NotificationService.sendAdminNotification({
          type: 'new_talent_registration',
          details: talent
        });
  
        res.status(201).json(talent);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  