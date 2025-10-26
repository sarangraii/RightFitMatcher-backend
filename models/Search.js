const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  searchParams: {
    gmatScore: Number,
    greScore: Number,
    gpa: Number,
    workExperience: Number,
    programType: String
  },
  results: [{
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University'
    },
    matchScore: Number,
    admissionProbability: Number,
    category: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for user searches
searchSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Search', searchSchema);