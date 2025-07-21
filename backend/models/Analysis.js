const mongoose = require('../db/mongoose');

const analysisSchema = new mongoose.Schema({
  resumeText: String,
  jobDescription: String,
  analysisRaw: String,
  analysisJson: {
    strengths: [String],
    weaknesses: [String],
    skillsToImprove: [String],
    courseRecommendations: [String],
    overallEvaluation: String
  },
  analysisStructured: {
    strengths: [String],
    weaknesses: [String],
    skillsToImprove: [String],
    courseRecommendations: [String],
    overallEvaluation: String
  },
  createdAt: { type: Date, default: Date.now }
});

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis; 