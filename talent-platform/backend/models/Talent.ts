import mongoose, { Schema, Document } from 'mongoose';
import { ApprovalStatus } from '../../talent-platform-frontend/src/types/Talent';

export interface ITalent extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  skills: Array<{
    name: string;
    yearsOfExperience: number;
    expertiseLevel: string;
  }>;
  description: string;
  profilePhoto: string;
  approvalStatus: ApprovalStatus;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TalentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  skills: [{
    name: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    expertiseLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true }
  }],
  description: { type: String, required: true },
  profilePhoto: { type: String },
  approvalStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isVisible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITalent>('Talent', TalentSchema);