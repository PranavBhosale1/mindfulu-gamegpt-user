# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Google API Key

## 🔧 Environment Setup

### 1. Backend (.env in `gamegpt-user-prompt-main/backend/`)
```bash
GOOGLE_API_KEY=your_google_api_key_here
DEBUG=false
HOST=0.0.0.0
PORT=8000
```

### 2. Frontend (.env in both frontend directories)
```bash
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=GameGPT  # or MindfulU
```

## 🏃‍♂️ Run Commands

### Backend (Terminal 1)
```bash
cd gamegpt-user-prompt-main/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
**Backend URL**: http://localhost:8000

### GameGPT Frontend (Terminal 2)
```bash
cd gamegpt-user-prompt-main/frontend
npm install
npm run dev
```
**Frontend URL**: http://localhost:8081

### MindfulU Frontend (Terminal 3)
```bash
cd mindfulu-frontend-master
npm install
npm run dev
```
**Frontend URL**: http://localhost:8080

## 🔍 Verify Setup
- Backend API docs: http://localhost:8000/docs
- GameGPT App: http://localhost:8081
- MindfulU App: http://localhost:8080

## 🛑 Stop All Services
Press `Ctrl+C` in each terminal window to stop the services.

---
For detailed setup instructions, see [README.md](./README.md)
