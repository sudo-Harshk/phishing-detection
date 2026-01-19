# Docker Deployment Guide

Run the backend with a single command — no Python environment setup required.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

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

### Stop

**Option 1:** Press `Ctrl+C` in the terminal running the container

**Option 2:** From another terminal:
```bash
docker ps                    # Find container ID
docker stop <container_id>   # Stop it
```

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

## Quick Reference

| Command | Description |
|---------|-------------|
| `docker build -t phishing-backend .` | Build image |
| `docker run -p 8000:8000 phishing-backend` | Run container |
| `docker run -d -p 8000:8000 phishing-backend` | Run in background |
| `docker ps` | List running containers |
| `docker stop <id>` | Stop container |
| `docker logs <id>` | View logs |
| `docker images` | List images |
| `docker rmi phishing-backend` | Remove image |

## Image Details

- **Base:** Python 3.10 slim
- **Size:** ~4-5 GB (includes TensorFlow, PyTorch, HuggingFace model)
- **Port:** 8000
- **Health endpoint:** `/health`

## Troubleshooting

**Container won't start:**
- Ensure Docker Desktop is running
- Check port 8000 isn't already in use: `netstat -an | findstr 8000`

**First request is slow (~3s):**
- Normal — model warm-up on first inference
- Subsequent requests are faster (~50-200ms)

**Out of memory:**
- Ensure Docker has at least 4GB RAM allocated (Docker Desktop → Settings → Resources)
