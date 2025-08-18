import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  company: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const hireRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  talentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Talent', required: true },
  projectDescription: { type: String, required: true },
  budget: { type: Number },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export const Client = mongoose.model('Client', clientSchema);
export const HireRequest = mongoose.model('HireRequest', hireRequestSchema);