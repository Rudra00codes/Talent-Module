import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import talentRoutes from './routes/talentRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials if needed
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/talent', talentRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Talent Schema
const talentSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  status: { type: String, default: 'pending' }
});

const Talent = mongoose.model('Talent', talentSchema);

// Define the /api/talents route
app.get('/api/talents', async (req, res) => {
  try {
    const talents = await Talent.find();
    res.json(talents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching talents' });
  }
});

// Define the /api/talents/register route
app.post('/api/talents/register', async (req, res) => {
  const { name, email, skills } = req.body;
  const newTalent = new Talent({ name, email, skills });
  
  try {
    await newTalent.save();
    res.status(201).json(newTalent);
  } catch (error) {
    res.status(500).json({ message: 'Error saving talent', error });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});