const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  ranking: {
    type: Number,
    min: 1
  },
  programType: {
    type: String,
    enum: ['MBA', 'MS', 'PhD', 'Undergraduate', 'Multiple'],
    required: true
  },
  requirements: {
    minGMAT: { type: Number, default: 0 },
    avgGMAT: { type: Number, default: 0 },
    maxGMAT: { type: Number, default: 800 },
    minGRE: { type: Number, default: 0 },
    avgGRE: { type: Number, default: 0 },
    minGPA: { type: Number, default: 0 },
    avgGPA: { type: Number, default: 0 },
    minWorkExp: { type: Number, default: 0 },
    avgWorkExp: { type: Number, default: 0 }
  },
  stats: {
    acceptanceRate: { type: Number, min: 0, max: 100 },
    avgSalary: { type: Number },
    totalStudents: { type: Number },
    internationalStudents: { type: Number }
  },
  tuition: {
    inState: Number,
    outState: Number,
    international: Number
  },
  website: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
universitySchema.index({ programType: 1, ranking: 1 });
universitySchema.index({ 'requirements.avgGMAT': 1 });

module.exports = mongoose.model('University', universitySchema);