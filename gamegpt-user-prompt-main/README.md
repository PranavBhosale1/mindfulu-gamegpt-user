# MindfulU & GameGPT - AI-Powered Therapeutic Gaming Platform

A comprehensive mental wellness platform featuring two interconnected applications:
- **MindfulU Frontend**: A React-based mental wellness dashboard and assessment platform
- **GameGPT**: AI-powered therapeutic game generation system with FastAPI backend

## 🎯 Overview

This platform combines MindfulU's mental wellness features with GameGPT's AI-powered therapeutic game generation. MindfulU provides user dashboards, assessments, and mental health tracking, while GameGPT generates personalized therapeutic games using Google Gemini AI to support stress management, emotional intelligence, and mental wellness development.

## 🏗️ Architecture

### Project Structure
```
mindfulu-gamegpt-user/             # Complete Mental Wellness Platform
├── mindfulu-frontend/             # MindfulU Frontend Application
│   ├── src/
│   │   ├── components/            # UI components and layouts
│   │   ├── pages/                 # Application pages and routes
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API services
│   │   └── types/                 # TypeScript type definitions
│   ├── package.json
│   └── README.md
├── backend/                       # GameGPT FastAPI Python backend
│   ├── app/                       # Application modules
│   ├── main.py                    # FastAPI entry point
│   └── requirements.txt
├── frontend/                      # GameGPT React frontend
├── pyserver/                      # Additional Python server
├── .env.example                   # Environment configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

### System Integration
- **MindfulU Frontend** runs on `http://localhost:3000` (or similar port)
- **GameGPT Backend** runs on `http://localhost:8000`
- **GameGPT Frontend** runs on `http://localhost:5173`
- Both frontends can communicate with the GameGPT backend for game generation

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** for GameGPT backend
- **Node.js 18+** and **npm/yarn** for both frontends
- **Google Gemini API Key** (get from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Quick Start Summary

**For MindfulU Frontend:**
```bash
cd mindfulu-frontend
npm install
npm run dev
```

**For GameGPT Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**For GameGPT Backend:**
```bash
cd backend
pip install -r requirements.txt
cp ../.env.example .env
# Edit .env and add your GOOGLE_API_KEY
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Detailed Setup Instructions

#### 1. MindfulU Frontend Setup

The MindfulU frontend provides the main mental wellness dashboard and assessment interface.

1. **Navigate to MindfulU directory:**
   ```bash
   cd mindfulu-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   MindfulU will be available at `http://localhost:3000` (or similar port)

#### 2. GameGPT Backend Setup

The GameGPT backend provides AI-powered therapeutic game generation services.

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp ../.env.example .env
   # Edit .env and add your GOOGLE_API_KEY
   ```

4. **Run the backend server:**
   ```bash
   python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend will be available at `http://localhost:8000`

#### 3. GameGPT Frontend Setup

The GameGPT frontend provides the game generation interface and game player.

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The frontend will be available at `http://localhost:5173`

### Running All Services

To run the complete platform:

1. **Terminal 1 - GameGPT Backend:**
   ```bash
   cd backend
   python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Terminal 2 - MindfulU Frontend:**
   ```bash
   cd mindfulu-frontend
   npm run dev
   ```

3. **Terminal 3 - GameGPT Frontend (optional):**
   ```bash
   cd frontend
   npm run dev
   ```

All services will be running and can communicate with each other.

### Getting Started (Complete Setup)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PranavBhosale1/mindfulu-gamegpt-user.git
   cd mindfulu-gamegpt-user
   ```

2. **Setup all three services as described above**

## 🧘 MindfulU Features

The MindfulU frontend provides comprehensive mental wellness features:

- **User Dashboard** - Personalized mental health overview
- **Assessment Flow** - Interactive mental wellness assessments
- **Student Dashboard** - Educational mental health tracking
- **Admin Dashboard** - Administrative and monitoring tools
- **Assessment Results** - Detailed analysis and recommendations
- **WonderKids Integration** - Child-focused mental wellness features
- **Progress Tracking** - Monitor mental health journey over time
- **Resource Library** - Access to mental wellness resources

## 🎮 Game Types Supported

The system generates 11 different therapeutic game types:

1. **Quiz** - Multiple choice mental wellness questions
2. **Drag-Drop** - Interactive categorization exercises
3. **Memory Match** - Card matching for therapeutic concepts
4. **Word Puzzle** - Therapeutic vocabulary crosswords
5. **Sorting** - Category-based organization games
6. **Matching** - Connect problems with solutions
7. **Story Sequence** - Order therapeutic processes
8. **Fill Blank** - Complete therapeutic statements
9. **Card Flip** - Flashcard learning system
10. **Puzzle Assembly** - Visual concept puzzles
11. **Anxiety Adventure** - Branching coping scenarios

## 🧠 Therapeutic Categories

- **Mental Wellness** - General mental health awareness
- **Coping Skills** - Practical stress management techniques
- **Emotional Intelligence** - Understanding and managing emotions
- **Mindfulness** - Present-moment awareness practices
- **Anxiety Management** - Specific anxiety coping strategies
- **Depression Support** - Mood improvement techniques
- **Stress Reduction** - Relaxation and stress relief methods
- **Self-Care** - Personal wellness routines
- **Cognitive Behavioral** - CBT-based interventions
- **Interpersonal Skills** - Social and communication skills

## 🔧 API Endpoints

### Backend API (Port 8000)

- **`GET /`** - Health check and API information
- **`GET /health`** - Detailed health status
- **`POST /generate`** - Generate a therapeutic game
- **`POST /generate/debug`** - Debug endpoint with intermediate steps
- **`GET /generate/test`** - Test endpoint returning mock game
- **`GET /stats`** - API usage statistics
- **`GET /docs`** - Interactive API documentation (Swagger UI)

### Example API Request

```bash
curl -X POST "http://localhost:8000/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a quiz about managing stress for college students"
  }'
```

## 🔑 Environment Configuration

### Required Environment Variables

```env
# Google Gemini API Configuration
GOOGLE_API_KEY=your_google_gemini_api_key_here
GOOGLE_MODEL=gemini-2.0-flash-exp

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=true

# Request Configuration
REQUEST_TIMEOUT=60
MAX_TOKENS=4000
TEMPERATURE=0.7

# CORS Configuration
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

### Getting Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key and add it to your `.env` file

## 🛠️ Development

### Backend Development

The backend uses a modular architecture with dependency injection:

- **`app/core/`** - Configuration, logging, and container setup
- **`app/models/`** - Pydantic schemas for data validation
- **`app/services/`** - Business logic and external API integration
- **`main.py`** - FastAPI application and endpoint definitions

### Frontend Development

The frontend is built with modern React and TypeScript:

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests (if configured)
cd frontend
npm test
```

### Code Formatting

```bash
# Backend formatting
cd backend
black .
isort .
flake8 .

# Frontend formatting
cd frontend
npm run lint
```

## 🐳 Docker Deployment

### Backend Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
    volumes:
      - ./backend:/app
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev -- --host 0.0.0.0
```

## 📊 Usage Statistics

The API provides endpoints to monitor usage:

- Total requests processed
- Successful game generations
- Error rates
- Average response times

## 🔒 Security Considerations

- API keys are stored in environment variables
- CORS is configured for specific origins
- Request timeout limits prevent abuse
- Rate limiting can be configured
- Input validation using Pydantic schemas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the GameGPT initiative for therapeutic game generation. Please ensure compliance with Google Gemini API terms of service.

## 🆘 Troubleshooting

### Common Issues

1. **Backend won't start:**
   - Check if port 8000 is available
   - Verify Python dependencies are installed
   - Ensure `.env` file exists with valid API key

2. **Frontend connection issues:**
   - Verify backend is running on port 8000
   - Check CORS configuration in backend
   - Ensure no firewall blocking localhost connections

3. **API key errors:**
   - Verify Google Gemini API key is valid
   - Check API key has proper permissions
   - Ensure no extra spaces in `.env` file

### Getting Help

- Check the API documentation at `http://localhost:8000/docs`
- Review the logs in the terminal
- Ensure all environment variables are properly set

## 🌟 Features

- ✅ **AI-Powered Game Generation** - Uses Google Gemini for intelligent game creation
- ✅ **11 Game Types** - Diverse therapeutic game formats
- ✅ **Modern UI** - Beautiful, responsive React frontend
- ✅ **RESTful API** - Clean FastAPI backend with comprehensive documentation
- ✅ **Type Safety** - Full TypeScript support with Pydantic validation
- ✅ **Error Handling** - Robust error handling and logging
- ✅ **Health Monitoring** - Built-in health checks and monitoring
- ✅ **Docker Support** - Easy deployment with Docker
- ✅ **Development Tools** - Hot reload, linting, and testing support

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Game progress tracking
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with wearable devices
- [ ] Social features and sharing
- [ ] Professional therapist dashboard

---

**Made with ❤️ for mental wellness and therapeutic gaming**
