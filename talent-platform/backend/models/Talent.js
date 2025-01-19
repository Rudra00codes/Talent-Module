const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: [{
    name: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true }
  }],
  description: { type: String, required: true, maxLength: 1000 },
  profilePhoto: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: { type: String },
  isVisible: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Talent', TalentSchema);