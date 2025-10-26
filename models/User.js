const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  profile: {
    gmatScore: { type: Number, min: 0, max: 800 },
    greScore: { type: Number, min: 0, max: 340 },
    gpa: { type: Number, min: 0, max: 4.0 },
    workExperience: { type: Number, min: 0 },
    targetProgram: { 
      type: String, 
      enum: ['MBA', 'MS', 'PhD', 'Undergraduate', 'Other'],
      default: 'MBA'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);