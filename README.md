# MindfulU GameGPT User Application

A comprehensive mental wellness platform that combines interactive games, AI-powered companions, and therapeutic assessments to support mental health and emotional well-being.

## 🏗️ Project Structure

This repository contains two main applications:

### 1. **GameGPT User Prompt System** (`gamegpt-user-prompt-main/`)
- **Backend**: FastAPI-based Python server with AI integration
- **Frontend**: React + TypeScript + Vite application
- **Purpose**: Interactive game generation and AI-powered mental health support

### 2. **MindfulU Frontend** (`mindfulu-frontend-master/`)
- **Frontend**: React + TypeScript + Vite application
- **Purpose**: Comprehensive mental wellness platform with assessments, games, and dashboards

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **Google API Key** (for AI features)

### Environment Setup

#### Backend Environment Variables

Create a `.env` file in `gamegpt-user-prompt-main/backend/`:

```bash
# Required: Google API Key for AI features
GOOGLE_API_KEY=your_google_api_key_here

# Optional settings (defaults provided)
DEBUG=false
HOST=0.0.0.0
PORT=8000
GOOGLE_MODEL=gemini-2.0-flash-exp
REQUEST_TIMEOUT=60
MAX_TOKENS=4000
TEMPERATURE=0.7
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600
LOG_LEVEL=INFO
```

#### Frontend Environment Variables

Create a `.env` file in `gamegpt-user-prompt-main/frontend/`:

```bash
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=GameGPT
```

Create a `.env` file in `mindfulu-frontend-master/`:

```bash
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=MindfulU
```

## 🛠️ Installation & Setup

### 1. Backend Setup (GameGPT)

```bash
# Navigate to backend directory
cd gamegpt-user-prompt-main/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from example above)
cp .env.example .env
# Edit .env with your Google API key
```

### 2. Frontend Setup (GameGPT)

```bash
# Navigate to frontend directory
cd gamegpt-user-prompt-main/frontend

# Install dependencies
npm install

# Create .env file (copy from example above)
# Edit .env with your API URL
```

### 3. Frontend Setup (MindfulU)

```bash
# Navigate to MindfulU frontend directory
cd mindfulu-frontend-master

# Install dependencies
npm install

# Create .env file (copy from example above)
# Edit .env with your API URL
```

## 🏃‍♂️ Running the Applications

### Backend Server (GameGPT)

```bash
cd gamegpt-user-prompt-main/backend

# Activate virtual environment
source venv/bin/activate

# Run the server
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: `http://localhost:8000`

### Frontend Applications

#### GameGPT Frontend
```bash
cd gamegpt-user-prompt-main/frontend

# Start development server
npm run dev
```

Available at: `http://localhost:8081`

#### MindfulU Frontend
```bash
cd mindfulu-frontend-master

# Start development server
npm run dev
```

Available at: `http://localhost:8080`

## 🐳 Docker Setup (Optional)

### Backend with Docker

```bash
cd gamegpt-user-prompt-main/backend

# Build and run with Docker Compose
docker-compose up --build
```

### Manual Docker Build

```bash
cd gamegpt-user-prompt-main/backend

# Build Docker image
docker build -t gamegpt-backend .

# Run container
docker run -p 8000:8000 --env-file .env gamegpt-backend
```

## 📋 Available Commands

### Backend Commands

```bash
# Development server
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production server
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000

# Run tests
pytest

# Code formatting
black .
isort .

# Linting
flake8 .
```

### Frontend Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Type checking (TypeScript)
npx tsc --noEmit
```

## 🔧 Configuration

### Backend Configuration

The backend uses Pydantic settings with environment variable support:

- **API Keys**: Set `GOOGLE_API_KEY` for AI functionality
- **Server**: Configure `HOST` and `PORT` for server binding
- **CORS**: Configure `ALLOWED_ORIGINS` for cross-origin requests
- **Rate Limiting**: Adjust `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW`

### Frontend Configuration

Both frontend applications use Vite with proxy configuration:

- **API Proxy**: Configured to proxy `/api` requests to backend
- **Port Configuration**: GameGPT runs on 8081, MindfulU on 8080
- **Environment Variables**: Use `VITE_` prefix for client-side variables

## 🎮 Features

### GameGPT System
- **AI-Powered Game Generation**: Dynamic game creation using Google's Gemini AI
- **Interactive Games**: Various game types including puzzles, quizzes, and memory games
- **Real-time Chat**: AI companion for mental health support
- **Game Rendering**: Dynamic game rendering system with multiple game types

### MindfulU Platform
- **Assessment Tools**: Comprehensive mental health assessments
- **Dashboard**: User progress tracking and analytics
- **Game Library**: Curated collection of therapeutic games
- **Student/Admin Views**: Role-based access control

## 🔒 Security & Privacy

- **Environment Variables**: Sensitive data stored in `.env` files (not committed)
- **CORS Configuration**: Properly configured cross-origin resource sharing
- **Rate Limiting**: Built-in rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation using Pydantic

## 📚 API Documentation

### Backend API

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Key Endpoints

- `POST /api/generate-game` - Generate new games
- `POST /api/chat` - AI chat interface
- `GET /api/health` - Health check
- `GET /api/games` - List available games

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port 8000
   lsof -ti:8000 | xargs kill -9
   
   # Or use different port
   python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8001
   ```

2. **Missing Dependencies**
   ```bash
   # Reinstall backend dependencies
   cd gamegpt-user-prompt-main/backend
   pip install -r requirements.txt
   
   # Reinstall frontend dependencies
   cd gamegpt-user-prompt-main/frontend
   npm install
   ```

3. **Environment Variables Not Loading**
   - Ensure `.env` files are in the correct directories
   - Check for typos in variable names
   - Restart the servers after changing environment variables

4. **CORS Issues**
   - Verify `ALLOWED_ORIGINS` in backend configuration
   - Check frontend proxy configuration in `vite.config.ts`

### Logs and Debugging

```bash
# Backend logs
cd gamegpt-user-prompt-main/backend
python3 -m uvicorn main:app --reload --log-level debug

# Frontend logs
# Check browser developer console
# Check terminal output during npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m "Add feature"`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the API documentation at `/docs`

## 🔄 Updates

To update dependencies:

```bash
# Backend
cd gamegpt-user-prompt-main/backend
pip install --upgrade -r requirements.txt

# Frontend (both applications)
cd gamegpt-user-prompt-main/frontend
npm update

cd mindfulu-frontend-master
npm update
```

---

**Happy coding! 🚀**
