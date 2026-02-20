const fs = require('fs');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');
const { cloudinary } = require('../middleware/upload');
const { Readable } = require('stream');
require('dotenv').config();



const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Extract text from PDF buffer
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
}

// Upload buffer to Cloudinary
async function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'resumes',
        resource_type: 'raw',
        public_id: `resume_${Date.now()}`,
        access_mode: 'public'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    const bufferStream = Readable.from(buffer);
    bufferStream.pipe(uploadStream);
  });
}

// Analyze resume using Gemini AI and get JSON
async function analyzeResume(resumeText, jobDescription = null) {
  if (!resumeText) {
    throw new Error('Resume text is required for analysis');
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    let basePrompt = `
    You are an experienced HR with Technical Experience in the field of any one job role from Data Science, Data Analyst, DevOPS, Machine Learning Engineer, Prompt Engineer, AI Engineer, Full Stack Web Development, Big Data Engineering, Marketing Analyst, Human Resource Manager, Software Developer. Your task is to review the provided resume.
    Please provide your analysis in the following JSON format:
    {
      "strengths": ["..."],
      "weaknesses": ["..."],
      "skillsToImprove": ["..."],
      "courseRecommendations": ["..."],
      "overallEvaluation": "..."
    }
    Resume:
    ${resumeText}
    `;
    if (jobDescription && jobDescription.trim()) {
      basePrompt += `
      Additionally, compare this resume to the following job description:
      Job Description:
      ${jobDescription}
      Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
      `;
    }
    const result = await model.generateContent(basePrompt);
    const response = await result.response;
    const text = response.text();
    // Try to extract JSON from the response
    let json = null;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        json = JSON.parse(match[0]);
      } else {
        throw new Error('No JSON found in Gemini response');
      }
    } catch (err) {
      throw new Error('Gemini did not return valid JSON.');
    }
    return { raw: text, json };
  } catch (error) {
    throw new Error('Failed to analyze resume using AI');
  }
}

// Controller: Analyze Resume
async function analyzeResumeHandler(req, res) {
  let cloudinaryUrl = null;
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }
    
    const jobDescription = req.body.jobDescription || '';
    
    // Extract text from PDF buffer
    const resumeText = await extractTextFromPDF(req.file.buffer);
    
    if (!resumeText.trim()) {
      return res.status(400).json({ error: 'Could not extract text from the PDF. Please ensure the PDF contains readable text.' });
    }
    
    // Upload to Cloudinary for storage
    try {
      cloudinaryUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    } catch (uploadError) {
      // Continue with analysis even if upload fails
    }
    
    // Analyze the resume
    const analysisResult = await analyzeResume(resumeText, jobDescription);
    
    // Save analysis to database
    const analysisRecord = new Analysis({
      user: req.user.id,
      resumeText,
      jobDescription,
      analysisRaw: analysisResult.raw,
      analysisJson: analysisResult.json,
      analysisStructured: analysisResult.json // for backward compatibility
    });
    const savedAnalysis = await analysisRecord.save();
    
    res.json({ 
      analysis: analysisResult.raw,
      analysisId: savedAnalysis._id,
      structuredData: analysisResult.json,
      cloudinaryUrl: cloudinaryUrl,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

// Controller: Get analysis by ID
async function getAnalysisById(req, res) {
  try {
    const { analysisId } = req.params;
    if (!require('mongoose').Types.ObjectId.isValid(analysisId)) {
      return res.status(400).json({ error: 'Invalid analysis ID format' });
    }
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json({
      analysis: analysis,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch analysis' });
  }
}

// Controller: Get all analyses
async function getAllAnalyses(req, res) {
  try {
    const analyses = await Analysis.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
    res.json({
      analyses: analyses,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch analyses' });
  }
}

module.exports = {
  analyzeResumeHandler,
  getAnalysisById,
  getAllAnalyses
};