# ResumeUp.AI

**ResumeUp.AI** is a full-stack MERN web application that leverages Google Gemini AI to analyze resumes and provide personalized feedback, skill improvement suggestions, and interactive quizzes based on detected weaknesses. The platform helps job seekers understand their strengths and areas for growth, making them more competitive in the job market.

## Features
- Upload your PDF resume for instant AI-powered analysis
- Optional job description matching for tailored feedback
- Detailed strengths, weaknesses, and skill recommendations
- Course suggestions to improve your profile
- Interactive quizzes generated from your weaknesses to help you improve
- Modern, responsive UI for a seamless experience

## Tech Stack
- **Frontend:** React.js, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, Multer, PDF-parse, Google Generative AI (Gemini), MongoDB (via Mongoose)

---

## Getting Started: Run Locally

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ResumeUp.AI.git
cd ResumeUp.AI
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following:
```
GOOGLE_API_KEY=your_google_gemini_api_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
# or
npm start
```

### 3. Frontend Setup
Open a new terminal, then:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

The frontend will run on [http://localhost:5173](http://localhost:5173) and proxy API requests to the backend.

---

## Usage
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Sign up or sign in (if authentication is enabled).
3. Upload your PDF resume (and optionally paste a job description).
4. Click **Analyze Resume** to get instant AI-powered feedback.
5. Review your strengths, weaknesses, and recommendations.
6. Click **Start Quiz** to take personalized quizzes based on your weaknesses.
7. Review your quiz results and category-wise scores.

---

## Troubleshooting
- Ensure your Google Gemini API key and MongoDB URI are correct in the `.env` file.
- The backend must be running before starting the frontend.
- For any issues, check the browser console and backend terminal for error messages.

---

## License
MIT License

---

**Developed by Nishant bhalla**

For support, open an issue or contact the developer on [LinkedIn].

