# 🚀 ResumeUp.AI

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://mongodb.com/)

**AI-Powered Resume Analysis & Career Growth Platform**

Transform your career with intelligent resume analysis, personalized skill recommendations, and AI-generated quizzes designed to accelerate your professional growth.

[🌟 Live Demo](https://resumeup-ai.vercel.app) | [📖 Documentation](https://github.com/Nishant-0203/ResumeUp.AI) | [🐛 Report Bug](https://github.com/Nishant-0203/ResumeUp.AI/issues)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🎨 Frontend Features](#-frontend-features)
- [🔐 Authentication](#-authentication)
- [🌐 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

**ResumeUp.AI** is a comprehensive full-stack MERN application that revolutionizes the way job seekers approach career development. By leveraging Google Gemini AI, it provides intelligent resume analysis, personalized career guidance, and interactive learning experiences.

### 🎪 What Makes ResumeUp.AI Special?

- **🤖 AI-Powered Analysis**: Advanced resume parsing and analysis using Google Gemini AI
- **🎯 Personalized Recommendations**: Tailored job suggestions based on your skills and experience  
- **📚 Interactive Learning**: Dynamic quizzes generated from your resume weaknesses
- **📊 Progress Tracking**: Visual dashboards to monitor your career growth
- **🔐 Secure Authentication**: JWT-based auth with Google OAuth integration
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices

---

## ✨ Key Features

### 🔍 **Resume Analysis Engine**
- **PDF Text Extraction**: Advanced parsing of PDF resumes with error handling
- **AI-Powered Insights**: Comprehensive analysis of strengths, weaknesses, and improvement areas
- **Job Matching**: Optional job description comparison for targeted feedback
- **Structured Data Output**: Organized analysis results in JSON format

### 🎯 **Smart Career Guidance**
- **Skill Gap Analysis**: Identify missing skills for your target roles
- **Course Recommendations**: Curated learning paths based on your weaknesses
- **Job Recommendations**: AI-generated job suggestions with matching scores
- **Career Progress Tracking**: Visual progress indicators and achievement tracking

### 🧠 **Interactive Learning Platform**
- **Dynamic Quiz Generation**: Personalized quizzes based on identified weaknesses
- **Multi-Category Questions**: Technical, Experience, Leadership, and Soft Skills
- **Detailed Explanations**: Learn from incorrect answers with comprehensive explanations
- **Progress Analytics**: Track quiz performance and improvement over time

### 👤 **User Experience**
- **User Dashboard**: Comprehensive overview of analysis history and progress
- **Profile Management**: Upload profile pictures with automatic image optimization
- **Contact System**: Built-in contact form for user support and feedback
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### **Frontend**
- **⚛️ React 19.1.0** - Modern UI library with hooks and context
- **🎨 Tailwind CSS 4.1.11** - Utility-first CSS framework
- **📱 Framer Motion 12.23.9** - Smooth animations and transitions
- **🎯 Radix UI** - Accessible, unstyled UI components
- **📊 Recharts 2.15.4** - Beautiful, composable charts
- **🔀 React Router DOM 7.7.0** - Client-side routing
- **📡 Axios 1.10.0** - HTTP client for API requests

### **Backend**
- **🟢 Node.js** - JavaScript runtime environment
- **🚀 Express.js 4.18.2** - Fast, minimalist web framework
- **🍃 MongoDB** - NoSQL database with Mongoose ODM
- **🤖 Google Generative AI 0.2.1** - Gemini AI integration
- **🔐 JWT + Passport** - Authentication and authorization
- **☁️ Cloudinary** - Image upload and optimization
- **📄 PDF-Parse** - PDF text extraction
- **🛡️ bcryptjs** - Password hashing

### **DevOps & Tools**
- **⚡ Vite 7.0.4** - Lightning-fast build tool
- **🔍 ESLint** - Code linting and formatting
- **🔧 Nodemon** - Development server auto-restart
- **📦 Multer** - File upload middleware

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Frontend - React/Vite] --> B[API Gateway - Express.js]
    B --> C[Authentication - JWT/Passport]
    B --> D[File Upload - Multer/Cloudinary]
    B --> E[AI Engine - Google Gemini]
    B --> F[Database - MongoDB]
    
    C --> G[Google OAuth]
    E --> H[Resume Analysis]
    E --> I[Quiz Generation]
    E --> J[Job Recommendations]
    
    F --> K[Users Collection]
    F --> L[Analysis Collection]
    F --> M[Jobs Collection]
    F --> N[Contact Collection]
```

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) 
- **MongoDB** (local or Atlas cloud)
- **Google Gemini API Key** ([Get it here](https://aistudio.google.com/app/apikey))

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nishant-0203/ResumeUp.AI.git
   cd ResumeUp.AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the `backend` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/resumeup-ai
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumeup-ai
   
   # AI Services
   GOOGLE_API_KEY=your_google_gemini_api_key_here
   
   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_here
   SESSION_SECRET=your_session_secret_here
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Cloudinary (Optional - for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start Development Servers**

   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)
   - Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📁 Project Structure

```
ResumeUp.AI/
├── 📁 backend/
│   ├── 📁 config/           # Configuration files
│   │   ├── cloudinary.js    # Cloudinary setup
│   │   └── validateEnv.js   # Environment validation
│   ├── 📁 controllers/      # Route controllers
│   │   ├── analysisController.js
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── jobController.js
│   │   ├── quizController.js
│   │   └── userController.js
│   ├── 📁 db/              # Database configuration
│   │   └── mongoose.js
│   ├── 📁 middleware/      # Custom middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── errorHandler.js # Global error handling
│   │   ├── rateLimiter.js  # Rate limiting
│   │   └── upload.js       # File upload handling
│   ├── 📁 models/          # Database models
│   │   ├── Analysis.js
│   │   ├── Contact.js
│   │   ├── Job.js
│   │   └── User.js
│   ├── 📁 routes/          # API routes
│   │   ├── analysisRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── quizRoutes.js
│   │   └── userRoutes.js
│   ├── 📁 uploads/         # Static file uploads
│   ├── 📁 utils/           # Utility functions
│   │   └── responseFormatter.js
│   ├── package.json
│   ├── server.js           # Main server file
│   └── start-server.js     # Server startup script
│
├── 📁 frontend/
│   ├── 📁 public/          # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/  # Reusable components
│   │   │   ├── 📁 contact/     # Contact page components
│   │   │   ├── 📁 dashboard/   # Dashboard components
│   │   │   ├── 📁 layout/      # Layout components
│   │   │   ├── 📁 section/     # Homepage sections
│   │   │   └── 📁 ui/          # UI components
│   │   ├── 📁 contexts/    # React contexts
│   │   │   └── UserContext.jsx
│   │   ├── 📁 lib/         # Utility libraries
│   │   ├── 📁 pages/       # Page components
│   │   │   ├── 📁 user/        # User-related pages
│   │   │   ├── analysis.jsx
│   │   │   ├── contact.jsx
│   │   │   ├── index.jsx
│   │   │   └── quiz.jsx
│   │   ├── 📁 services/    # API service functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── components.json     # shadcn/ui config
│   ├── tailwind.config.js  # Tailwind configuration
│   ├── vite.config.js      # Vite configuration
│   └── package.json
│
├── 📄 README.md
├── 📄 FIXES_IMPLEMENTED.md
└── 📄 IMAGE_UPLOAD_FEATURE.md
```

---

## 🔧 Configuration

### Environment Variables

#### Required Variables
- `GOOGLE_API_KEY` - Google Gemini AI API key
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing

#### Optional Variables
- `GOOGLE_CLIENT_ID` - For Google OAuth login
- `GOOGLE_CLIENT_SECRET` - For Google OAuth login
- `CLOUDINARY_CLOUD_NAME` - For image uploads
- `CLOUDINARY_API_KEY` - For image uploads
- `CLOUDINARY_API_SECRET` - For image uploads

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Analysis Endpoint**: 10 requests per 15 minutes
- **Auth Endpoints**: 20 requests per 15 minutes

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully.",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "image": null,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/auth/signin`
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Resume Analysis

#### POST `/api/analyze-resume`
Upload and analyze a PDF resume.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
- `resume` (file): PDF file
- `jobDescription` (optional): Job description text

**Response:**
```json
{
  "analysis": "Raw AI analysis text",
  "analysisId": "analysis_id",
  "structuredData": {
    "strengths": ["Strong technical skills", "Good experience"],
    "weaknesses": ["Limited leadership experience"],
    "skillsToImprove": ["Project Management", "Leadership"],
    "courseRecommendations": ["Leadership Course", "PM Certification"],
    "overallEvaluation": "Strong candidate with growth potential"
  },
  "success": true
}
```

### Quiz Generation

#### GET `/api/quiz/generate/:analysisId`
Generate quizzes based on resume analysis.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "quizzes": [
    {
      "weakness": "Limited leadership experience",
      "quiz": {
        "questions": [
          {
            "question": "What is the primary role of a team leader?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0,
            "explanation": "Detailed explanation here",
            "category": "Leadership"
          }
        ]
      }
    }
  ],
  "basedOn": {
    "weaknesses": ["Limited leadership experience"]
  },
  "success": true
}
```

### Job Recommendations

#### GET `/api/jobs/recommendations`
Get personalized job recommendations.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "title": "Full Stack Developer",
    "company": "Tech Corp",
    "role": "Develop and maintain web applications",
    "location": "San Francisco, CA",
    "workType": "Remote",
    "jobType": "Full-time",
    "experienceLevel": "Mid Level",
    "compensationType": "Paid",
    "salary": "$80,000 - $120,000",
    "requiredSkills": ["React", "Node.js", "MongoDB"],
    "matchingScore": "85",
    "recommendations": "Focus on improving React skills",
    "nextSteps": ["Build portfolio projects", "Practice algorithms"]
  }
]
```

### User Management

#### POST `/api/user/upload-image`
Upload user profile image.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
- `image` (file): Image file (max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully.",
  "image": "uploads/1234567890-image.jpg"
}
```

---

## 🎨 Frontend Features

### Pages & Components

#### 🏠 **Homepage** (`/`)
- Hero section with animated background
- Feature highlights and testimonials
- How it works section
- Pricing and FAQ sections

#### 📊 **Dashboard** (`/user/dashboard`)
- Resume analysis summary
- Progress tracking charts
- Job recommendations
- Skill improvement sections
- Interactive quiz access
- Achievement tracking

#### 📄 **Analysis Page** (`/analysis`)
- Resume upload interface
- Job description input (optional)
- Real-time analysis results
- Structured feedback display

#### 🧠 **Quiz Page** (`/quiz`)
- Dynamic quiz interface
- Category-based questions
- Progress tracking
- Detailed explanations

#### 🔐 **Authentication**
- Sign up / Sign in forms
- Google OAuth integration
- Protected route handling
- JWT token management

### UI Components

#### Reusable Components
- **Button** - Consistent button styling with variants
- **Card** - Flexible card layouts for content
- **Progress** - Progress bars and circular indicators
- **Avatar** - User profile image display
- **Accordion** - Collapsible content sections

#### Animations
- **Framer Motion** integration for smooth transitions
- **Gradient Animations** for dynamic backgrounds
- **Hover Effects** for interactive elements
- **Page Transitions** for seamless navigation

---

## 🔐 Authentication

### JWT-Based Authentication
- Secure token-based authentication
- 7-day token expiration
- Automatic token refresh handling
- Protected route middleware

### Google OAuth Integration
- One-click Google sign-in
- Automatic user profile creation
- Secure callback handling
- Session management

### Security Features
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- CORS configuration
- Environment variable validation

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: `Vite`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

### Backend Deployment (Railway/Heroku)

1. **Prepare for Deployment**
   ```bash
   # Add start script in package.json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

2. **Environment Variables**
   Set all required environment variables in your deployment platform:
   - `GOOGLE_API_KEY`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `SESSION_SECRET`
   - `FRONTEND_URL` (your deployed frontend URL)

3. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

### Database Deployment (MongoDB Atlas)

1. **Create Atlas Cluster**
   - Visit [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster
   - Configure network access (0.0.0.0/0 for development)

2. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/resumeup-ai
   ```

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test
```

### Test Coverage

- Unit tests for controllers
- Integration tests for API endpoints
- Component testing for React components
- E2E testing for user flows

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with descriptive messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Code Style

- **Frontend**: ESLint configuration with React best practices
- **Backend**: Node.js best practices with Express conventions
- **Formatting**: Prettier for consistent code formatting

---

## 🐛 Known Issues & Fixes

### Recent Fixes
- ✅ Fixed JWT authentication middleware
- ✅ Improved error handling for file uploads
- ✅ Added image upload functionality
- ✅ Enhanced rate limiting
- ✅ Fixed Google OAuth callback

For detailed fix history, see [FIXES_IMPLEMENTED.md](./FIXES_IMPLEMENTED.md)

---

## 🚧 Roadmap

### Upcoming Features
- [ ] **Advanced Analytics Dashboard**
- [ ] **Resume Templates & Builder**
- [ ] **Video Interview Practice**
- [ ] **LinkedIn Integration**
- [ ] **Mobile App Development**
- [ ] **Multi-language Support**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nishant Bhalla**
- GitHub: [@Nishant-0203](https://github.com/Nishant-0203)
- LinkedIn: [Connect with me](https://linkedin.com/in/nishant-bhalla)
- Email: [Contact](mailto:nishant@example.com)

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **MongoDB** for reliable database services
- **Cloudinary** for image management
- **React & Tailwind** communities for excellent documentation
- **Open Source Contributors** for inspiration and guidance

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Nishant Bhalla](https://github.com/Nishant-0203)

</div>

