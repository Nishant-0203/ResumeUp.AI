const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function testModels() {
  const modelsToTest = [
    'gemini-pro',
    'gemini-1.0-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'models/gemini-pro'
  ];

  console.log('Testing Gemini models with your API key...\n');

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ SUCCESS: ${modelName}`);
      console.log(`Response: ${text.substring(0, 50)}...\n`);
      break; // If one works, we're good
    } catch (error) {
      console.log(`❌ FAILED: ${modelName}`);
      console.log(`Error: ${error.message}\n`);
    }
  }
}

testModels();
