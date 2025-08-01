import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Analysis from '../models/Analysis.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  try {
    // Normalize the file path to handle different path separators
    const normalizedPath = path.resolve(filePath);
    console.log('[extractTextFromPDF] Attempting to read file at:', normalizedPath);
    
    // Check if file exists
    if (!fs.existsSync(normalizedPath)) {
      console.error('[extractTextFromPDF] ❌ File does not exist at path:', normalizedPath);
      throw new Error(`File not found at path: ${normalizedPath}`);
    }
    
    // Get file stats to verify it's a file
    const stats = fs.statSync(normalizedPath);
    if (!stats.isFile()) {
      console.error('[extractTextFromPDF] ❌ Path is not a file:', normalizedPath);
      throw new Error(`Path is not a file: ${normalizedPath}`);
    }
    
    console.log('[extractTextFromPDF] ✅ File exists, reading content...');
    const dataBuffer = fs.readFileSync(normalizedPath);
    console.log('[extractTextFromPDF] ✅ File read successfully, size:', dataBuffer.length, 'bytes');
    
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(dataBuffer);
    
    if (!data.text || data.text.trim().length === 0) {
      console.error('[extractTextFromPDF] ❌ No text extracted from PDF');
      throw new Error('No text could be extracted from the PDF. Please ensure the PDF contains readable text.');
    }
    
    console.log('[extractTextFromPDF] ✅ Text extracted successfully, length:', data.text.length);
    return data.text;
  } catch (error) {
    console.error('[extractTextFromPDF] ❌ Error extracting text from PDF:', error);
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}. Please ensure the file was uploaded correctly.`);
    }
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

// Analyze resume using Gemini AI and get JSON
async function analyzeResume(resumeText, jobDescription = null) {
  if (!resumeText) {
    console.log('[analysisController.js][if] ❌ No resumeText provided');
    throw new Error('Resume text is required for analysis');
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
      console.log('[analysisController.js][if] ✅ jobDescription provided');
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
        console.log('[analysisController.js][if] ✅ JSON found in Gemini response');
        json = JSON.parse(match[0]);
      } else {
        console.log('[analysisController.js][else] ❌ No JSON found in Gemini response');
        throw new Error('No JSON found in Gemini response');
      }
    } catch (err) {
      console.error('Failed to parse JSON from Gemini response:', err);
      throw new Error('Gemini did not return valid JSON.');
    }
    return { raw: text, json };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume using AI');
  }
}

// Controller: Analyze Resume
async function analyzeResumeHandler(req, res) {
  try {
    if (!req.file) {
      console.log('[analysisController.js][if] ❌ No resume file uploaded');
      return res.status(400).json({ error: 'No resume file uploaded' });
    }
    
    const filePath = req.file.path;
    console.log('[analysisController.js] 📁 File uploaded successfully:', {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: filePath,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
    
    const jobDescription = req.body.jobDescription || '';
    console.log('[analysisController.js] 📝 Job description provided:', jobDescription ? 'Yes' : 'No');
    
    const resumeText = await extractTextFromPDF(filePath);
    if (!resumeText.trim()) {
      console.log('[analysisController.js][if] ❌ Could not extract text from PDF');
      return res.status(400).json({ error: 'Could not extract text from the PDF. Please ensure the PDF contains readable text.' });
    }
    
    console.log('[analysisController.js] ✅ Text extracted successfully, length:', resumeText.length);
    
    const analysisResult = await analyzeResume(resumeText, jobDescription);
    const analysisRecord = new Analysis({
      user: req.user.id,
      resumeText,
      jobDescription,
      analysisRaw: analysisResult.raw,
      analysisJson: analysisResult.json,
      analysisStructured: analysisResult.json // for backward compatibility
    });
    const savedAnalysis = await analysisRecord.save();
    
    // Clean up the uploaded file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('[analysisController.js] ❌ Error deleting uploaded file:', err);
      } else {
        console.log('[analysisController.js] ✅ Uploaded file cleaned up successfully');
      }
    });
    
    res.json({ 
      analysis: analysisResult.raw,
      analysisId: savedAnalysis._id,
      structuredData: analysisResult.json,
      success: true
    });
    console.log('[analysisController.js][success] ✅ Resume analyzed and saved');
  } catch (error) {
    console.error('[analysisController.js] ❌ Error in analyze-resume route:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && req.file.path) {
      console.log('[analysisController.js][if] ❌ Cleaning up uploaded file after error');
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('[analysisController.js] ❌ Error deleting file during cleanup:', err);
        } else {
          console.log('[analysisController.js] ✅ File cleaned up after error');
        }
      });
    }
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error';
    if (error.message.includes('File not found')) {
      errorMessage = 'Uploaded file could not be processed. Please try uploading again.';
    } else if (error.message.includes('No text could be extracted')) {
      errorMessage = 'The PDF file does not contain readable text. Please ensure the PDF has selectable text content.';
    } else if (error.message.includes('Failed to analyze resume')) {
      errorMessage = 'Failed to analyze the resume. Please try again.';
    } else {
      errorMessage = error.message || 'Internal server error';
    }
    
    res.status(500).json({ error: errorMessage });
  }
}

// Controller: Get analysis by ID
async function getAnalysisById(req, res) {
  try {
    const { analysisId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(analysisId)) {
      console.log('[analysisController.js][if] ❌ Invalid analysis ID format');
      return res.status(400).json({ error: 'Invalid analysis ID format' });
    }
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      console.log('[analysisController.js][if] ❌ Analysis not found');
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json({
      analysis: analysis,
      success: true
    });
    console.log('[analysisController.js][success] ✅ Analysis fetched by ID');
  } catch (error) {
    console.error('Error fetching analysis:', error);
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
    console.log('[analysisController.js][success] ✅ All analyses fetched for user:', req.user.id);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch analyses' });
  }
}

export default {
  analyzeResumeHandler,
  getAnalysisById,
  getAllAnalyses
}; 