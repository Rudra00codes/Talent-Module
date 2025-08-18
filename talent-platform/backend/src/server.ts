import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import talentRoutes from './routes/talentRoutes';
import adminRoutes from './routes/adminRoutes';
import connectDB from './config/database';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();

// Enable CORS (configurable)
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Core middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (profile photos)
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Routes
app.use('/api/talent', talentRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (_req, res) => {
  res.send('Backend is running');
});

// Global error handler
app.use(errorHandler);

// Start server after DB connects
const PORT = process.env.PORT || 8080;
connectDB()
  .then(() => {
  // Ensure upload directories exist
  const uploadDir = path.resolve(__dirname, '../uploads/profile-photos');
  fs.mkdirSync(uploadDir, { recursive: true });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB error:', err);
    process.exit(1);
  });