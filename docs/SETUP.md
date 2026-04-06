# Setup Guide

## Quick Start (Docker)

```bash
docker-compose up --build
```

- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:8000`

> Create `backend/.env` before running (see [Environment Variables](#environment-variables)).

---

## Local Development Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- Git
- A VirusTotal account (free) — get your API key at [virustotal.com](https://www.virustotal.com)

### 1. Clone and configure

```bash
git clone <repo-url>
cd phishing-detection-final
```

Create `backend/.env`:
```
VIRUSTOTAL_API_KEY=your_key_here
```

### 2. Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS / Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`  
Health check: `GET http://localhost:8000/health`

### 3. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Environment Variables

| Variable | File | Required | Description |
|----------|------|----------|-------------|
| `VIRUSTOTAL_API_KEY` | `backend/.env` | Yes (URL checks) | VirusTotal v3 public API key |
| `VITE_API_URL` | `frontend/.env.local` | No | Backend URL override (default: `http://127.0.0.1:8000`) |

---

## First Run Notes

- DistilBERT model downloads automatically on first email request (~250 MB from HuggingFace)
- First email prediction may take 10–30 seconds (model loading)
- Subsequent predictions: ~100–500 ms
- URL checks via VirusTotal: ~1–4 seconds depending on cache

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | 0.110.0 | API framework |
| uvicorn | 0.27.1 | ASGI server |
| torch | 2.2.0 | DistilBERT inference |
| transformers | 4.36.2 | HuggingFace models |
| tensorflow | 2.16.1 | CharGRU model |
| requests | 2.31.0 | VirusTotal HTTP calls |
| python-dotenv | 1.0.1 | `.env` file loading |

---

## Troubleshooting

**Port already in use:**
```bash
# Find process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Use a different port
uvicorn app.main:app --reload --port 8001
```

**URL checks return no domain info:**
- Verify `backend/.env` exists and contains a valid `VIRUSTOTAL_API_KEY`
- Restart the backend server after editing `.env`

**DistilBERT download fails:**
- Check internet connection (HuggingFace download on first run)
- Cached after first download in `~/.cache/huggingface/`

**CORS errors in browser:**
- Backend allows all origins (`*`) — ensure the backend is actually running
- Check `VITE_API_URL` points to the correct backend address
