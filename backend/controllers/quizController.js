const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Generate quiz based on weaknesses and skills to improve
async function generateQuiz(weaknesses, skillsToImprove) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const quizPrompt = `
    Based on the following weaknesses and skills to improve, create a quiz with 10 multiple choice questions to help the candidate improve these areas:
    Weaknesses: ${weaknesses.join(', ')}
    Skills to Improve: ${skillsToImprove.join(', ')}
    Format your response as a JSON object with this structure:
    {
      "questions": [
        {
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Explanation for the correct answer",
          "category": "Skill category this question addresses"
        }
      ]
    }
    Make sure the questions are practical and relevant to improving the identified weaknesses.
    Ensure you provide exactly 10 questions and that the JSON is valid.
    `;
    const result = await model.generateContent(quizPrompt);
    const response = await result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedQuiz = JSON.parse(jsonMatch[0]);
      if (parsedQuiz.questions && parsedQuiz.questions.length > 0) {
        parsedQuiz.questions = parsedQuiz.questions.slice(0, 10);
        return parsedQuiz;
      } else {
        throw new Error('No questions generated');
      }
    } else {
      throw new Error('Failed to parse quiz JSON');
    }
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz');
  }
}

// Controller: Generate Quiz
async function generateQuizHandler(req, res) {
  try {
    const { analysisId } = req.params;
    if (!require('mongoose').Types.ObjectId.isValid(analysisId)) {
      return res.status(400).json({ error: 'Invalid analysis ID format' });
    }
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found. Please analyze a resume first.' });
    }
    const weaknesses = analysis.analysisStructured?.weaknesses || [];
    const skillsToImprove = analysis.analysisStructured?.skillsToImprove || [];
    if (weaknesses.length === 0 && skillsToImprove.length === 0) {
      return res.status(400).json({ error: 'No weaknesses or skills to improve found in the analysis.' });
    }
    const quiz = await generateQuiz(weaknesses, skillsToImprove);
    res.json({
      quiz: quiz,
      basedOn: {
        weaknesses: weaknesses,
        skillsToImprove: skillsToImprove
      },
      success: true
    });
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quiz' });
  }
}

module.exports = {
  generateQuizHandler
}; 