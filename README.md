# Phishing Detection Web Interface

MTech Final Year Project — Phishing detection using deep learning and real-time threat intelligence.

## Features

- **Email analysis** — DistilBERT transformer classifies email content as Clean / Suspicious / Phishing
- **URL analysis** — VirusTotal API v3 checks URLs against 90+ security engines with full domain intelligence
- **URL intel card** — Parsed URL structure (scheme, host, port, path, query), heuristic signals, registrar, registration date, categories, and engine verdicts
- **Risk scoring** — Probability score (0–100%) with Low / Moderate / High risk levels and animated visualisation

## Quick Start

### Docker Compose (Recommended)

```bash
docker-compose up --build
```

Open `http://localhost:3000`.

> **Required before running:** create `backend/.env` with your VirusTotal API key:
> ```
> VIRUSTOTAL_API_KEY=your_key_here
> ```

### Local Development

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI, Python 3.12 |
| Email ML | DistilBERT (`cybersectony/phishing-email-detection-distilbert_v2.1`) |
| URL intel | VirusTotal API v3 |
| Frontend | React 19, TypeScript, Tailwind CSS v4, Framer Motion, Vite |
| Serving | Uvicorn (dev), Nginx + Docker (prod) |

## API

The single `/api/predict` endpoint handles both modes — it auto-detects URLs by the `http(s)://` prefix.

```
POST /api/predict
Content-Type: application/json
```

**Email:**
```json
{ "text": "Email body content here" }
```

**URL:**
```json
{ "text": "https://example.com/path" }
```

**Response:**
```json
{
  "label": "Clean | Suspicious | Phishing",
  "risk_level": "Low | Moderate | High",
  "phishing_probability": 0.0,
  "latency_ms": 320.5,
  "model": "DistilBERT (phishing-email) | VirusTotal v3",
  "domain_info": {
    "registrar": "Registrar Name",
    "country": "US",
    "created": "2021-03-15",
    "categories": ["phishing"],
    "reputation": -5,
    "engines_malicious": 12,
    "engines_suspicious": 1,
    "engines_harmless": 68,
    "engines_total": 93
  }
}
```

`domain_info` is only present for URL requests (`null` if the domain is unknown).

## Environment Variables

| Variable | File | Description |
|----------|------|-------------|
| `VIRUSTOTAL_API_KEY` | `backend/.env` | VirusTotal public API key (required for URL checks) |
| `VITE_API_URL` | frontend `.env.local` | Backend URL override (default: `http://127.0.0.1:8000`) |

## Documentation

| Document | Description |
|----------|-------------|
| [API](docs/API.md) | Full API reference |
| [Architecture](docs/ARCHITECTURE.md) | System design |
| [Project Structure](docs/PROJECT_STRUCTURE.md) | File organisation |
| [Setup](docs/SETUP.md) | Installation guide |
| [Docker](docs/DOCKER.md) | Docker deployment |
| [Testing](docs/TESTING.md) | Testing guide |
