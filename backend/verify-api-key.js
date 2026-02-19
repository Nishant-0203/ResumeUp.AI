const axios = require('axios');
require('dotenv').config();

async function verifyApiKey() {
  const apiKey = process.env.GOOGLE_API_KEY;
  console.log('API Key:', apiKey.substring(0, 20) + '...');
  console.log('\nTesting API key validity...\n');

  // Try to list models directly via REST API
  try {
    console.log('Attempting to list models via REST API...');
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    console.log('\n✅ API Key is valid!');
    console.log('\nAvailable models:');
    response.data.models.forEach(model => {
      console.log(`- ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
      console.log();
    });
  } catch (error) {
    console.log('\n❌ API Key Error:');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.response?.data?.error?.message || error.message);
    console.log('\nPossible issues:');
    console.log('1. The API key might be invalid or expired');
    console.log('2. The Generative Language API needs to be enabled');
    console.log('3. Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
    console.log('4. Make sure to enable the API and create a proper API key');
  }
}

verifyApiKey();
