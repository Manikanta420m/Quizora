# 🎓 Quizora — AI-Powered Quiz Generation & Learning Platform

> **Create. Practice. Compete. Improve.**

**Quizora** is a full-stack AI-powered quiz platform designed to make learning more interactive, personalized, and engaging. It allows students to generate and attempt quizzes using AI, upload documents and generate quizzes from their content, track learning progress, compete on leaderboards, maintain daily streaks, and receive intelligent explanations and hints.

Teachers can create and manage quizzes, monitor student performance, and analyze learning outcomes through a dedicated dashboard.

---

## ✨ Features

### 🤖 AI-Powered Quiz Generation

* Generate quizzes from any topic using AI
* Select quiz difficulty:

  * Easy
  * Medium
  * Hard
* Customize the number of questions
* Add custom instructions for quiz generation
* Automatically generate:

  * Questions
  * Multiple-choice options
  * Correct answers
  * Explanations
* AI-generated quizzes are validated before being stored

### 📄 Document-to-Quiz Generation

Upload learning material and automatically generate quizzes from it.

Supported content includes:

* PDF
* TXT
* Markdown
* Document notes

The platform extracts the document content and uses AI to generate questions directly from the provided material.

### 💡 AI Learning Assistant

Quizora provides AI-powered learning assistance during and after quizzes.

#### AI Hints

Students can request hints without directly revealing the correct answer.

#### AI Explanations

After answering a question, students can receive:

* Concept explanation
* Why the correct answer is correct
* Distractor analysis
* Common misconceptions
* Memory tricks / mnemonics

#### Similar Questions

Generate additional questions targeting the same underlying concept for extra practice.

### 🧠 Adaptive Learning

Quizora can identify weak topics and generate targeted practice quizzes.

For example:

```text
Weak Topics
   ↓
JavaScript
React
Node.js
   ↓
AI analyzes weaknesses
   ↓
Personalized practice quiz
```

This allows students to focus on concepts they need to improve.

---

## 🎮 Gamification

Quizora makes learning competitive and engaging.

### 🔥 Daily Streaks

Maintain a learning streak by regularly completing quizzes.

### ⭐ XP System

Students earn experience points by completing quizzes and achieving good scores.

### 🏆 Leaderboard

Students can compare their progress with other learners through a competitive leaderboard.

### 🥇 Achievements

Unlock badges based on learning milestones and accomplishments.

Example achievements:

* 🎯 First Quiz
* 🔥 7-Day Streak
* ⭐ Perfect Score
* 🧠 Quiz Master
* 🚀 1000 XP
* 🏆 Top Performer

---

## 👨‍🎓 Student Dashboard

The student dashboard provides a centralized view of learning progress.

### Dashboard includes

* Total quizzes attempted
* Average score
* Total XP
* Current streak
* Longest streak
* Recent quiz attempts
* Weak topics
* Recommended quizzes
* Achievement badges
* Leaderboard position
* Learning activity

### Learning Flow

```text
Choose Topic
     ↓
Generate / Select Quiz
     ↓
Attempt Quiz
     ↓
Receive Score
     ↓
Review Answers
     ↓
Get AI Explanations
     ↓
Identify Weak Topics
     ↓
Practice Again
```

---

## 👨‍🏫 Teacher Dashboard

Teachers can manage quizzes and monitor student learning.

### Features

* Create quizzes manually
* Generate quizzes using AI
* Edit and delete quizzes
* View quiz statistics
* Monitor student performance
* Analyze average scores
* Identify difficult questions
* Track quiz attempts
* View student progress
* Manage learning content

---

## 🔐 Authentication & Authorization

Quizora supports secure authentication and role-based access.

### Authentication

* Email/password authentication
* Password hashing
* JWT authentication
* Access tokens
* Refresh tokens
* Google authentication support

### User Roles

```text
Student
   ├── Attempt quizzes
   ├── Generate practice quizzes
   ├── Track progress
   ├── Earn XP
   └── View leaderboard

Teacher
   ├── Create quizzes
   ├── Manage quizzes
   ├── View analytics
   └── Monitor students

Admin
   ├── Platform management
   ├── User management
   └── Administrative operations
```

---

## 📊 Quiz Analytics

Quizora tracks detailed quiz performance.

Metrics include:

* Score
* Percentage
* Correct answers
* Incorrect answers
* Time spent
* XP earned
* Pass/fail status
* Question-level performance
* Quiz attempt history

This data can be used to understand learning patterns and identify areas for improvement.

---

## 🤖 AI Architecture

Quizora supports external AI providers with a built-in fallback engine.

```text
                  Quizora
                     │
                     ▼
             AI Quiz Service
                     │
          ┌──────────┴──────────┐
          │                     │
       Gemini                 OpenAI
          │                     │
          └──────────┬──────────┘
                     │
                AI Response
                     │
                     ▼
               Zod Validation
                     │
                     ▼
                Quiz Service
                     │
                     ▼
                 MongoDB
```

If an external AI provider is unavailable, Quizora can fall back to its built-in question generation engine.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* DaisyUI
* React Router
* Axios

### Backend

* Node.js
* Express.js
* JavaScript
* MongoDB
* Mongoose
* Redis
* JWT
* bcryptjs
* Zod

### AI

* Google Gemini
* OpenAI
* Custom fallback quiz generation engine

### Authentication

* JWT
* Google OAuth
* bcryptjs

### Development

* Git
* GitHub
* npm
* ESLint
* Nodemon

---

## 🏗️ Project Architecture

```text
Quizora/
│
├── backend/
│   │
│   ├── config/
│   │   ├── env.js
│   │   ├── db.js
│   │   └── redis.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   ├── QuizAttempt.js
│   │   └── Achievement.js
│   │
│   ├── validators/
│   │   ├── authValidators.js
│   │   └── quizValidators.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── quizService.js
│   │   ├── aiService.js
│   │   ├── leaderboardService.js
│   │   ├── achievementService.js
│   │   ├── analyticsService.js
│   │   └── pdfService.js
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── scripts/
│   ├── tests/
│   │
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── package.json
├── .gitignore
└── README.md
```

---

## 🔄 Backend Architecture

Quizora follows a layered backend architecture.

```text
Client
  │
  ▼
Routes
  │
  ▼
Middleware
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ├── AI Services
  ├── Quiz Services
  ├── Auth Services
  ├── Analytics
  ├── Leaderboard
  └── Achievements
  │
  ▼
Models
  │
  ▼
MongoDB / Redis
```

This separation keeps business logic independent from HTTP controllers and makes the backend easier to test and maintain.

---

## 🗄️ Database Models

### User

Stores:

* Name
* Email
* Password hash
* Authentication provider
* Role
* Avatar
* XP
* Streak
* Timestamps

### Quiz

Stores:

* Title
* Description
* Topic
* Difficulty
* Questions
* Time limit
* Source type
* Source metadata
* Creator

### Quiz Attempt

Stores:

* User
* Quiz
* Score
* Percentage
* Pass/fail status
* XP earned
* Time spent
* Individual answers

### Achievement

Stores:

* User
* Badge
* Badge tier
* Unlock date
* Metadata

---

## ⚡ Redis Usage

Redis is used for fast-access functionality such as:

* Leaderboards
* Caching
* Rate limiting
* Temporary application data

Example:

```text
Quiz Attempt
     ↓
XP Calculation
     ↓
Redis Leaderboard
     ↓
Updated Ranking
```

---

## 🔒 Security

Quizora implements several security practices:

* Password hashing with bcrypt
* JWT-based authentication
* Role-based authorization
* Environment variable configuration
* Request validation using Zod
* MongoDB schema validation
* Protected API routes
* API-key protection
* Server-side quiz answer validation

> Never commit `.env` files or API keys to GitHub.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quizora.git
cd quizora
```

### 2. Install dependencies

```bash
npm install
```

If dependencies are managed separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create:

```text
backend/.env
```

Example:

```env
NODE_ENV=development

PORT=5001

MONGODB_URI=mongodb://127.0.0.1:27017/quizora

REDIS_URL=redis://127.0.0.1:6379

CLIENT_URL=http://localhost:5173

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

AI_API_KEY=your_ai_api_key

GOOGLE_CLIENT_ID=your_google_client_id
```

### Important

Do not commit:

```text
.env
.env.*
```

Commit an example configuration instead:

```text
.env.example
```

---

## ▶️ Running the Project

### Start Backend

```bash
npm run dev:backend
```

### Start Frontend

```bash
npm run dev:frontend
```

Or run them individually:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

The development servers will normally run on:

```text
Frontend → http://localhost:5173
Backend  → http://localhost:5001
```

---

## 🧪 Testing

Run backend tests:

```bash
npm run test:backend
```

Run frontend tests:

```bash
npm run test:frontend
```

Run all tests:

```bash
npm test
```

---

## 🧹 Code Quality

Run frontend linting:

```bash
npm run lint
```

Build the frontend:

```bash
npm run build:frontend
```

---

## 🐳 Docker

Quizora can also be run using Docker.

Start the containers:

```bash
npm run docker:up
```

Stop the containers:

```bash
npm run docker:down
```

---

## 📡 API Overview

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/google
GET    /api/auth/me
```

### Quizzes

```text
GET    /api/quizzes
GET    /api/quizzes/:id
POST   /api/quizzes
DELETE /api/quizzes/:id
POST   /api/quizzes/:id/attempt
```

### AI

```text
POST   /api/ai/generate
POST   /api/ai/generate-document
POST   /api/ai/hint
POST   /api/ai/explain
POST   /api/ai/similar-question
POST   /api/ai/weak-topic-practice
```

> Adjust these paths to match the final route files in the project.

---

## 🧠 Example AI Quiz Generation

Request:

```json
{
  "topic": "JavaScript",
  "difficulty": "medium",
  "numberOfQuestions": 5,
  "customInstructions": "Focus on asynchronous programming and promises"
}
```

The AI service generates structured quiz data:

```json
{
  "title": "JavaScript Async Programming",
  "difficulty": "medium",
  "questions": [
    {
      "question": "Which queue has priority over the macrotask queue?",
      "options": [
        "Microtask queue",
        "Render queue",
        "Timer queue",
        "I/O queue"
      ],
      "correctAnswer": 0,
      "explanation": "Microtasks are processed before the next macrotask."
    }
  ]
}
```

The generated result is validated before being saved.

---

## 🎯 Future Roadmap

### Phase 1 — Core Platform

* [x] Authentication
* [x] User roles
* [x] Quiz creation
* [x] Quiz attempts
* [x] MongoDB integration
* [x] Redis integration

### Phase 2 — AI

* [x] AI quiz generation
* [x] AI hints
* [x] AI explanations
* [x] Similar questions
* [x] Weak-topic practice
* [x] Document-to-quiz generation

### Phase 3 — Gamification

* [x] XP
* [x] Streaks
* [x] Leaderboard
* [x] Achievements

### Phase 4 — Advanced Learning

* [ ] Personalized learning paths
* [ ] Advanced student analytics
* [ ] Question difficulty adaptation
* [ ] AI study recommendations
* [ ] Spaced repetition
* [ ] Topic mastery tracking

### Phase 5 — Platform

* [ ] Teacher classrooms
* [ ] Assignment system
* [ ] Student invitations
* [ ] Real-time quiz competitions
* [ ] Notifications
* [ ] Advanced admin dashboard
* [ ] Production deployment

---

## 📈 Vision

Quizora aims to transform traditional quiz-based learning into an intelligent learning experience.

```text
                    QUIZORA
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   AI Quizzes      Gamification    Analytics
       │               │                │
       ▼               ▼                ▼
  Personalized      XP / Streaks    Performance
    Learning        Leaderboards     Tracking
       │               │                │
       └───────────────┼────────────────┘
                       ▼
                 Better Learning
```

---

## 🤝 Contributing

Contributions are welcome.

### Fork the repository

```bash
git fork https://github.com/your-username/quizora
```

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git commit -m "feat: add your feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Manikanta**

CSE Undergraduate • Full-Stack Developer • Competitive Programmer

* ⭐ 4-Star CodeChef
* 🟣 Codeforces Specialist
* 🟡 LeetCode Knight
* 💻 JavaScript / MERN Stack
* 🤖 AI Application Development

---

## ⭐ Support

If you find Quizora useful, consider giving the repository a ⭐ on GitHub.

---

<p align="center">

### 🎓 Quizora

**AI-powered learning. Personalized practice. Smarter progress.**

</p>
