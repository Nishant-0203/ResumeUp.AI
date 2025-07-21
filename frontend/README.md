AI Resume Analyzer - MERN Stack
A full-stack web application that analyzes resumes using Google Gemini AI and provides detailed feedback on candidate profiles.

Features
Upload PDF resumes
Optional job description matching
AI-powered analysis using Google Gemini
Professional feedback on strengths and weaknesses
Skill recommendations and course suggestions
Modern, responsive UI
Tech Stack
Frontend:

React.js
Axios for API calls
CSS3 with modern styling
Backend:

Node.js
Express.js
Multer for file uploads
PDF-parse for text extraction
Google Generative AI (Gemini)
Project Structure
resume-analyzer/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── uploads/ (created automatically)
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── public/
Setup Instructions
Prerequisites
Node.js (v14 or higher)
npm or yarn
Google Gemini API key
Backend Setup
Create a new directory for the backend:
bash
mkdir resume-analyzer-backend
cd resume-analyzer-backend
Initialize npm and install dependencies:
bash
npm init -y
npm install express multer cors dotenv pdf-parse @google/generative-ai
npm install -D nodemon
Create the server.js file with the backend code provided
Create a .env file:
bash
GOOGLE_API_KEY=your_google_gemini_api_key_here
PORT=5000
NODE_ENV=development
Update package.json scripts:
json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Start the backend server:
bash
npm run dev
Frontend Setup
Create a new React app:
bash
npx create-react-app resume-analyzer-frontend
cd resume-analyzer-frontend
Install additional dependencies:
bash
npm install axios
Replace the contents of src/App.js with the React component code provided
Replace the contents of src/App.css with the CSS code provided
Add proxy to package.json (for development):
json
"proxy": "http://localhost:5000"
Start the frontend:
bash
npm start
Getting Google Gemini API Key
Go to Google AI Studio
Sign in with your Google account
Create a new API key
Copy the API key and add it to your .env file
Usage
Start both backend and frontend servers
Open http://localhost:3000 in your browser
Upload a PDF resume
Optionally enter a job description
Click "Analyze Resume" to get AI-powered feedback
API Endpoints
POST /api/analyze-resume - Analyze uploaded resume
GET /api/health - Health check endpoint
Error Handling
File type validation (PDF only)
File size limits (10MB max)
AI API error handling
User-friendly error messages
Contributing
Fork the repository
Create a feature branch
Make your changes
Submit a pull request
License
MIT License

Author
Developed by Sujoy Dutta

Support
For support, please open an issue in the repository or contact the developer.

