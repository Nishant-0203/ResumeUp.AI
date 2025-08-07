const Analysis = require('../models/Analysis');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getRecommendedJobs = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes auth middleware sets req.user
        const analysis = await Analysis.findOne({ user: userId }).sort({ createdAt: -1 });

        if (!analysis) {
            return res.status(404).json({ message: 'No resume analysis found' });
        }

        // Prepare prompt for Gemini
        const prompt = `
        Based on this resume analysis, suggest 5 suitable job roles. For each, provide:
        - title
        - company
        - location
        - workType
        - salary
        - compensationType
        - requiredSkills (as an array)
        - recommendations (short string)
        - nextSteps (as an array)
        Example output (as JSON array):
        [
          {
            "title": "Software Engineer",
            "company": "TechCorp",
            "location": "Remote",
            "workType": "Full-time",
            "salary": "$100,000",
            "compensationType": "Annual",
            "requiredSkills": ["JavaScript", "React", "Node.js"],
            "recommendations": "You are a great fit for this role due to your experience in web development.",
            "nextSteps": ["Update your LinkedIn profile", "Apply on company website"]
          }
        ]
        Resume analysis:
        ${JSON.stringify(analysis, null, 2)}
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let jobs;
        try {
            jobs = JSON.parse(text);
        } catch (e) {
            // If not JSON, return the raw text for debugging
            return res.status(500).json({ message: 'Failed to parse Gemini response', details: text });
        }

        res.json({ jobs });
    } catch (err) {
        res.status(500).json({ message: err.message, details: err.stack });
    }
};