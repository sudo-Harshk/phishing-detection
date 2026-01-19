# Deployment Guide

## Quick Deploy (Recommended)

Use Docker Compose for the easiest deployment:

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000`

> [!TIP]
> This is the recommended approach for demos and deployments. No Python or Node.js setup required.

---

## Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up --build` | Build and start all services |
| `docker-compose up -d` | Start in background |
| `docker-compose down` | Stop all services |
| `docker-compose logs -f` | View logs |
| `docker-compose ps` | List running services |

---

## Local Development

See [SETUP.md](./SETUP.md) for local development without Docker.

---

## Deploy to Another Machine

### Option 1: Docker (Recommended)

**Requirements on target machine:**
- Docker Desktop

**Steps:**
```bash
git clone <repository-url>
cd phishing-detection-final
docker-compose up --build
```

### Option 2: Manual Setup

**Requirements:**
- Python 3.10+
- Node.js 18+

**Steps:**

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

**Start servers:**

```bash
# Terminal 1 (Backend)
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Terminal 2 (Frontend)
npm run dev -- --host
```

---

## Required Files

| File | Location | Size |
|------|----------|------|
| `chargru_advtrain_model.keras` | `backend/models/` | ~10MB |
| `char_dictionary.json` | `backend/assets/` | ~2KB |

> [!NOTE]
> DistilBERT model auto-downloads from HuggingFace (~250MB) on first run.

---

## Production Considerations

### With Docker

```bash
# Run in detached mode with restart policy
docker-compose up -d
```

Containers automatically restart on failure.

### Without Docker

```bash
# Backend - production server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 1

# Frontend - build and serve
npm run build
npm run preview
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Docker not starting | Ensure Docker Desktop is running |
| Port conflict | Check ports 3000, 8000 are free |
| Model download fails | Check internet connectivity |
| Memory error | Allocate 4GB+ RAM to Docker |
| Module not found | Verify venv activated (local dev) |
