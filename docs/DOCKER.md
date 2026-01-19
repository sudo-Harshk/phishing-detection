# Docker Deployment Guide

Run the entire application with Docker — no Python or Node.js setup required.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

---

## Quick Start (Recommended)

Use Docker Compose to run everything with one command:

```bash
# From project root
docker-compose up --build
```

This builds and starts both services:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`

### Stop Everything

```bash
docker-compose down
```

---

## Docker Compose Commands

| Command | Description |
|---------|-------------|
| `docker-compose up --build` | Build and start all services |
| `docker-compose up -d` | Start in background (detached) |
| `docker-compose down` | Stop all services |
| `docker-compose logs -f` | View logs (follow mode) |
| `docker-compose ps` | List running services |
| `docker-compose restart` | Restart all services |

---

## Individual Containers

### Backend

```bash
cd backend
docker build -t phishing-backend .
docker run -p 8000:8000 phishing-backend
```

### Frontend

```bash
cd frontend
docker build -t phishing-frontend .
docker run -p 3000:80 phishing-frontend
```

---

## Testing

### Health Check

```bash
curl http://localhost:8000/health
```

### API Test

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"Your account has been suspended. Click here to verify."}'
```

PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/predict" `
  -Method POST -ContentType "application/json" `
  -Body '{"text":"Your account has been suspended."}'
```

---

## Image Details

| Image | Base | Size | Port |
|-------|------|------|------|
| `phishing-backend` | Python 3.10 slim | ~4-5 GB | 8000 |
| `phishing-frontend` | Nginx alpine | ~50 MB | 80 |

---

## Troubleshooting

**Container won't start:**
- Ensure Docker Desktop is running
- Check port isn't in use: `netstat -an | findstr 8000`

**First backend request is slow (~3-6s):**
- Normal — model warm-up on first inference
- Subsequent requests are faster (~50-200ms)

**Frontend shows 404 on refresh:**
- Rebuild: `docker-compose build --no-cache frontend`

**Out of memory:**
- Ensure Docker has 4GB+ RAM (Docker Desktop → Settings → Resources)
