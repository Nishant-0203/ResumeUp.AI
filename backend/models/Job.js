const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  linkedinUrl: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level'],
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    default: 'Not specified'
  },
  postDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
