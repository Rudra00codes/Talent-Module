import mongoose from 'mongoose';

const talentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: [{
    name: { type: String, required: true },
    expertiseLevel: { type: String, required: true }
  }],
  description: { type: String, required: true },
  profilePhoto: { type: String },
  rejectionReason: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Talent', talentSchema);