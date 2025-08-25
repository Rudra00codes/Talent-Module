import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import talentRoutes from './routes/talentRoutes';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import connectDB from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';

dotenv.config();
const app = express();

// Enable CORS (configurable)
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Core middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/talent', talentRoutes);
app.use('/api/admin', adminRoutes);

// (Initial direct mongoose.connect call removed; using central connectDB below)

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Talent Platform API is running', version: '1.0.0' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
connectDB()
  .then(() => {
    // Ensure upload directories exist
    const uploadDir = path.resolve(__dirname, '../uploads/profile-photos');
    fs.mkdirSync(uploadDir, { recursive: true });
    app.listen(PORT, () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Server running on port ${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB error:', err);
    process.exit(1);
  });