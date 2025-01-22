import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import cors from 'cors';
import talentRoutes from './routes/talentRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/talent', talentRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();