# 🚀 ResumeUp.AI# 🚀 ResumeUp.AI



<div align="center"><div align="center">



[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)

[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



**AI-Powered Resume Analysis & Career Growth Platform****AI-Powered Resume Analysis & Career Growth Platform**



[🌟 Live Demo](https://resumeup-ai.vercel.app) | [🐛 Report Bug](https://github.com/Nishant-0203/ResumeUp.AI/issues)[🌟 Live Demo](https://resumeup-ai.vercel.app) | [🐛 Report Bug](https://github.com/Nishant-0203/ResumeUp.AI/issues)



</div></div>



------



## 🎯 About## 🎯 About



**ResumeUp.AI** transforms your career journey with AI-powered resume analysis, personalized job recommendations, and interactive quizzes. Built with the MERN stack and Google Gemini AI to help job seekers identify strengths, improve weaknesses, and accelerate professional growth.**ResumeUp.AI** transforms your career with AI-powered resume analysis, personalized job recommendations, and interactive quizzes. Built with the MERN stack and Google Gemini AI.



## ✨ Key Features## ✨ Key Features



- 🤖 **AI Resume Analysis** - PDF parsing with Google Gemini AI insights- 🤖 **AI Resume Analysis** - PDF parsing with Google Gemini AI insights

- 🎯 **Job Recommendations** - Personalized suggestions with matching scores- 🎯 **Job Recommendations** - Personalized suggestions with matching scores

- 📚 **Smart Quizzes** - Dynamic quizzes based on skill gaps- 📚 **Smart Quizzes** - Dynamic quizzes based on skill gaps

- 📊 **Progress Tracking** - Visual dashboards and analytics- 📊 **Progress Tracking** - Visual dashboards and analytics

- 🔐 **Secure Auth** - JWT + Google OAuth integration- 🔐 **Secure Auth** - JWT + Google OAuth integration

- 📱 **Responsive Design** - Works seamlessly on all devices- 📱 **Responsive Design** - Works seamlessly on all devices



## 🛠️ Tech Stack## 🛠️ Tech Stack



**Frontend:** React 19 • Tailwind CSS • Framer Motion • Recharts • Vite**Frontend:** React 19 • Tailwind CSS • Framer Motion • Recharts • Vite



**Backend:** Node.js • Express • MongoDB • Mongoose • Google Gemini AI • JWT • Cloudinary**Backend:** Node.js • Express • MongoDB • Mongoose • Google Gemini AI • JWT • Cloudinary------



---



## 🚀 Quick Start## 🚀 Quick Start



### Prerequisites### Prerequisites



- Node.js 18+- Node.js 18+

- MongoDB (local or Atlas)- MongoDB (local or Atlas)

- Google Gemini API Key ([Get it here](https://aistudio.google.com/app/apikey))- Google Gemini API Key ([Get it here](https://aistudio.google.com/app/apikey))



### Installation### Installation



```bash```bash

# Clone repository# Clone repository

git clone https://github.com/Nishant-0203/ResumeUp.AI.gitgit clone https://github.com/Nishant-0203/ResumeUp.AI.git

cd ResumeUp.AIcd ResumeUp.AI



# Backend setup# Backend setup

cd backendcd backend

npm installnpm install



# Frontend setup# Frontend setup

cd ../frontendcd ../frontend

npm installnpm install

``````



### Environment Setup### Environment Setup



Create `backend/.env`:Create `backend/.env`:



```env```env

PORT=5000PORT=5000

NODE_ENV=developmentNODE_ENV=development

FRONTEND_URL=http://localhost:5173FRONTEND_URL=http://localhost:5173

      

MONGODB_URI=mongodb://localhost:27017/resumeup-aiMONGODB_URI=mongodb://localhost:27017/resumeup-ai

GOOGLE_API_KEY=your_google_gemini_api_keyGOOGLE_API_KEY=your_google_gemini_api_key

JWT_SECRET=your_jwt_secretJWT_SECRET=your_jwt_secret

SESSION_SECRET=your_session_secretSESSION_SECRET=your_session_secret



# Optional - for Google OAuth# Optional

GOOGLE_CLIENT_ID=your_google_client_idGOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secretGOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

# Optional - for image uploadsCLOUDINARY_API_KEY=your_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_nameCLOUDINARY_API_SECRET=your_api_secret

CLOUDINARY_API_KEY=your_api_key```

CLOUDINARY_API_SECRET=your_api_secret

```### Run Development Servers



### Run Development Servers```bash

# Backend (Terminal 1)

```bashcd backend

# Backend (Terminal 1)npm run dev

cd backend

npm run dev# Frontend (Terminal 2)

cd frontend

# Frontend (Terminal 2)npm run dev

cd frontend```

npm run dev

```**Access:** Frontend at [http://localhost:5173](http://localhost:5173)



**Access:** Frontend at [http://localhost:5173](http://localhost:5173)## 📚 API Endpoints   



---   # Database



## 📚 API Endpoints### Authentication   MONGODB_URI=mongodb://localhost:27017/resumeup-ai



### Authentication   # OR for MongoDB Atlas:



| Method | Endpoint | Description | Auth Required || Method | Endpoint | Description | Auth Required |   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumeup-ai

|--------|----------|-------------|---------------|

| POST | `/api/auth/signup` | Register new user | No ||--------|----------|-------------|---------------|   

| POST | `/api/auth/signin` | Login user | No |

| GET | `/api/auth/google` | Google OAuth login | No || POST | `/api/auth/signup` | Register new user | No |   # AI Services



### Resume Analysis| POST | `/api/auth/signin` | Login user | No |   GOOGLE_API_KEY=your_google_gemini_api_key_here



| Method | Endpoint | Description | Auth Required || GET | `/api/auth/google` | Google OAuth login | No |   

|--------|----------|-------------|---------------|

| POST | `/api/analyze-resume` | Upload and analyze resume PDF | Yes || GET | `/api/auth/google/callback` | Google OAuth callback | No |   # Authentication

| GET | `/api/analysis` | Get all user analyses | Yes |

| GET | `/api/analysis/:id` | Get specific analysis | Yes |   JWT_SECRET=your_super_secret_jwt_key_here



### Quiz & Jobs### Resume Analysis   SESSION_SECRET=your_session_secret_here



| Method | Endpoint | Description | Auth Required |   

|--------|----------|-------------|---------------|

| GET | `/api/quiz/generate/:analysisId` | Generate quiz from analysis | Yes || Method | Endpoint | Description | Auth Required |   # Google OAuth (Optional)

| GET | `/api/jobs/recommendations` | Get personalized job recommendations | Yes |

|--------|----------|-------------|---------------|   GOOGLE_CLIENT_ID=your_google_client_id

### User

| POST | `/api/analyze-resume` | Upload and analyze resume PDF | Yes |   GOOGLE_CLIENT_SECRET=your_google_client_secret

| Method | Endpoint | Description | Auth Required |

|--------|----------|-------------|---------------|| GET | `/api/analysis` | Get all user analyses | Yes |   

| GET | `/api/user/profile` | Get user profile | Yes |

| POST | `/api/user/upload-image` | Upload profile image | Yes || GET | `/api/analysis/:id` | Get specific analysis | Yes |   # Cloudinary (Optional - for image uploads)



### Contact   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name



| Method | Endpoint | Description | Auth Required |### Quiz   CLOUDINARY_API_KEY=your_cloudinary_api_key

|--------|----------|-------------|---------------|

| POST | `/api/contact` | Submit contact form | No |   CLOUDINARY_API_SECRET=your_cloudinary_api_secret



---| Method | Endpoint | Description | Auth Required |   ```



## 📁 Project Structure|--------|----------|-------------|---------------|



```| GET | `/api/quiz/generate/:analysisId` | Generate quiz from analysis | Yes |5. **Start Development Servers**

ResumeUp.AI/

├── backend/

│   ├── config/          # Configuration (Cloudinary, validation)

│   ├── controllers/     # Route controllers### Jobs   **Backend** (Terminal 1):

│   ├── db/             # Database configuration

│   ├── middleware/     # Auth, error handling, rate limiting   ```bash

│   ├── models/         # Database models

│   ├── routes/         # API routes| Method | Endpoint | Description | Auth Required |   cd backend

│   ├── utils/          # Utility functions

│   └── server.js       # Main server file|--------|----------|-------------|---------------|   npm run dev

│

├── frontend/| GET | `/api/jobs/recommendations` | Get personalized job recommendations | Yes |   ```

│   ├── public/         # Static assets

│   ├── src/

│   │   ├── components/ # Reusable components

│   │   ├── contexts/   # React contexts### User   **Frontend** (Terminal 2):

│   │   ├── pages/      # Page components

│   │   ├── services/   # API service functions   ```bash

│   │   └── App.jsx     # Main app component

│   ├── tailwind.config.js| Method | Endpoint | Description | Auth Required |   cd frontend

│   └── vite.config.js

│|--------|----------|-------------|---------------|   npm run dev

└── README.md

```| GET | `/api/user/profile` | Get user profile | Yes |   ```



---| POST | `/api/user/upload-image` | Upload profile image | Yes |



## 🌐 Deployment6. **Access the Application**



### Frontend (Vercel)### Contact   - Frontend: [http://localhost:5173](http://localhost:5173)



1. Push code to GitHub   - Backend API: [http://localhost:5000](http://localhost:5000)

2. Import repository on [Vercel](https://vercel.com)

3. Configure build settings:| Method | Endpoint | Description | Auth Required |   - Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

   - Framework: `Vite`

   - Root Directory: `frontend`|--------|----------|-------------|---------------|

   - Build Command: `npm run build`

   - Output Directory: `dist`| POST | `/api/contact` | Submit contact form | No |---



### Backend (Railway/Render)



1. Deploy `backend` directory---## 📁 Project Structure

2. Set all environment variables

3. Ensure start script: `node server.js`



### Database (MongoDB Atlas)## 🌐 Deployment```



1. Create free cluster at [MongoDB Atlas](https://mongodb.com/atlas)ResumeUp.AI/

2. Get connection string

3. Update `MONGODB_URI` in environment variables### Frontend Deployment (Vercel)├── 📁 backend/



---│   ├── 📁 config/           # Configuration files



## 🎨 Features Deep Dive1. Push your code to GitHub│   │   ├── cloudinary.js    # Cloudinary setup



### Resume Analysis Engine2. Visit [vercel.com](https://vercel.com) and import your repository│   │   └── validateEnv.js   # Environment validation

- PDF text extraction with advanced parsing

- AI-powered insights for strengths and weaknesses3. Configure build settings:│   ├── 📁 controllers/      # Route controllers

- Optional job description comparison

- Structured analysis results in JSON format   - **Framework Preset**: Vite│   │   ├── analysisController.js



### Smart Career Guidance   - **Root Directory**: `frontend`│   │   ├── authController.js

- Skill gap analysis with course recommendations

- Personalized job recommendations with matching scores   - **Build Command**: `npm run build`│   │   ├── contactController.js

- Career progress tracking with visual indicators

- Achievement tracking system   - **Output Directory**: `dist`│   │   ├── jobController.js



### Interactive Learning Platform│   │   ├── quizController.js

- Dynamic quiz generation based on identified weaknesses

- Multi-category questions (Technical, Leadership, Soft Skills)### Backend Deployment (Railway/Render/Heroku)│   │   └── userController.js

- Detailed explanations for incorrect answers

- Progress analytics and performance tracking│   ├── 📁 db/              # Database configuration



### User Experience1. Set all environment variables in your platform│   │   └── mongoose.js

- Comprehensive user dashboard

- Profile management with image upload2. Deploy the `backend` directory│   ├── 📁 middleware/      # Custom middleware

- Built-in contact system

- Fully responsive design3. Ensure `start` script is configured in `package.json`│   │   ├── auth.js         # JWT authentication



---│   │   ├── errorHandler.js # Global error handling



## 🔐 Security Features### Database (MongoDB Atlas)│   │   ├── rateLimiter.js  # Rate limiting



- JWT-based authentication with 7-day expiration│   │   └── upload.js       # File upload handling

- Password hashing with bcrypt

- Rate limiting on sensitive endpoints1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)│   ├── 📁 models/          # Database models

- CORS configuration

- Environment variable validation2. Get your connection string│   │   ├── Analysis.js

- Protected route middleware

3. Update `MONGODB_URI` in your environment variables│   │   ├── Contact.js

---

│   │   ├── Job.js

## 🤝 Contributing

---│   │   └── User.js

We welcome contributions! Follow these steps:

│   ├── 📁 routes/          # API routes

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/amazing-feature`)## 🤝 Contributing│   │   ├── analysisRoutes.js

3. Commit your changes (`git commit -m "Add amazing feature"`)

4. Push to your branch (`git push origin feature/amazing-feature`)│   │   ├── authRoutes.js

5. Open a Pull Request

We welcome contributions! Please follow these steps:│   │   ├── contactRoutes.js

### Development Guidelines

- Follow existing code style and conventions│   │   ├── jobRoutes.js

- Add tests for new features

- Update documentation as needed1. Fork the repository│   │   ├── quizRoutes.js

- Ensure all tests pass before submitting PR

2. Create a feature branch (`git checkout -b feature/amazing-feature`)│   │   └── userRoutes.js

---

3. Commit your changes (`git commit -m "Add amazing feature"`)│   ├── 📁 uploads/         # Static file uploads

## 🐛 Known Issues

4. Push to your branch (`git push origin feature/amazing-feature`)│   ├── 📁 utils/           # Utility functions

For detailed fix history, see [FIXES_IMPLEMENTED.md](./FIXES_IMPLEMENTED.md)

5. Open a Pull Request│   │   └── responseFormatter.js

---

│   ├── package.json

## 🚧 Roadmap

---│   ├── server.js           # Main server file

### Upcoming Features

- [ ] Advanced Analytics Dashboard│   └── start-server.js     # Server startup script

- [ ] Resume Templates & Builder

- [ ] Video Interview Practice## 📄 License│

- [ ] LinkedIn Integration

- [ ] Mobile App Development├── 📁 frontend/

- [ ] Multi-language Support

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.│   ├── 📁 public/          # Static assets

---

│   ├── 📁 src/

## 📄 License

---│   │   ├── 📁 components/  # Reusable components

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

│   │   │   ├── 📁 contact/     # Contact page components

---

## 👨‍💻 Author│   │   │   ├── 📁 dashboard/   # Dashboard components

## 👨‍💻 Author

│   │   │   ├── 📁 layout/      # Layout components

**Nishant Bhalla**

- GitHub: [@Nishant-0203](https://github.com/Nishant-0203)**Nishant Bhalla**│   │   │   ├── 📁 section/     # Homepage sections

- LinkedIn: [Connect with me](https://linkedin.com/in/nishant-bhalla)

- GitHub: [@Nishant-0203](https://github.com/Nishant-0203)│   │   │   └── 📁 ui/          # UI components

---

- LinkedIn: [Connect with me](https://linkedin.com/in/nishant-bhalla)│   │   ├── 📁 contexts/    # React contexts

## 🙏 Acknowledgments

│   │   │   └── UserContext.jsx

- **Google Gemini AI** for powerful AI capabilities

- **MongoDB** for reliable database services---│   │   ├── 📁 lib/         # Utility libraries

- **Cloudinary** for image management

- **React & Tailwind** communities for excellent documentation│   │   ├── 📁 pages/       # Page components

- **Open Source Contributors** for inspiration and guidance

## 🙏 Acknowledgments│   │   │   ├── 📁 user/        # User-related pages

---

│   │   │   ├── analysis.jsx

<div align="center">

- **Google Gemini AI** for powerful AI capabilities│   │   │   ├── contact.jsx

**⭐ Star this repository if you found it helpful!**

- **MongoDB** for reliable database services│   │   │   ├── index.jsx

Made with ❤️ by [Nishant Bhalla](https://github.com/Nishant-0203)

- **Cloudinary** for image management│   │   │   └── quiz.jsx

</div>

- **React & Tailwind** communities for excellent documentation│   │   ├── 📁 services/    # API service functions

- **Open Source Contributors** for inspiration and guidance│   │   ├── App.jsx         # Main app component

│   │   └── main.jsx        # App entry point

---│   ├── components.json     # shadcn/ui config

│   ├── tailwind.config.js  # Tailwind configuration

<div align="center">│   ├── vite.config.js      # Vite configuration

│   └── package.json

**⭐ Star this repository if you found it helpful!**│

├── 📄 README.md

Made with ❤️ by [Nishant Bhalla](https://github.com/Nishant-0203)├── 📄 FIXES_IMPLEMENTED.md

└── 📄 IMAGE_UPLOAD_FEATURE.md

</div>```


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
   mongodb+srv://username:password@cluster.mongodb.net
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

