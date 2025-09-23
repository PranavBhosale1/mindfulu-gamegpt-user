# AI-Powered Behavioral Assessment Engine

An intelligent mental wellness assessment platform designed for Indian youth, featuring culturally adapted psychological assessments with AI-powered question personalization.

## 🌟 Features

- **Multiple Assessment Types**:
  - PHQ-9 (Depression Screening)
  - UCLA Loneliness Scale V3
  - Internet & Social Media Usage Assessment

- **AI-Powered Personalization**:
  - Questions adapted based on user demographics (age, gender, status)
  - Culturally relevant examples for Indian youth
  - Age-appropriate contexts (School-going, College, Young Professional)

- **Comprehensive Reporting**:
  - Detailed score interpretation
  - Personalized recommendations
  - Escalation protocols for high-risk cases

- **Modern Tech Stack**:
  - Backend: FastAPI with Python
  - Frontend: React with TypeScript
  - AI: Google Gemini API for personalization
  - Real-time question adaptation

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API Key

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/indominousx/AssessmentEngine.git
cd AssessmentEngine
```

2. Create and activate virtual environment:
```bash
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Create .env file with your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

5. Start the backend server:
```bash
python main.py
```
Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```
Frontend will be available at `http://localhost:3000` or `http://localhost:3001`

## 📁 Project Structure

```
assessment_engine/
├── backend/
│   ├── __init__.py
│   ├── router.py          # API endpoints
│   ├── service.py         # Core assessment logic
│   ├── schemas.py         # Data models
│   └── templates/         # Assessment configurations
│       ├── phq9_template.json
│       ├── ucla_loneliness_template.json
│       └── internet_addiction_template.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API integration
│   │   ├── types/         # TypeScript definitions
│   │   └── AssessmentPage.tsx
│   ├── package.json
│   └── tsconfig.json
├── main.py               # FastAPI application entry point
├── requirements.txt      # Python dependencies
├── .env                 # Environment variables (create this)
└── README.md
```

## 🔧 API Endpoints

- `GET /assessment/list` - Get available assessments
- `POST /assessment/start/{assessment_id}` - Start an assessment
- `POST /assessment/submit/{assessment_id}` - Submit assessment responses

## 🤖 AI Personalization

The system uses Google Gemini AI to personalize assessment questions:

- **Cultural Context**: Examples relevant to Indian culture and lifestyle
- **Age-Appropriate**: Different examples for students, college-goers, and professionals  
- **Demographic Aware**: Considers user's age, gender, and status
- **Fallback System**: Graceful degradation when AI is unavailable

## 🎯 Assessment Types

### PHQ-9 Depression Screening
- 9 validated questions for depression screening
- Severity levels: Minimal, Mild, Moderate, Moderately Severe, Severe
- Personalized recommendations based on age group

### UCLA Loneliness Scale V3
- 20 questions measuring loneliness and social connectedness
- Reverse-scored items for accuracy
- Cultural adaptation for Indian social contexts

### Internet & Social Media Usage
- 20 questions assessing digital behavior patterns
- Focus on social media and internet usage habits
- Relevant for digital wellness assessment

## 🔒 Privacy & Safety

- No personal data storage
- Anonymous user IDs
- Built-in escalation protocols
- Professional referral recommendations

## 🚧 Development

### Running Tests
```bash
# Backend tests (when implemented)
pytest

# Frontend tests
cd frontend
npm test
```

### Adding New Assessments

1. Create JSON template in `backend/templates/`
2. Define question structure with `ai_context_guide`
3. Set up scoring bands and recommendations
4. Test with different user demographics

## 📊 Scoring & Interpretation

Each assessment includes:
- **Raw Score Calculation**: Based on user responses
- **Severity Bands**: Predefined ranges for interpretation
- **Personalized Recommendations**: Age and context-appropriate advice
- **Escalation Triggers**: Automatic flagging of high-risk responses

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Based on validated psychological assessment scales
- Designed for Indian youth mental health context
- Powered by Google Gemini AI for personalization

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Note**: This is a mental health screening tool, not a diagnostic instrument. Always consult qualified mental health professionals for clinical assessment and treatment.