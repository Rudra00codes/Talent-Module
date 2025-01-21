import { Request, Response } from 'express';

export const registerTalent = async (req: Request, res: Response) => {
  try {
    const { name, email, skills } = req.body;
    const profilePhoto = req.file;
    
    // Add registration logic here
    const talent = {
      name,
      email,
      skills,
      profilePhotoUrl: profilePhoto?.path
    };
    
    res.status(201).json({ message: 'Talent registered successfully', talent });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}; 