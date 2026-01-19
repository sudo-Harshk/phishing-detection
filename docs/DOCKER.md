# Docker Deployment Guide

Run the entire application with Docker — no Python or Node.js setup required.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

---

## Backend Container

### Build

```bash
cd backend
docker build -t phishing-backend .
```

Build takes ~5-10 minutes on first run (downloads TensorFlow, PyTorch, and HuggingFace model).

### Run

```bash
docker run -p 8000:8000 phishing-backend
```

Server starts at `http://localhost:8000`

### Test

```bash
# Health check
curl http://localhost:8000/health

# Prediction
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

## Frontend Container

### Build

```bash
cd frontend
docker build -t phishing-frontend .
```

Build takes ~1-2 minutes (multi-stage: Node builds, Nginx serves).

### Run

```bash
docker run -p 3000:80 phishing-frontend
```

UI available at `http://localhost:3000`

### Features

- ✅ Landing page loads
- ✅ Demo page (`/demo`) loads
- ✅ Refresh on `/demo` works (SPA routing via Nginx)
- ✅ Static assets cached for performance

---

## Run Both Containers

```bash
# Terminal 1: Backend
cd backend
docker run -p 8000:8000 phishing-backend

# Terminal 2: Frontend
cd frontend
docker run -p 3000:80 phishing-frontend
```

Open `http://localhost:3000` → Use the demo!

---

## Stop Containers

**Option 1:** Press `Ctrl+C` in the terminal running the container

**Option 2:** From another terminal:
```bash
docker ps                    # Find container ID
docker stop <container_id>   # Stop it
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `docker build -t phishing-backend .` | Build backend image |
| `docker build -t phishing-frontend .` | Build frontend image |
| `docker run -p 8000:8000 phishing-backend` | Run backend |
| `docker run -p 3000:80 phishing-frontend` | Run frontend |
| `docker run -d -p 8000:8000 phishing-backend` | Run in background |
| `docker ps` | List running containers |
| `docker stop <id>` | Stop container |
| `docker logs <id>` | View logs |
| `docker images` | List images |

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
- Check port isn't already in use: `netstat -an | findstr 8000` or `findstr 3000`

**First backend request is slow (~3s):**
- Normal — model warm-up on first inference
- Subsequent requests are faster (~50-200ms)

**Frontend shows 404 on refresh:**
- Nginx config missing `try_files` directive
- Rebuild frontend image: `docker build --no-cache -t phishing-frontend .`

**Out of memory:**
- Ensure Docker has at least 4GB RAM allocated (Docker Desktop → Settings → Resources)
