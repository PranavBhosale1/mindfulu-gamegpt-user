# Environment Setup for GameGPT Backend

## Quick Setup

1. **Copy the environment template:**
   ```bash
   cp env.example .env
   ```

2. **Get your Google API key:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key

3. **Update the .env file:**
   ```bash
   # Edit .env file and replace the placeholder
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

4. **Start the backend server:**
   ```bash
   python3 main.py
   ```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GOOGLE_API_KEY` | Your Google Gemini API key | - | ✅ Yes |
| `HOST` | Server host | `0.0.0.0` | No |
| `PORT` | Server port | `8000` | No |
| `DEBUG` | Debug mode | `true` | No |
| `GOOGLE_MODEL` | Gemini model to use | `gemini-2.0-flash-exp` | No |
| `REQUEST_TIMEOUT` | Request timeout in seconds | `60` | No |
| `MAX_TOKENS` | Maximum tokens for generation | `4000` | No |
| `TEMPERATURE` | Generation temperature | `0.7` | No |

## Testing the Setup

Once you have your API key set up, test the server:

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test game generation
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a memory game about emotions"}'
```

## Troubleshooting

- **502 Bad Gateway**: Make sure the backend server is running on port 8000
- **API Key Error**: Verify your Google API key is correct and has proper permissions
- **Port Already in Use**: Stop any existing server with `pkill -f "python3 main.py"`


