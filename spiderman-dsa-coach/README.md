# 🕸️ Spider-Man DSA Coach

A web application where Spider-Man acts as your coding mentor, providing Socratic feedback while you solve data structures and algorithms problems.

## Features

- 🕸️ Spider-Man mascot that provides witty, Socratic feedback
- 📝 Monaco Editor for coding practice
- 🔍 Automatic code analysis for data structures and complexity
- 🎯 Focus on learning through guided questions, not direct solutions
- 🚀 Real-time code analysis and coaching

## Tech Stack

### Frontend
- React + Vite + TypeScript
- TailwindCSS for styling
- Monaco Editor for code editing
- Axios for API calls

### Backend
- FastAPI (Python)
- OpenAI GPT-4 for Spider-Man coaching
- Custom code analysis for data structures
- CORS support for frontend integration

## Quick Start

### Option 1: Using Batch Scripts (Windows)
```bash
# 1. Run setup script
setup.bat

# 2. Set up your OpenAI API key
# Copy backend/.env.example to backend/.env and add your API key

# 3. Start backend (in one terminal)
start-backend.bat

# 4. Start frontend (in another terminal)
start-frontend.bat
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Create .env file with your OPENAI_API_KEY
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

## How It Works

1. **Code Analysis**: The backend analyzes your JavaScript code to detect:
   - Data structures (arrays, hashmaps, stacks, queues, trees, graphs)
   - Algorithms (recursion, sorting, loops)
   - Time complexity estimation

2. **Spider-Man Coaching**: Using GPT-4 with a custom system prompt, Spider-Man provides:
   - Socratic questions to guide learning
   - Witty feedback with superhero references
   - Encouragement and hints without giving away solutions

3. **Interactive UI**: 
   - Left panel: Problem description (currently Two Sum)
   - Center: Monaco Editor for coding
   - Right panel: Spider-Man mascot with speech bubble

## API Endpoints

- `POST /analyze` - Analyzes code for data structures and complexity
- `POST /coach` - Returns Spider-Man's coaching feedback
- `GET /` - Health check endpoint

## Project Structure

```
spiderman-dsa-coach/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json
├── backend/
│   ├── main.py            # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variables template
├── setup.bat              # Windows setup script
├── start-frontend.bat     # Start frontend script
├── start-backend.bat      # Start backend script
└── README.md
```

## Example Spider-Man Responses

- 🕸️ "That nested loop looks stickier than my web! What happens if you had 10,000 villains instead of 10?"
- 🕸️ "Good job using a hashmap! But remember, with great power comes great responsibility - are you sure you need all that extra space?"
- 🕸️ "O(n²)? That's slower than the Green Goblin's escape plan! Can you think of a way to catch those villains faster?"

## Contributing

Feel free to submit issues and enhancement requests! With great code comes great responsibility! 🕸️

## License

MIT License - because every hero needs to share their powers for the greater good!
