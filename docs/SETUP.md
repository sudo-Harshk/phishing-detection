# Setup Guide

## Quick Start (Docker)

Fastest way to get running:

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000`

---

## Local Development Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- Git

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Unix/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`

Health check: `GET http://localhost:8000/health`

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## First Run Notes

- DistilBERT model downloads automatically on first request (~250MB)
- First prediction may take 10-30 seconds (model loading)
- Subsequent predictions: ~100-500ms

---

## Environment Requirements

### Backend
- 4GB+ RAM recommended
- CPU-only (no GPU required)

### Dependencies

| Package | Version |
|---------|---------|
| fastapi | 0.110.0 |
| uvicorn | 0.27.1 |
| tensorflow | 2.16.1 |
| torch | 2.2.0 |
| transformers | 4.36.2 |

---

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use different port
uvicorn app.main:app --reload --port 8001
```

**Model loading fails:**
- Check internet connection (HuggingFace download)
- Verify `models/chargru_advtrain_model.keras` exists

**CORS errors:**
- Backend now allows all origins for Docker compatibility
- For local dev, frontend should run on `localhost:5173`
