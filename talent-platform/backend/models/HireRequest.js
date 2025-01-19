const mongoose = require('mongoose');

const HireRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  talentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Talent', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  projectDetails: { type: String, required: true },
  budget: { type: Number },
  timeline: { type: String },
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('HireRequest', HireRequestSchema);