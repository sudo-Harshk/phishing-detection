# Backend

FastAPI server for phishing detection — serves both email ML inference and URL threat intelligence.

## Structure

```
backend/
├── .env                          # API keys (not committed)
├── requirements.txt
├── Dockerfile
├── app/
│   ├── main.py                   # FastAPI app, CORS, router
│   ├── config.py                 # Paths, constants, loads .env
│   ├── api/
│   │   └── predict.py            # POST /api/predict — routes email vs URL
│   ├── core/
│   │   ├── hf_distilbert_inference.py  # Email analysis (active model)
│   │   ├── virustotal.py               # URL analysis via VirusTotal API v3
│   │   ├── inference.py                # CharGRU inference (alternative)
│   │   ├── model_loader.py             # Keras model loader
│   │   └── preprocessing.py            # Email text preprocessing
│   └── utils/
│       └── logger.py
├── models/
│   └── chargru_advtrain_model.keras
├── assets/
│   ├── char_dictionary.json
│   └── example_emails/
└── tests/
```

## Setup

```bash
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt

# Create .env
echo VIRUSTOTAL_API_KEY=your_key_here > .env

uvicorn app.main:app --reload --port 8000
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/predict` | Email or URL analysis |

### Request

```json
{ "text": "email body or https://url" }
```

The endpoint detects URLs automatically (`http://` / `https://` prefix → VirusTotal, otherwise → DistilBERT).

### Response — Email

```json
{
  "label": "Clean",
  "risk_level": "Low",
  "phishing_probability": 0.12,
  "latency_ms": 210.4,
  "model": "DistilBERT (phishing-email)"
}
```

### Response — URL

```json
{
  "label": "Phishing",
  "risk_level": "High",
  "phishing_probability": 0.87,
  "latency_ms": 1840.2,
  "model": "VirusTotal v3",
  "domain_info": {
    "registrar": "Aceville Pte. Ltd.",
    "country": null,
    "created": "2026-04-04",
    "categories": ["phishing"],
    "reputation": 0,
    "engines_malicious": 17,
    "engines_suspicious": 1,
    "engines_harmless": 68,
    "engines_total": 94
  }
}
```

## Risk Thresholds

| Probability | Label | Risk Level |
|-------------|-------|------------|
| ≥ 0.85 | Phishing | High |
| ≥ 0.60 | Suspicious | Moderate |
| < 0.60 | Clean | Low |

For URL analysis, the probability is derived from the proportion of malicious engine detections.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VIRUSTOTAL_API_KEY` | Yes (URL checks) | VirusTotal v3 public API key |

## Dependencies

```
fastapi, uvicorn, pydantic       # API server
tensorflow, torch, transformers  # ML inference
requests, python-dotenv          # HTTP client, env loading
beautifulsoup4, lxml             # HTML parsing
```
