import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error.name === 'TwilioError') {
    return res.status(500).json({
      error: 'Notification service temporarily unavailable',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}; 