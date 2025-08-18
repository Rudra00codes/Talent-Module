import mongoose from 'mongoose';

const hireRequestSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true },
    talentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Talent', required: true },
    projectDescription: { type: String, required: true },
    budget: { type: Number },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model('HireRequest', hireRequestSchema);
