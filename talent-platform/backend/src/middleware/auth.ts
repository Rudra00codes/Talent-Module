import { Request, Response, NextFunction } from 'express';

export function adminApiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('x-admin-api-key');
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) return res.status(500).json({ error: 'Admin API key not configured' });
  if (!apiKey || apiKey !== expected) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
