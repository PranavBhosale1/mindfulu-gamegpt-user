# ✅ Setup Verification Guide

## 🧪 Testing Your Setup

### 1. Backend Health Check
```bash
# Test if backend is running
curl http://localhost:8000/api/health

# Expected response: {"status": "healthy", "message": "GameGPT Backend is running"}
```

### 2. Frontend Applications
- **GameGPT Frontend**: Visit http://localhost:8081
- **MindfulU Frontend**: Visit http://localhost:8080
- Both should load without errors

### 3. API Documentation
- Visit http://localhost:8000/docs for Swagger UI
- Visit http://localhost:8000/redoc for ReDoc documentation

### 4. Environment Variables Check

#### Backend (.env file should contain):
```bash
GOOGLE_API_KEY=AIzaSy...  # Your actual API key
DEBUG=false
HOST=0.0.0.0
PORT=8000
```

#### Frontend (.env files should contain):
```bash
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=GameGPT  # or MindfulU
```

## 🔧 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**: 
```bash
# Backend
cd gamegpt-user-prompt-main/backend
pip install -r requirements.txt

# Frontend
cd gamegpt-user-prompt-main/frontend
npm install

cd mindfulu-frontend-master
npm install
```

### Issue: Port already in use
**Solution**:
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### Issue: CORS errors in browser
**Solution**: Check that backend is running and `ALLOWED_ORIGINS` includes your frontend URLs.

### Issue: API key not working
**Solution**: 
1. Verify your Google API key is correct
2. Ensure the key has access to Gemini API
3. Check the `.env` file is in the correct location (`gamegpt-user-prompt-main/backend/`)

## 📊 Expected URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Backend API | http://localhost:8000 | Main API server |
| Backend Docs | http://localhost:8000/docs | Swagger UI |
| GameGPT Frontend | http://localhost:8081 | GameGPT application |
| MindfulU Frontend | http://localhost:8080 | MindfulU application |

## 🎯 Success Criteria

✅ Backend starts without errors  
✅ Frontend applications load in browser  
✅ API health check returns success  
✅ No CORS errors in browser console  
✅ Environment variables are properly loaded  

---

If all checks pass, your setup is complete! 🎉
