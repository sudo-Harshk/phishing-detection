# Phishing Detection Web Interface

MTech Final Year Project — Character-level phishing detection using deep learning.

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Backend (Terminal 1)
cd backend
docker build -t phishing-backend .
docker run -p 8000:8000 phishing-backend

# Frontend (Terminal 2)
cd frontend
docker build -t phishing-frontend .
docker run -p 3000:80 phishing-frontend
```

Open `http://localhost:3000` — no Python or Node.js setup needed!

### Option 2: Local Development

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Documentation

| Document | Description |
|----------|-------------|
| [PRD](docs/PRD.md) | Product requirements |
| [Architecture](docs/ARCHITECTURE.md) | System design |
| [Setup](docs/SETUP.md) | Installation guide |
| [Docker](docs/DOCKER.md) | Docker deployment |
| [API](docs/API.md) | API reference |
| [Demo Guide](docs/DEMO_GUIDE.md) | Demo instructions |
| [Testing](docs/TESTING.md) | Testing guide |
| [Deployment](docs/DEPLOYMENT.md) | Deployment guide |
| [Project Structure](docs/PROJECT_STRUCTURE.md) | File organization |

## Tech Stack

**Backend:** FastAPI, TensorFlow/Keras, PyTorch, Transformers (DistilBERT)

**Frontend:** React 19, Tailwind CSS, Framer Motion, Vite

**Models:** DistilBERT (HuggingFace), CharGRU (Keras)

## API

```
POST /api/predict
Content-Type: application/json

{"text": "Email content here"}
```

Response:
```json
{
  "label": "Clean | Suspicious | Phishing",
  "risk_level": "Low | Moderate | High",
  "phishing_probability": 0.0-1.0,
  "latency_ms": 50-500
}
```
