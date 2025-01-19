const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{ type: String, required: true }],
  description: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rating: { type: Number, default: 0 },
  completedProjects: { type: Number, default: 0 },
  availability: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Talent', TalentSchema);