# ResumeUp.AI 🚀

> AI-powered resume analysis and career guidance platform to help you land your dream job.

---

## 🚀 Overview

**ResumeUp.AI** is an intelligent career companion that leverages Google's Gemini AI to analyze your resume, identify skill gaps, and provide personalized job recommendations. Whether you're a fresh graduate or an experienced professional, ResumeUp.AI helps you understand your strengths, improve your weaknesses, and discover opportunities tailored to your profile.

The platform goes beyond simple resume parsing — it generates dynamic quizzes based on your skill gaps, tracks your progress, and provides actionable insights to accelerate your career growth.

---

## ✨ Features

✅ **AI-Powered Resume Analysis** – Upload your resume and get detailed feedback on strengths, weaknesses, and improvement areas using Google Gemini AI.

✅ **Personalized Job Recommendations** – Receive job suggestions with matching scores based on your skills and experience level.

✅ **Dynamic Quiz Generation** – Test your knowledge with AI-generated quizzes targeting your skill gaps across technical, leadership, and soft skills.

✅ **Progress Tracking Dashboard** – Visualize your career growth with achievements, skill improvements, and analytics.

✅ **Secure Authentication** – Sign up with email/password or use Google OAuth 2.0 for quick access.

✅ **Profile Management** – Upload profile pictures with Cloudinary integration and manage your career journey.

---

## 🛠️ Tech Stack

### **Frontend**
- React 19 + Vite
- Tailwind CSS 4 + shadcn/ui
- Framer Motion (animations)
- React Router DOM
- Axios (API calls)
- Recharts (data visualization)

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication + Passport.js (Google OAuth)
- Multer + Cloudinary (file uploads)
- Express Rate Limiter (security)

### **AI & APIs**
- Google Generative AI (Gemini)
- PDF parsing with pdf-parse
- RESTful API architecture

---

## ⚙️ Installation

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key
- Cloudinary Account (for image uploads)

### **1. Clone the Repository**
```bash
git clone https://github.com/Nishant-0203/ResumeUp.AI.git
cd ResumeUp.AI
```

### **2. Backend Setup**
```bash
cd backend
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# GOOGLE_API_KEY=your_gemini_api_key
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# FRONTEND_URL=http://localhost:5173

npm run dev
```

### **3. Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env file with:
# VITE_API_BASE_URL=http://localhost:5000/api

npm run dev
```

### **4. Access the Application**
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## 💻 Usage

1. **Sign Up / Sign In** – Create an account or log in with Google.
2. **Upload Your Resume** – Go to the Analysis page and upload your PDF resume.
3. **Get AI Feedback** – Receive detailed analysis including ATS score, strengths, weaknesses, and skill recommendations.
4. **Take Quizzes** – Test your knowledge with AI-generated questions based on your skill gaps.
5. **View Job Recommendations** – Discover personalized job opportunities with matching scores.
6. **Track Progress** – Monitor your achievements and skill improvements on the dashboard.

---

## 🔗 Links

- **GitHub Repository**: [https://github.com/Nishant-0203/ResumeUp.AI](https://github.com/Nishant-0203/ResumeUp.AI)
- **Live Demo**: _Coming Soon_ 🚧

---

## 👨‍💻 Author

**Nishant Bhalla**  
📧 Email: [nishantbhalla32@gmail.com](mailto:nishantbhalla32@gmail.com)  
🔗 GitHub: [https://github.com/Nishant-0203](https://github.com/Nishant-0203)

---

## 🧠 Learning / Highlights

This project showcases full-stack development with **AI integration**, implementing secure authentication flows (JWT + OAuth), real-time file processing, and dynamic content generation using Google's Gemini AI. It demonstrates best practices in API design, middleware implementation, and modern React patterns with context management.

Built with a focus on **user experience**, **security**, and **scalability** — featuring rate limiting, environment validation, error handling, and modular architecture.

---

## 🛡️ License

This project is licensed under the **MIT License**.

---

<div align="center">

⭐ **Star this repository if you found it helpful!** ⭐

Made with ❤️ by [Nishant Bhalla](https://github.com/Nishant-0203)

</div>
